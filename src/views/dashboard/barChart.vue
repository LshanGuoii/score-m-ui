<!--
 - 可视化-通用图表（柱形）
 - author: chenhao
-->
<template>
  <div :id="name" />
</template>

<script>
import * as echarts from "echarts";

const seriesMap = {
  bar({ name, data, labelShow }) {
    /** *********此处是为了处理(柱状图)数据差距太大导致有些数据不为0但是柱子看不到的问题*********/
    // const barData = []
    // data.forEach(item => {
    //   if (+item === 0) {
    //     barData.push(null)
    //   } else {
    //     barData.push(+item)
    //   }
    // })
    /** **********************************************************************************/
    return {
      name,
      type: "bar",
      barMaxWidth: 38,
      barMinWidth: 5,
      barMinHeight: 0,
      stack: "stack",
      label: {
        show: labelShow,
        position: "top",
      },
      data,
    };
  },
  line({ name, data }) {
    return {
      name,
      type: "line",
      symbol: "circle",
      symbolSize: 6,
      data: data,
    };
  },
};

export default {
  name: "BarChart",
  props: {
    name: {
      type: String,
      default: "barChart",
    },
    option: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      myChart: null,
    };
  },
  watch: {
    option: {
      handler() {
        this.initData();
      },
      deep: true,
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initData();
    });
  },
  methods: {
    // 初始化
    initData() {
      if (this.option) {
        this.initEchart(this.getOptions(this.option));
      }
    },
    areaStyle(
      startColor = "rgba(249, 123, 123, 0.2)",
      endColor = "rgba(249, 123, 123, 0)"
    ) {
      return {
        color: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: startColor,
            },
            {
              offset: 1,
              color: endColor,
            },
          ],
        },
      };
    },
    // 颜色转换
    hexToRgb(hex, opacity) {
      return (
        "rgba(" +
        parseInt("0x" + hex.slice(1, 3)) +
        "," +
        parseInt("0x" + hex.slice(3, 5)) +
        "," +
        parseInt("0x" + hex.slice(5, 7)) +
        "," +
        opacity +
        ")"
      );
    },
    //  prefix：金额前缀； toThousand 是否是千分位；toFixed：保留几位小数；areaStyle：是否显示折线图阴影；labelShow：显示柱子上的数字
    getOptions({
      title,
      subTitle,
      serieData,
      type,
      dataZoomShow = true,
      areaStyle = false,
      color,
      prefix = "",
      toFixed = 2,
      toThousand = true,
      labelShow = true,
      axisFormatter = true,
      showLegend = true,
      startValue = 0,
      endValue = 0,
    }) {
      const series = [];
      if (!serieData || !serieData.datas) return;
      // serieData.datas.forEach((item, idx) => {
      const obj = seriesMap[type]({
        // name: "考试人数",
        data: serieData.datas,
        labelShow: labelShow,
      });
      // if (areaStyle) {
      //   obj.areaStyle = this.areaStyle(this.hexToRgb(color[idx], 0.2), this.hexToRgb(color[idx], 0))
      // }
      series.push(obj);
      // })
      startValue = serieData.xaxis[startValue];
      endValue = serieData.xaxis[endValue - 1];
      if (serieData.xaxis.length === 0) {
        const option = {
          title: {
            text: "暂无数据",
            x: "center",
            y: "center",
            textStyle: {
              color: "#5E5F60",
              fontWeight: "normal",
              fontSize: 14,
            },
          },
        };
        return option;
      } else {
        const option = {
          title: {
            text: title,
            textStyle: {
              color: "#525658",
              fontSize: 16,
              fontWeight: 500,
            },
            subtext: subTitle,
            subtextStyle: {
              color: "#848587",
              fontSize: 12,
            },
            x: 22,
          },
          tooltip: {
            backgroundColor: "rgba(0, 0, 0, 0.65)",
            borderColor: "rgba(0, 0, 0,0)",
            textStyle: {
              color: "#fff",
            },
            trigger: "axis",
            axisPointer: {
              type: "line", // 默认为直线，可选为：'line' | 'shadow'
            },
            // formatter: function (item) {
            //   let html = "";
            //   html += `考试名称</br>`;
            //   const itemData = item.map((ele) => {
            //     return `${ele.seriesName}：${ele.value}人 `;
            //   });
            //   html += itemData.join("</br>");
            //   return html;
            // },
          },
          grid: [
            {
              left: 20,
              right: 20,
              bottom: 50,
              top: 20,
              containLabel: true,
            },
          ],
          xAxis: [
            {
              type: "category",
              axisLine: {
                show: true,
                lineStyle: {
                  width: 1,
                  color: "#EBECF0",
                },
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                // show: false,
                color: "#525658",
                fontSize: 11,

                formatter: (val) => {
                  if (!axisFormatter) {
                    if (val.length > 5) {
                      return val.substr(0, 5) + "...";
                    }
                    return val;
                  }
                  return val;
                  // return '考试名称'
                },
              },
              data: serieData.xaxis,
            },
          ],
          yAxis: [
            {
              type: "value",
              splitLine: {
                show: true,
                lineStyle: {
                  color: "#EBECF0",
                  type: "dashed",
                },
              },
              axisLabel: {
                color: "#525658",
                fontSize: 11,
              },
            },
          ],
          color: color,
          dataZoom: [
            {
              type: "slider",
              height: 19,
              bottom: 8,
              show: dataZoomShow,
              startValue,
              endValue,
              borderColor: "none",
              backgroundColor: "#F7F7F9",
              fillerColor: "#EBF5FF",
              moveHandleSize: 0,
              showDataShadow: false,
              left: 100,
              right: 100,
              handleIcon:
                "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAmVBMVEUAAAAXkP8ak/8YkP8YkP8Ujv8Zk/8Zkf8um/8inP8Ykf8Lhf8clf8JjP8bkP8YkP8yqf8joP+az/81sf8YkP8Zj/8Wjv8Kif8RjP8SiP8Uiv8ynf9Epv9Lx/88uf88nv8Ph/8nov9Cwv8Zkf8akP8akP8YkP8Vj/8Rjf81nv9zvP9esv8ilf9/wf+GxP9BpP88of8klv8ckv8NmKteAAAAJnRSTlMA8d/q+vba0M7Ns7KshWxoVCIfH5BZ/Pjw4eB0cjk5FRULCJBaWRBzpVYAAAFKSURBVEjHrdbZdoIwEAbgJqyyiAq477aT4K7v/3BNT6maisDP8b+Aq++QQJiZj3dkFaeJ53DD4I6XpPGqEnSjgDOT8piMB1G3FPRCm5Gghwhidth7CZYT16KCWO5kWSxm/lBSYeTQnxWJTkvQy4hW51m0x5JKIsftJ2FQRYx/pjOiyoy0tc3v+yjbz/wuFr4SNYy/uJHpgGplML19c1fWI9Lt5SS0tMdLSSp/V23JVpifRFsTl1Omrtfz+SqIstNFM/bvGY2Y9vDsuBMk9tvtXt12x0xbNIt+xDro6+TwSA466QdrRWJO9QnxWJEvhhCWKrIxEWIminiEEPIUcTDiKMIxwhUxMGI0IvjC8O03e8kJ/ilT/MDgxxI//Pgvhv/IeLloUpTw0ocXWLyM480Cb0l448PbK97E8VEBHkjwsad6uPrclA9XeL4Bw88HqQM6Al4AAAAASUVORK5CYII=",
              handleSize: "120%",
              handleStyle: {
                color: "#1890FF",
              },
            },
          ],
          legend: {
            show: showLegend,
            top: 50,
            left: 22,
            itemWidth: type === "line" ? 18 : 8,
            itemHeight: 8,
            itemGap: 16,
            align: "left",
            textStyle: {
              padding: [2, 0, 0, 0],
              color: "#000000",
            },
          },
          series: series,
        };
        return option;
      }
    },
    // 初始化Echart
    async initEchart(data) {
      const dom = document.getElementById(this.name);
      if (dom) {
        if (this.myChart) {
          await this.myChart.dispose();
        }
        const myChart = await echarts.init(dom);
        this.myChart = myChart;
        const option = { ...data };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      }
    },
    // 重置窗口大小
    resize() {
      this.myChart.resize();
    },
  },
};
</script>
