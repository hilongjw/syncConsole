import Vue from 'vue'
import VueRouter from 'vue-router'

import Console from '../views/Console.vue'
import History from '../views/History.vue'
import Application from '../views/Application.vue'
import SystemView from '../views/System.vue'
import Remote from '../views/Remote.vue'
import Network from '../views/Network.vue'
import Resource from '../views/Resource.vue'
import Element from '../views/Element.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/console',
        name: 'console',
        component: Console
    }, {
        path: '/history',
        name: 'history',
        component: History
    }, {
        path: '/application',
        name: 'application',
        component: Application
    }, {
        path: '/system',
        name: 'system',
        component: SystemView
    }, {
        path: '/remote',
        name: 'remote',
        component: Remote
    }, {
        path: '/network',
        name: 'network',
        component: Network
    }, {
        path: '/resource',
        name: 'resource',
        component: Resource
    }, {
        path: '/element',
        name: 'element',
        component: Element
    }
]

const router = new VueRouter({
    mode: 'abstract',
    routes
})

export default router
