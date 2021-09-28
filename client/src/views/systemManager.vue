<template>
  <div style="height:100%;background:blue">
    <div id="test_box" style="width:50%;height:100%"></div>
  </div>
</template>
<script>
export default {
  name: "systemSetting",
  data() {
    return {
      myEcharts: null,
      barData: [70, 34, 60, 78, 69],
      valdata: [702, 350, 610, 793, 664],
      titlename: ["HTML5", "CSS3", "javascript", "VUE", "NODE"],
      myColor: ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"],
      options: {
        //图标位置
        grid: {
          top: "10%",
          left: "22%",
          bottom: "10%"
        },
        xAxis: {
          show: false
        },
        yAxis: [
          {
            show: true,
            data: ["HTML5", "CSS3", "javascript", "VUE", "NODE"],
            inverse: true,
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: "#fff",

              rich: {
                lg: {
                  backgroundColor: "#339911",
                  color: "#fff",
                  borderRadius: 15,
                  // padding: 5,
                  align: "center",
                  width: 15,
                  height: 15
                }
              }
            }
          },
          {
            show: true,
            inverse: true,
            data: [702, 350, 610, 793, 664],
            axisLabel: {
              textStyle: {
                fontSize: 12,
                color: "#fff"
              }
            }
          }
        ],
        series: [
          {
            name: "条",
            type: "bar",
            yAxisIndex: 0,
            data: [70, 34, 60, 78, 69],
            barCategoryGap: 50,
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 20,
                color: function(params) {
                  var num = [
                    "#1089E7",
                    "#F57474",
                    "#56D0E3",
                    "#F8B448",
                    "#8B78F6"
                  ].length;
                  return [
                    "#1089E7",
                    "#F57474",
                    "#56D0E3",
                    "#F8B448",
                    "#8B78F6"
                  ][params.dataIndex % num];
                }
              }
            },
            label: {
              normal: {
                show: true,
                position: "inside",
                formatter: "{c}%"
              }
            }
          },
          {
            name: "框",
            type: "bar",
            yAxisIndex: 1,
            barCategoryGap: 50,
            data: [100, 100, 100, 100, 100],
            barWidth: 15,
            itemStyle: {
              normal: {
                color: "none",
                borderColor: "#00c1de",
                borderWidth: 3,
                barBorderRadius: 15
              }
            }
          }
        ]
      }
    };
  },
  mounted() {
    this.doEcharts();
  },
  methods: {
    doEcharts() {
      let box = document.querySelector("#test_box");
      this.myEcharts = this.$echarts.init(box);
      this.myEcharts.setOption(this.options);
    }
  }
};
</script>
