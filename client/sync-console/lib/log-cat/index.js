import stringify from 'json-stringify-safe'

import {
    setStorage,
    getStorage,
    isFunction,
    checkFlag,
    getUniqueId
} from '../../utils'
import SystemInfo from '../system'
import Event from './event'
import stringifyVue from './vue-instance'
import TraceKit from './trace-kit'

function formatHeader (header) {
    let headers = {}
    let tmp = []

    header
        .split('\n')
        .map(item => {
            tmp = item.split(':')
            if (item && tmp.length) {
                headers[tmp[0]] = tmp[1]
            }
        })

    return headers
}

export default class LogManager extends Event {
    constructor (props) {
        super()
        this.options = {
            maxLogCount: props.maxLogCount || 50,
            server: props.server,
            report: props.report
        }

        this.remoteSync = false
        this.remoteTarget = ''
        this.remoteAdmin = ''

        this.clientList = []

        this.logQueue = []
        this.historyQueue = this.load()
        this.errorQueue = []
        this.netWorkQueue = []
        this.logIndex = 0
        this.system = SystemInfo.init()

        SystemInfo.info((err, data) => {
            if (err) {
                console.error(err)
            }
            this.system = data
        })

        this.mock(['info', 'error', 'warn'])
        this.check()
    }

    check () {
        if (checkFlag()) {
            this.initSocket()
        }
    }

    addRemoteTarget (client) {
        let has = false
        for (let i = 0, len = this.clientList.length; i < len; i++) {
            if (this.clientList[i].id === client.id) {
                has = true
                break
            }
        }
        if (!has) {
            this.clientList.push(client)
        }
    }

    remoteMode () {
        if (this.client) return
        import('socket.io-client')
            .then(io => {
                this.remoteSync = true
                this.client = io.connect(this.options.server + 'log')

                this.client.on('connect', () => {
                    this.client.emit('regist-admin')

                    this.client.on('regist-admin-success', (clients) => {
                        clients.map(client => {
                            this.addRemoteTarget(client)
                        })
                    })

                    this.client.on('add-client', client => {
                        this.clientList.push(client)
                    })

                    this.client.on('remove-client', client => {
                        this.clientList.map((c, i) => {
                            if (client.id === c.id) {
                                this.clientList.splice(i, 1)
                            }
                        })
                    })
                })
            })
    }

    setRemoteTarget (id) {
        this.remoteTarget = id
    }

    setRemoteAdmin (id) {
        this.remoteAdmin = id
    }

    syncRemote (id) {
        if (!this.client) return
        this.setRemoteTarget(id)
        this.client.emit('regist-admin')

        this.client.on('regist-admin-success', (clients) => {
            this.client.emit('sync-ask', {
                remoteTarget: id
            })
        })

        this.client.on('sync-down', data => {
            this.system = data.data.system
            this.logQueue = data.data.logQueue
            this.netWorkQueue = data.data.netWorkQueue
        })

        this.client.on('sync-update', data => {
            if (data.log) {
                this.logQueue.push(data.log)
                this.historyQueue.push(data.log)
                this.$emit('newLog', data.log)
            }
            if (data.net) this.addNetworkQueue(data.net)
        })
    }

    initSocket () {
        if (this.socket) return
        import('socket.io-client')
            .then(io => {
                this.socket = io.connect(this.options.server + 'log')
                this.socket.on('connect', () => {
                    this.socket.emit('regist', {
                        system: this.system
                    })

                    this.socket.on('sync-ask', (data) => {
                        console.log('this.setRemoteAdmin(data.remoteAdmin)', data.remoteAdmin)
                        this.setRemoteAdmin(data.remoteAdmin)

                        this.socket.emit('sync-up', {
                            remoteAdmin: data.remoteAdmin,
                            data: {
                                logQueue: this.logQueue,
                                netWorkQueue: this.netWorkQueue,
                                system: this.system
                            }
                        })
                    })

                    this.socket.on('run-code', (data) => {
                        this.execCommand(data.code)
                    })
                })
            })
    }

    toJSON () {
        return this
    }

    clearHistory () {
        this.historyQueue = []
        this.save()
        this.$emit('clearHistory')
    }

    clear () {
        this.logQueue = []
        this.$emit('clear')
    }

    errorHandler (error, vm, info) {
        const stack = TraceKit.computeStackTrace(error)
        if (!stack) {
            return console.log('simple report')
        }
        let lineNo
        let colNo

        if (stack.stack.length) {
            lineNo = stack.stack[0].line
            colNo = stack.stack[0].column
        }

        this.report({
            lineNo: lineNo,
            colNo: colNo,
            source: stack.url,
            name: stack.name,
            error: error,
            message: error.message,
            stack: stack.stack,
            info: info,
            vm: stringifyVue('', vm)
        })
    }

    loadAxios () {
        if (this.axios) return Promise.resolve(this.axios)
        return import('axios')
            .then(axios => {
                this.axios = axios
                return axios
            })
    }

    sendLog (id, log) {
        return this.axios({
            url: 'https://fd.igetget.com/log',
            method: 'post',
            data: {
                errorId: id,
                level: log.type,
                content: log.args
            }
        })
    }

    report ({ message, name, stack, info, vm, source, lineNo, colNo }) {
        const id = getUniqueId()
        const reportData = {
            requestId: id,
            name: name,
            message: message,
            stack: stack,
            info: info,
            source: source,
            lineNo: lineNo,
            colNo: colNo,
            vue: vm,
            system: this.system
        }

        console.log(reportData)

        this.loadAxios()
            .then(axios => {
                // this.historyQueue.map(log => this.sendLog(id, log))
                axios({
                    url: this.options.report,
                    method: 'post',
                    data: reportData
                })
                .then(res => {
                    console.info(res)
                })
                .catch(err => {
                    console.info(err)
                })
            })
    }

