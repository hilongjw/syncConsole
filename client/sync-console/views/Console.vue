<style scoped>
.rd-console-console {
    position: relative;
    box-sizing: border-box;
    padding-bottom: 35px;
}
.rd-console-exec-text {
    width: 100%;
    height: 35px;
    line-height: 35px;
    font-size: 12px;
    outline: none;
    padding: 0 10px;
    box-sizing: border-box;
    border: 1px solid #e2e2e2;
}
.rd-console-view-type {
    display: flex;
    width: 100%;
    background: #fff;
    line-height: 30px;
}
.rd-console-view-type-item {
    padding: 0 20px;
    border-bottom: 1px solid #fff;
}
.rd-console-view-type-item.active {
    padding: 0 20px;
    color: #3F51B5;
    border-bottom: 1px solid #673AB7;
}
</style>

<template>
    <div class="rd-console-view rd-console-console">
        <div class="rd-console-view-type">
            <div 
                class="rd-console-view-type-item" 
                :class="{ 'active': type.active }"
                v-for="type in typeList"
                @click="chooseType(type)"
            >
                {{ type.text }}
            </div>
        </div>
        <Log :key="log.id" :log="log" v-for="log in logs"></Log>
        <div class="rd-console-execcode">
            <textarea 
                @keyup.enter="fire" 
                placeholder="run code here..." 
                class="rd-console-exec-text" 
                v-model="command"
                rows="1"
            ></textarea>
            <div class="rd-console-execcode-action-right">
                <button class="rd-console-btn highlight"  @click="fire">OK</button>
                <button class="rd-console-btn"  @click="clear">Clear</button>
            </div>
        </div>
    </div>
</template>

<script>
import Log from '../components/LogViewer.vue'

export default {
    data () {
        return {
            $list: null,
            type: '',
            typeList: [{
                text: 'verbose',
                key: '',
                active: true
            }],
            command: '',
            logQueue: this.$syncConsole.logQueue.slice()
        }
    },
    computed: {
        logs () {
            if (!this.type) return this.logQueue
            return this.logQueue.filter(log => {
                return log.type === this.type
            })
        }
    },
    components: {
        Log
    },
    created () {
        this.$syncConsole.mockConsole.options.methods.map(method => {
            this.typeList.push({
                text: method,
                key: method,
                active: false
            })
        })
    },
    mounted () {
        this.$syncConsole.$on('clear', () => {
            this.logQueue = []
        })
        this.$syncConsole.$on('update-log', () => {
            this.logQueue = this.$syncConsole.logQueue
            this.$nextTick(() => {
                this.listToBottom()
            })
        })
        this.$syncConsole.$on('init-log', list => {
            this.logQueue = list
        })
        this.$list = document.body.querySelector('.rd-console-body')
    },
    beforeDestroy () {
        this.$syncConsole.$off('update-log')
        this.$syncConsole.$off('clear')
        this.$syncConsole.$off('init-log')
    },
    methods: {
        listToBottom () {
            if (!this.$list) return
            this.$list.scrollTop = this.$list.scrollHeight
        },
        chooseType (type) {
            this.typeList.map(item => (item.active = false))
            this.type = type.key
            type.active = true
        },
        fire () {
            this.$syncConsole.execCommand(this.command)
            this.command = ''
        },
        clear () {
            this.logQueue = []
        }
    }
}
</script>
