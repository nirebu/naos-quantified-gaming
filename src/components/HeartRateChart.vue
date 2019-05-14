<template>
    <div id="chart">
      <ApexChart type="area" height="350" :options="chartOptions" :series="series" />
    </div>
</template>

<script>
import ApexChart from 'vue-apexcharts'

export default {
  computed: {
    series() {
      return ([
        {
          name: "HeartRate",
          data: this.$store.getters.heartRateHistory,
        },
        {
          name: "GSR",
          data: this.$store.getters.gsrHistory,
        },
      ]);
    },
  },
  data() {
    return({
      chartOptions: {
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "smooth"
        },
        yaxis: {
          min: 0,
          max: 160,
          dataLabels: {
            enabled: false
          }
        },
        sparkline: {
          enabled: false
        },
        chart:{
          animations: {
            enabled: false,
            animateGradually: {
              enabled: false
            },
            dynamicAnimation: {
              enabled: false
            }
          }
        },
        tooltip: {
          enabled: false
        }
      }
    })
  },
  components: {
    ApexChart
  }
}
</script>

<style>

</style>
