import Home from "@/views/Home";

export default [
    {
        path: '/',
        name: 'main',
        component: Home,
        ...setLayout('admin')
    },

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

    // пользователи
    {
        path: '/users',
        name: 'users',
        component: () => import('@/views/admin/users/index.vue'),
        ...setLayout('admin')
    },

    // сотрудники
    {
        path: '/employees',
        name: 'employees',
        component: () => import('@/views/admin/employees/index.vue'),
        ...setLayout('admin')
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
        ...setLayout('admin')
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
