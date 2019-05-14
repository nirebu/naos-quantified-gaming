<template>
  <div id="app">
    <button v-if="connected === false" @click="connect">Start monitoring</button>
    <button v-if="connected === true" @click="disconnect">Stop monitoring</button>
    <p>Hand on mouse: {{ mouseTouched }}</p>
    <p v-if="mouseTouched === true">
      Heart rate sensor: {{ heartRateState }}
      <span v-if="heartRateState === 'active'">
        <br>
        Heartrate: {{ heartRate }}
      </span>
    </p>
    <p v-if="mouseTouched === true">Galvanic skin response: {{ gsr }}</p>
    <HeartRateChart />
  </div>
</template>

<script>
import HeartRateChart from './components/HeartRateChart'

export default {
  name: "app",
  methods: {
    connect() {
      this.socket = new WebSocket("ws://localhost:7681", "mionix-beta");
      this.socket ? (this.connected = true) : (this.connected = false);
      let updatedBioraw, updatedBiometrics;
      this.socket.onmessage = message => {
        var data = JSON.parse(message.data);
        if (data.type == "bioMetrics") {
          updatedBiometrics = data;
        } else if (data.type == "bioRaw") {
          updatedBioraw = data;
          // } else if (data.type == "mouseMetrics") {
          //   this.$store.commit("updateMousemetrics", data);
        }
      };
      /*
        Set up to use an updateInterval() to avoid bombing
        the Vuex store with updates
      */
      this.intervalRunning = setInterval(() => {
        this.$store.commit("updateBiometrics", updatedBiometrics);
        this.$store.commit("updateBioraw", updatedBioraw);
        if( this.mouseTouched )
          this.$store.commit("pushDataPoint", { gsrPoint: (updatedBiometrics.gsr * 15) , heartRatePoint: updatedBiometrics.heartRate });
        else
          this.$store.commit("pushDataPoint", { gsrPoint: null, heartRatePoint: null });
      }, this.$store.getters.updateTick);
    },
    disconnect() {
      this.socket.close();
      clearInterval(this.intervalRunning);
      this.connected = false;
    }
  },
  data() {
    return {
      connected: false
    };
  },
  computed: {
    mouseTouched() {
      return this.$store.getters.bioraw.touch;
    },
    heartRate() {
      return this.$store.getters.biometrics.heartRate;
    },
    heartRateState() {
      return this.$store.getters.biometrics.heartRateState;
    },
    gsr() {
      return this.$store.getters.biometrics.gsr;
    }
  },
  components: {
    HeartRateChart
  }
};
</script>

<style>
</style>
