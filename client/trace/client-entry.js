// import { app } from './app'
import Vue from 'vue'
import LogTracer from './trace'

const logTracer = new LogTracer({
    el: '#ddd', // default window
    clickCount: 5, // in 10s
    maxLogCount: 50,
    report: 'http://xxxxx.com/api/report',
    Vue: Vue
})

export default logTracer