import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    bioraw: {
      type: "bioRaw",
      touch: false,
      hr: 0,
      dt: 0
    },
    biometrics: "",
    mousemetrics: "",
    updateTick: 1000,
  },
  mutations: {
    updateBioraw(state, bioraw) {
      state.bioraw = bioraw;
    },
    updateBiometrics(state, biometrics) {
      state.biometrics = biometrics;
    },
    // updateMousemetrics(state, mousemetrics) {
    //   state.mousemetrics = mousemetrics;
    // }
  },
  getters: {
    bioraw: state => state.bioraw,
    biometrics: state => state.biometrics,
    updateTick: state => state.updateTick,
    // mousemetrics: state => state.mousemetrics
  }
});
