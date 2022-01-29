import Home from "@/views/Home";

export default [
    {
        path: '/',
        name: 'Home',
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
        name: 'users-list',
        component: () => import('@/views/admin/users/list.vue'),
        ...setLayout('admin')
    },
    {
        path: '/users/create',
        name: 'users-create',
        component: () => import('@/views/admin/users/create.vue'),
        ...setLayout('admin')
    },

    // сотрудники
    {
        path: '/employees',
        name: 'employees-list',
        component: () => import('@/views/admin/employees/list.vue'),
        ...setLayout('admin')
    },
    {
        path: '/employees/create',
        name: 'employees-create',
        component: () => import('@/views/admin/employees/create.vue'),
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
        name: 'job-positions-list',
        component: () => import('@/views/admin/job-positions/list.vue'),
        ...setLayout('admin')
    },
    {
        path: '/job-positions/create',
        name: 'job-positions-create',
        component: () => import('@/views/admin/job-positions/create.vue'),
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
