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
    updateTick: 50,
    maxDataPoints: 100,
    heartRateHistory: [],
    gsrHistory: [],
  },
  mutations: {
    updateBioraw(state, bioraw) {
      state.bioraw = bioraw;
    },
    updateBiometrics(state, biometrics) {
      state.biometrics = biometrics;
    },
    pushDataPoint(state, { gsrPoint , heartRatePoint }) {
      if( state.heartRateHistory.length < state.maxDataPoints ) {
        state.heartRateHistory.push( heartRatePoint );
        state.gsrHistory.push( gsrPoint );
      }
      else {
        state.heartRateHistory.shift();
        state.heartRateHistory.push( heartRatePoint );
        state.gsrHistory.shift();
        state.gsrHistory.push( gsrPoint );
      }
    },
    // updateMousemetrics(state, mousemetrics) {
    //   state.mousemetrics = mousemetrics;
    // }
  },
  getters: {
    bioraw: state => state.bioraw,
    biometrics: state => state.biometrics,
    updateTick: state => state.updateTick,
    heartRateHistory: state => state.heartRateHistory,
    gsrHistory: state => state.gsrHistory,
    // mousemetrics: state => state.mousemetrics
  }
});
