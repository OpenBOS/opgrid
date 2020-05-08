import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '',
        component: () => import('./pages/Index')
    },
    {
        path: '/operations/demo',
        component: () => import('./pages/Operation/Show'),
        children: [
            {
                path: '',
                component: () => import('./pages/Operation/Module/Grid')
            },
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
