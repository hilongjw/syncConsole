import Vue from 'vue'

const el = document.createElement('div')
el.id = 'ddd'
el.setAttribute('style', 'height: 20px; width: 20px; background: red;')
document.body.appendChild(el)

// eslint-disable-next-line
const syncConsoleManager = new window.SyncConsole.default({
    el: '#ddd', // default window
    clickCount: 5, // in 10s

    // for sync console
    // project: 'some IM',
    maxLogCount: 50,
    server: 'http://sync.bood.in/',
    Vue: Vue
})

 // eslint-disable-next-line
const app = new Vue({
    el: '#app',
    render (h) {
        return <div>1</div>
    },
    mounted () {
        console.log('app mounted')
        // this.show()
    },
    methods: {
        show () {
            console.log(this.a.b)
        }
    }
})

console.log('app test')