    write (method, logs) {
        const log = {
            id: this.logIndex++,
            type: method,
            date: Date.now(),
            args: logs
        }
        if (this.historyQueue.length > this.options.maxLogCount) {
            this.historyQueue.shift()
        }
        this.historyQueue.push(log)
        this.logQueue.push(log)

        this.$emit('newLog', log)

        if (this.socket) {
            this.socket.emit('run-code-callback', log)
            this.socket.emit('sync-update', {
                remoteAdmin: this.remoteAdmin,
                log: log
            })
        }

        clearTimeout(this.timer)
        this.timer = setTimeout(this.save.bind(this), 100)
    }

    save () {
        const str = JSON.stringify(this.historyQueue)
        const sucsess = setStorage('historyQueue', str)
        if (!sucsess) this.historyQueue = []
    }

    load () {
        const localStr = getStorage('historyQueue') || '[]'
        let queue = []

        try {
            queue = JSON.parse(localStr)
        } catch (e) {
            console.error(e)
        }

        return queue
    }

    execCommand (code) {
        if (this.remoteSync) {
            return this.execCommandRemote(code)
        }
        console.info(code)
        try {
            // eslint-disable-next-line
            let result = eval(code)
            console.info(result)
        } catch (e) {
            console.error(e)
        }
    }

    execCommandRemote (code) {
        if (!this.client) return

        this.client.emit('run-code', {
            target: this.remoteTarget,
            code: code
        })
    }

    mockConsole (methods) {
        methods.map(method => {
            let old = console[method]
            let vm = this
            console[method] = function (...args) {
                if (!args || !args.length) {
                    return old.apply(console, args)
                }

                vm.write(method, JSON.parse(stringify(args, stringifyVue)))

                old.apply(console, args)
            }
        })
    }

    mockOnError () {
        TraceKit.collectWindowErrors = false
        this.windowOnError = window.onerror
        window.onerror = (message, source, lineNo, colNo, error) => {
            const stack = error && TraceKit.computeStackTrace(error)
            if (!stack) return console.log('simple report')

            const err = {
                name: stack.name,
                message: message,
                source: source,
                lineNo: lineNo,
                colNo: colNo,
                error: error,
                stack: stack.stack
            }

            this.errorQueue.push(err)

            this.report(err)

            if (isFunction(this.windowOnError)) {
                this.windowOnError.call(window, message, source, lineNo, colNo, error)
            }
        }
    }

    requestFormat (req, data) {
        switch (req.readyState) {
        case 0:
        case 1:
            // UNSENT OPENED
            data.startTime = Date.now()
            break
        case 2:
            // HEADERS_RECEIVED
            data.header = req.getAllResponseHeaders()
            break
        case 3:
            // LOADING
            // data.loading = true
            break
        case 4:
            // DONE
            data.header = req.getAllResponseHeaders()
            data.headers = formatHeader(data.header)
            data.response = req.response
            data.endTime = Date.now()
            data.costTime = data.endTime - data.startTime
            break
        }
        data.status = req.status
        return data
    }

    addNetworkQueue (net) {
        let has = false
        for (let i = 0, len = this.netWorkQueue.length; i < len; i++) {
            if (this.netWorkQueue[i]._requestId === net._requestId) {
                has = true
                this.netWorkQueue[i] = net
                break
            }
        }
        if (!has) {
            this.netWorkQueue.push(net)
        }
        if (this.socket) {
            this.socket.emit('sync-update', {
                remoteAdmin: this.remoteAdmin,
                net: net
            })
        }
    }

    addOrUpdateRequest (req) {
        let has = false
        let net
        for (let i = 0, len = this.netWorkQueue.length; i < len; i++) {
            if (this.netWorkQueue[i]._requestId === req._requestId) {
                has = true
                net = this.requestFormat(req, this.netWorkQueue[i])
                break
            }
        }
        if (!has) {
            net = this.requestFormat(req, {
                _requestId: req._requestId,
                startTime: 0,
                costTime: 0,
                status: 0,
                header: '',
                headers: {},
                response: '',
                url: req._URL
            })
        }

        this.addNetworkQueue(net)
    }

    mockXMLHttpRequest () {
        if (!window.XMLHttpRequest) return
        const ignoreReg = /socket.io/
        const noop = () => {}
        let that = this
        let _open = window.XMLHttpRequest.prototype.open

        window.XMLHttpRequest.prototype.open = function (...args) {
            let XMLReq = this
            let url = args[1]
            const _onprogress = this.onprogress || noop
            const _onload = this.onload || noop
            XMLReq._requestId = getUniqueId()
            XMLReq._URL = url

            let _onreadystatechange = XMLReq.onreadystatechange || noop

            if (!ignoreReg.test(url)) {
                XMLReq.onreadystatechange = function () {
                    that.addOrUpdateRequest(this)
                    return _onreadystatechange.apply(XMLReq, arguments)
                }

                this.onprogress = function (...args) {
                    that.addOrUpdateRequest(this)
                    return _onprogress.apply(XMLReq, args)
                }

                this.onload = function (...args) {
                    that.addOrUpdateRequest(this)
                    return _onload.apply(XMLReq, args)
                }
            }

            return _open.apply(XMLReq, args)
        }
    }

    mock (methods) {
        this.mockConsole(methods)
        this.mockOnError()
        this.mockXMLHttpRequest()
    }
}