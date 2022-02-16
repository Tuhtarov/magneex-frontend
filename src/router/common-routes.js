import {setLayout, setNavLink} from "@/router/metaUtils";
import employeeRoutes from "@/router/employee-routes";
import adminRoutes from "@/router/admin-routes";
import Home from "@/views/Home";

export default [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            ...setLayout('common'),
            ...setNavLink({
                title: "Главная",
                icon: "mdi-home"
            })
        }
    },
    
    ...employeeRoutes,
    ...adminRoutes,

    // авторизация
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue'),
        ...setLayout('login')
    },
    {
        path: '/logout',
        name: 'logout',
        component: () => import('@/views/Logout.vue'),
        ...setLayout('login')
    },

    // ошибки
    {
        path: '/error/network-error',
        name: '408',
        component: () => import('@/views/errors/E408.vue'),
        ...setLayout('error')
    },
    {
        path: '*',
        name: '404',
        component: () => import('@/views/errors/E404.vue'),
        ...setLayout('error')
    }
]

