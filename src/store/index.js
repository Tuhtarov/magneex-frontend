import Vue from 'vue'
import Vuex from 'vuex'

import user from "./modules/userStorage";
import employee from "./modules/employeeStorage";
import jobPosition from  "./modules/jobPositionStorage"
import role from "./modules/roleStorage";
import visit from "./modules/visitStorage";
import app from "./modules/appStorage";

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
    user, employee, jobPosition, role, visit, app
  },
  /* запрет на прямое изменение стейта
  в продакшен режиме сниманием запрет, т.к этот режим тормозит систему */
  strict: process.env.NODE_ENV !== 'production'
})
