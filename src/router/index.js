import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

/*
* По умолчанию vue-router работает в режиме хэша — он использует хэш URL
* для симуляции полного URL-адреса, что позволяет избежать
*  перезагрузки страницы при изменении URL.
*
 Мы можем обойтись без хэша, используя режим history,
 который работает с API history.pushState для достижения той же цели:
* */

const router = new VueRouter({
    routes,
    mode: 'history' // режим HTML5 History (не все браузеры с ним совместимы?)
})

export default router
