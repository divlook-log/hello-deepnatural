import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import LabelingTool from '@/views/LabelingTool.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'LabelingTool',
        component: LabelingTool,
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router
