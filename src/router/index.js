import Vue from 'vue'
import VueRouter from 'vue-router'
import token from '@/api/TokenManager.js';
import routes from "@/router/common-routes";

Vue.use(VueRouter)

const router = new VueRouter({
    routes,
    mode: 'history'
})

router.beforeEach((to, from, next) => {
    if (token.isEmpty() && to.name !== 'login') {
        next({name: 'login'})
    } else {
        next();
    }
});

export default router
