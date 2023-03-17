import { createStore } from "vuex";
import getters from "./Getter";
import app from "./module/app";
import type { AppType } from "./module/app";
import song from "./module/song";
import type { songType } from "./module/song";

export interface RootState {
  app: AppType;
  song: songType;
}

export default createStore({
  state: {},
  mutations: {},
  getters,
  modules: {
    app,
    song,
  } as any,
});
