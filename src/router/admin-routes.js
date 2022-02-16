import {setLayout, setNavLink} from "@/router/metaUtils";

export default [

    // qr код
    {
        path: '/qr',
        name: 'qr',
        component: () => import('@/views/admin/qr-codes/index.vue'),
        meta: {
            ...setLayout('qr'),
            ...setNavLink({
                title: "QR код",
                icon: "mdi-close"
            })
        }
    },

    // пользователи
    {
        path: '/users',
        name: 'users',
        component: () => import('@/views/admin/users/index.vue'),
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
        component: () => import('@/views/admin/employees/index.vue'),
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
        ...setLayout('admin')
    },

    // должности
    {
        path: '/job-positions',
        name: 'job-positions',
        component: () => import('@/views/admin/job-positions/index.vue'),
        meta: {
            ...setLayout('admin'),
            ...setNavLink({
                title: 'Должности',
                icon: 'mdi-crown'
            })
        }
    },
]

