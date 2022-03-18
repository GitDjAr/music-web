import { createStore } from "vuex";
import getters from './Getter'
import app from './module/app'

export default createStore({
  state: {},
  mutations: {},
  getters,
  modules:{
    app
  }
});
