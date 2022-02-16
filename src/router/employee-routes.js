import { setLayout, setNavLink } from "@/router/metaUtils";

export default [
    {
        path: '/qr-scan/:token',
        name: 'qr-scan',
        component: () => import('@/views/employee/qr-codes/qr-scan'),
        meta: {
            ...setLayout('employee')
        }
    },
    {
        path: '/my-visits',
        name: 'my-visits',
        component: () => import('@/views/employee/history/'),
        meta: {
            ...setLayout('employee'),
            ...setNavLink({
                title: "Моя история",
                icon: "mdi-close"
            })
        }
    },
]

