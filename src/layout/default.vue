<!--  -->
<template>
  <div class="parent padding10" v-bind="$attrs">
    <header class="title-play flex">
      <titleVue />
    </header>
    <main class="layout-content">
      <div class="left-list">
        <navVue />
      </div>
      <div class="right-box w-full h-full">
        <!-- <router-view></router-view> -->
        <Suspense>
          <router-view v-slot="{ Component, route }">
            <transition :name="route.meta.transition || 'fade'" mode="out-in">
              <!-- http://localhost:4000/Music/search?searchKey=%E8%96%9B%E4%B9%8B%E8%B0%A6   h-full -->
              <div class="h-full">
                <keep-alive :exclude="KeepAliveList">
                  <component :is="Component" :key="route.path" />
                </keep-alive>
              </div>
            </transition>
          </router-view>
        </Suspense>
      </div>
      <div class="h-[10px]"></div>
    </main>
    <footer>
      <footerVue />
    </footer>
  </div>
</template>

<script lang="ts">
import footerVue from "./components/footer/index.vue";
import titleVue from "./components/title/index.vue";
import navVue from "./components/nav.vue";
import { mapGetters } from "vuex";
import type { RouteRecordRaw } from "vue-router";
export default {
  components: { footerVue, titleVue, navVue },
  data() {
    return {
      KeepAliveList: [],
    };
  },
  computed: {
    ...mapGetters(["userInfo", "loginStatus"]),
  },
  mounted() {
    const that = this;
    function deep(params: RouteRecordRaw) {
      if (params && params.children) {
        params.children.forEach((element) => {
          deep(element);
        });
      } else {
        if (!params?.meta?.keepalive) {
          that.KeepAliveList.push(params?.name);
        }
      }
    }
    deep(this.$route.matched[0] || {});
  },
};
</script>

<style scoped lang="scss">
.parent {
  display: grid;
  grid-template-rows: auto 1fr auto;

  /* Just for parent demo size */
  height: 100vh;
}

.title-play {
  height: 60px;
  justify-content: space-between;
  align-items: center;
  // background: $Bcolor;
}

.layout-content {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: grid;
  grid-template-columns: minmax(180px, 15%) 1fr;

  .left-list {
    height: calc(100vh - 120px);
    padding: 10px 0;
    margin-right: 10px;
    // background: $Bcolor;

    .flex-cancer {
      padding: 0 10px;
    }
  }

  .right-box {
    height: 100%;
    padding: 0 10px;
    overflow: hidden auto;
    border-radius: 5px;
    background: var(--my-white);
  }
}
</style>
