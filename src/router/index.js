import Vue from 'vue'
import VueRouter from 'vue-router'
import token from '@/api/TokenManager.js';
import routes from "@/router/routes";

Vue.use(VueRouter)

/*
* По умолчанию vue-router работает в режиме хэша — он использует хэш URL
* для симуляции полного URL-адреса, что позволяет избежать
*  перезагрузки страницы при изменении URL.
*
 Мы можем обойтись без хэша, используя режим history,
 который работает с API history.pushState для достижения той же цели:
*/

const router = new VueRouter({
    routes,
    mode: 'history' // режим HTML5 History (не все браузеры с ним совместимы?)
})

router.beforeEach((to, from, next) => {
    if (token.isEmpty() && to.name !== 'login') {
        next({name: 'login'})
    } else {
        next();
    }
});

export default router
