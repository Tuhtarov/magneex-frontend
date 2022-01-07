import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // приватные свойства (readonly)
  state: {
    // key: 'value'
  },
  // геттеры к приватным свойствам
  getters: {
    // getKey: state => state.key
  },
  // методы для изменения свойств
  mutations:{
    setKey(state, value) {
      if (value > 1) {
        state.key = value
      }
    }
  },
  // методы для ассинхронщины и работы с мутациями
  actions: {
    setEntityKey(store, value) {
      console.log('Запрос на сервер')

      setTimeout(() => {
        store.commit('setKey', value)
      }, 1000)
    }
  },
  // здесь подключаются модули хралища (хранилища других компонентов)
  modules: {
  },
  /* запрет на прямое изменение стейта
  в продакшен режиме сниманием запрет, т.к этот режим тормозит систему */
  strict: process.env.NODE_ENV !== 'production'
})
