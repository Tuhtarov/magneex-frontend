import {setLayout, setNavLink} from "@/router/metaUtils";
import Home from "@/views/Home";

export default [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            ...setLayout('employee'),
            ...setNavLink({
                title: "Главная",
                icon: "mdi-home"
            })
        }
    },

    // qr код
    {
        path: '/qr-scan/:token',
        name: 'qr-scan',
        component: () => import('@/views/employee/qr-codes'),
        ...setLayout('employee'),
    },
]

