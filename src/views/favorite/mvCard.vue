<template>
  <div class="container">
    <div ref="projectsRef" class="projects">
      <div
        v-for="(item, index) in projects"
        :key="index"
        class="project rounded-md overflow-hidden"
      >
        <MovieCard :key="item.vid" :item="item" />

        <!-- <Image
          style="width: 250px; height: 250px"
          :src="item.coverUrl"
          :wh="[300, 300]"
        ></Image>
        <div class="title flex-1 flex-col justify-center">
          <p class="mb-7 text-xl">
            {{ item.title }}
          </p>
          {{ item.creator.map((e) => e.userName).join("/") }}
        </div>
        <svg
          viewBox="0 0 445 250"
          width="445"
          height="250"
          class="absolute top-0 left-0 overflow-visible -z-10"
        >
          <path
            v-for="(color, i) in pathColors"
            :key="i"
            :d="paths[i]"
            :fill="color"
          />
        </svg> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, Ref } from "vue";
import { likedMVs } from "@/api/user";
import { T } from "@/api/playlist";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { getImgsColor } from "@/utils/getImgsColor";
import MovieCard from "@/components/MovieCard.vue";

// 注册 Draggable 插件
gsap.registerPlugin(Draggable);

export default defineComponent({
  name: "ProjectCard",
  async setup() {
    // 数据定义
    const projects = ref<T.mvSubscriber[]>([]);

    // 动态路径和颜色
    const paths = ref<string[]>(
      Array(3).fill("M 0,0 L 445,0 Q 445,125 445,250 L 0,250 Q -50,125 0,0 z"),
    );
    const pathColors = ["#ded5fc", "#e3e9fc", "#cdd8fc"];

    // DOM 引用
    const projectsRef = ref<HTMLElement | null>(null);
    const openedIndex = ref<number | null>(null);

    // 拖拽相关变量
    let prevX = 0;
    let diffX = 0;
    let draggableX = 0;

    // 初始化动画和拖拽
    onMounted(() => {
      const container = projectsRef.value;
      const projectEls = container?.querySelectorAll(".project");

      if (!container || !projectEls) return;

      // 设置初始透明度
      container.style.opacity = "1";

      // 入场动画
      gsap.from(container, {
        x: window.innerWidth,
        ease: "expo.out",
        duration: 1,
      });

      // 配置 Draggable
      Draggable.create(container, {
        type: "x",
        bounds: document.querySelector(".container"),
        inertia: true,
        throwProps: true,
        onDrag: function () {
          draggableX = this.x;
        },
        onThrowUpdate: function () {
          draggableX = this.x;
        },
      });

      // 动画循环
      const tick = () => {
        prevX += (draggableX - prevX) * 0.25;
        diffX = (draggableX - prevX) * 0.5;

        projectEls.forEach((project) => {
          const pathEls = project.querySelectorAll("svg path");
          const title = project.querySelector(".title") as HTMLElement;

          pathEls.forEach((path, index) => {
            const rate = index / 3;
            const moveM = (1 - rate) * -2;
            const moveX = diffX * moveM * 1;
            const bendM = (1 - rate) * 2;
            const bendX = diffX * bendM * 0.75;
            const d = `M ${moveX},0 L ${445 + moveX},0 Q ${445 + moveX + bendX},125 ${445 + moveX},250 L ${moveX},250 Q ${bendX + moveX},125 ${moveX},0 z`;
            path.setAttribute("d", d);
            paths.value[index] = d; // 更新响应式路径
          });

          if (title) {
            title.style.transform = `translate3d(${diffX * -0.05}px, 0, 0)`;
          }
        });

        requestAnimationFrame(tick);
      };
      tick();
    });

    const list = (await likedMVs({ limit: 6 })).data;
    projects.value = list;
    return {
      projects,
      projectsRef,
      paths,
      pathColors,
      openedIndex,
    };
  },
});
</script>

<style scoped lang="css">
.container {
  @apply flex  overflow-hidden items-center justify-center;
}

.projects {
  @apply flex gap-10 items-center justify-between opacity-0;
}

.project {
  @apply flex  relative w-[300px] h-[200px]  items-center justify-between rounded-md flex-shrink-0 text-[#20004a] font-bold text-[34px] leading-tight tracking-[0.02em];
}

.title {
  @apply relative z-10 text-base text-white;
}

.shadow {
  @apply absolute bottom-[-70px] left-[-5%] w-[110%] h-[30px] bg-black rounded-full blur-[10px] opacity-10 z-[1];
}

.video {
  @apply absolute top-1/2 left-1/2 w-[200%] h-[200%] bg-black transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] z-20;
  clip-path: polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%);
}
</style>
