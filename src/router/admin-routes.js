import {setLayout, setNavLink} from "@/router/metaUtils";

export default [

    // qr код
    {
        path: '/qr',
        name: 'qr',
        component: () => import('@/views/admin/qr-codes'),
        meta: {
            ...setLayout('qr', 'admin'),
            ...setNavLink({
                title: "QR код",
                icon: "mdi-qrcode-scan"
            })
        }
    },

    // журнал посещений
    {
        path: '/visits',
        name: 'visits',
        component: () => import('@/views/admin/visits'),
        meta: {
            ...setLayout('admin'),
            ...setNavLink({
                title: 'Журнал посещений',
                icon: 'mdi-book'
            })
        }
    },

    // пользователи
    {
        path: '/users',
        name: 'users',
        component: () => import('@/views/admin/users'),
        meta: {
            ...setLayout('admin'),
            ...setNavLink({
                title: 'Пользователи',
                icon: 'mdi-account-supervisor-circle'
            })
        }
    },

    // сотрудники
    {
        path: '/employees',
        name: 'employees',
        component: () => import('@/views/admin/employees'),
        meta: {
            ...setLayout('admin'),
            ...setNavLink({
                title: 'Сотрудники',
                icon: 'mdi-account-group'
            })
        }
    },
    {
        path: '/employees/show/:id',
        name: 'employees-show',
        props: true,
        component: () => import('@/views/admin/employees/show.vue'),
        meta: {
            ...setLayout('admin')
        }
    },

    // должности
    {
        path: '/job-positions',
        name: 'job-positions',
        component: () => import('@/views/admin/job-positions'),
        meta: {
            ...setLayout('admin'),
            ...setNavLink({
                title: 'Должности',
                icon: 'mdi-crown'
            })
        }
    },
]

