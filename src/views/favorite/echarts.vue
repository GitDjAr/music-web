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

onMounted(() => {
  var chartDom = document.getElementById("myChart");
  var myChart = echarts.init(chartDom);
  // const m2R2Data = [
  //   {
  //     value: 335,
  //     tagName: "种类01",
  //     name: "种类01  335",
  //     itemStyle: { color: props.randomColor() },
  //   },
  //   {
  //     value: 310,
  //     tagName: "种类02",
  //     name: "种类02  310",
  //     itemStyle: { color: "#5085f2" },
  //   },
  //   {
  //     value: 234,
  //     tagName: "种类03",
  //     name: "种类03  234",
  //     itemStyle: { color: "#e75fc3" },
  //   },
  //   {
  //     value: 154,
  //     tagName: "种类04",
  //     name: "种类04  154",
  //     itemStyle: { color: "#f87be2" },
  //   },
  //   {
  //     value: 335,
  //     tagName: "种类05",
  //     name: "种类05  335",
  //     itemStyle: { color: "#f2719a" },
  //   },
  //   {
  //     value: 335,
  //     tagName: "种类06",
  //     name: "种类06  335",
  //     itemStyle: { color: "#fca4bb" },
  //   },
  // ];

  const option = {
    title: [
      {
        text: "你最喜欢的流派",
        textStyle: {
          fontSize: 16,
          color: "black",
        },
        left: "2%",
      },
    ],
    tooltip: {
      trigger: "item",
      formatter: function (parms) {
        var str = parms.data.tagName + "</br>" + "占比：" + parms.percent + "%";
        return str;
      },
    },
    legend: {
      type: "scroll",
      orient: "vertical",
      left: "70%",
      align: "left",
      top: "middle",
      textStyle: {
        color: "#8C8C8C",
      },
      height: 250,
    },
    series: [
      {
        name: "标题",
        type: "pie",
        center: ["35%", "50%"],
        radius: ["40%", "65%"],
        clockwise: false, //饼图的扇区是否是顺时针排布
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: true,
            position: "outter",
            formatter: function (parms) {
              return parms.data.tagName;
            },
          },
        },
        labelLine: {
          normal: {
            length: 5,
            length2: 3,
            smooth: true,
          },
        },
        data: [],
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
    option.series[0].data = preferenceList.value;
    option && myChart.setOption(option);
  }
  getPreference();
});
</script>
<style scoped lang="scss"></style>
