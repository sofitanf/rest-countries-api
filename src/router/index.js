import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Detail from '../views/Detail.vue'

const routes = [{
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/detail',
        name: 'detail',
        component: Detail,
    },
    {
        path: '/:catchAll(.*)*',
        redirect: { name: 'home' },
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router