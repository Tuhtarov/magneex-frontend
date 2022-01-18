import Home from "@/views/Home";
import Login from "@/views/Login";

export default [
    {
        path: '/',
        name: 'Home',
        component: Home,
        ...setLayout('default')
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        ...setLayout('login')
    },
    {
        path: '/logout',
        name: 'logout',
        component: () => import(/* webpackChunkName: "logout" */ '@/views/Logout.vue'),
        ...setLayout('login')
    },
    {
        path: '*',
        name: '404',
        component: () => import(/* webpackChunkName: "about" */ '@/views/E404.vue'),
        ...setLayout('login')
    }
]

/**
 * @param {string} name
 * @returns {{meta: {layout}}}
 */
function setLayout(name) {
    return {
        meta: {
            layout: `${name}Layout`
        }
    }
}
