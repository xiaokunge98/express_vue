<template>
  <div id="echartsBox"></div>
</template>
<script>
export default {
  name: "index",
  props: {
    pWidth: {
      type: Number,
      default: 0
    },
    pHeight: {
      type: Number,
      default: 0
    },
    pOptions: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      eWidth: this.pWidth,
      eHeight: this.pHeight,
      options: this.pOptions, //图标数据配置
      myChart: null
    };
  },
  created() {},
  mounted() {
    this.initEcharts();
  },
  watch: {
    pWidth: {
      handle(val) {
        this.eWidth = val;
        console.log(val);
      },
      deep: true
    },
    pHeight(val) {
      this.eHeight = val;
      console.log(val);
    },
    pOptions(val) {
      this.options = val;

      console.log(val);
    }
  },
  methods: {
    initEcharts() {
      const echartsBox = document.querySelector("#echartsBox");
      echartsBox.style.width = this.eWidth + "px";
      echartsBox.style.height = this.eHeight + "px";
      this.myChart = this.$echarts.init(echartsBox);
      this.myChart.setOption(this.options);
    }
  }
};
</script>
