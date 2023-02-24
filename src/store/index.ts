import { createStore } from "vuex";
import getters from './Getter'
import app from './module/app'
import song from "./module/song";

export default createStore({
  state: {},
  mutations: {},
  getters,
  modules: {
    app,
    song
  }
});
