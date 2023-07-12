<!--  -->
<template>
  <div class="w-full h-full" id="myChart"></div>
</template>

<script lang="ts" setup>
import { preference } from "@/api/playlist";
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
const props = defineProps({
  randomColor: {
    type: Function,
    default: () => {},
  },
});

let chartDom, myChart;

onMounted(() => {
  chartDom = document.getElementById("myChart");
  var myChart = echarts.init(chartDom);
  var option = {
    title: {
      text: "",
    },
    tooltip: {},
    animationDurationUpdate: 1500,
    label: {
      normal: {
        show: true,
        textStyle: {
          fontSize: 12,
        },
      },
    },
    series: [
      {
        type: "graph",
        layout: "force", //采用力引导布局
        symbolSize: 45,
        legendHoverLink: true, //启用图例 hover 时的联动高亮。
        focusNodeAdjacency: true, //在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点。
        roam: true,
        label: {
          normal: {
            show: true,
            position: "inside",
            textStyle: {
              fontSize: 12,
            },
          },
        },
        force: {
          repulsion: 1000,
        },
        edgeSymbolSize: [4, 50],
        edgeLabel: {
          normal: {
            show: true,
            textStyle: {
              fontSize: 10,
            },
            formatter: "{c}",
          },
        },
        categories: [
          {
            itemStyle: {
              normal: {
                color: "#BB8FCE",
              },
            },
          },
          {
            itemStyle: {
              normal: {
                color: "#0099FF",
              },
            },
          },
          {
            itemStyle: {
              normal: {
                color: "#5DADE2",
              },
            },
          },
        ],
        data: [],
        links: [],
        lineStyle: {
          normal: {
            opacity: 0.9,
            width: 1,
            curveness: 0,
          },
        },
      },
    ],
  };

  const preferenceList = ref([]);
  const preferenceTag = ref([]);
  async function getPreference() {
    const { data } = await preference();
    preferenceList.value = data.tagPreferenceVos.map((e) => ({
      ...e,
      value: e.ratio,
      name: e.tagName,
    }));
    preferenceTag.value = data.tags;

    let tagListObj = data.tags.reduce((p, n) => {
      p[n.tagName] = n.tagId;
      return p;
    }, {});
    var lines: any[] = [];
    var dataArray: any[] = reducer(data.tags, [
      {
        name: "风格",
        draggable: true,
      },
    ]);
    option.series[0].links = lines;
    option.series[0].data = dataArray;

    function reducer(arr = [], item = <any>[]) {
      return arr.reduce((p, n: any, i) => {
        p.push({ name: n.tagName, category: n.level, draggable: true });
        let id = tagListObj[n.tagName] || 0;
        lines.push({
          source: id + n.level,
          target: id + n.level + 1,
          value: "",
        });
        if (n.childrenTags) {
          let ar = reducer(n.childrenTags, []);
          p.push(...ar);
        }
        return p;
      }, item);
    }
    console.log(lines, dataArray);

    option && myChart.setOption(option);
  }
  getPreference();
});
function resize() {
  myChart?.resize();
}
</script>
<style scoped lang="scss"></style>
