import Vue from 'vue'
import Vuex from 'vuex'

import application from "./modules/application"
import user from "./modules/user";

Vue.use(Vuex)

export default new Vuex.Store({
  // приватные свойства (readonly)
  state: {
  },
  // геттеры к приватным свойствам
  getters: {
  },
  // методы для изменения свойств
  mutations:{
  },
  // методы для ассинхронщины и работы с мутациями
  actions: {
  },
  // здесь подключаются модули хралища (хранилища других компонентов)
  modules: {
    application, user
  },
  /* запрет на прямое изменение стейта
  в продакшен режиме сниманием запрет, т.к этот режим тормозит систему */
  strict: process.env.NODE_ENV !== 'production'
})
