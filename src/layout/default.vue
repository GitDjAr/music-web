<!--  -->
<template>
  <div class="parent" v-bind="$attrs">
    <header class="title-play flex">
      <titleVue />
    </header>
    <main class="layout-content padding10">
      <div class="left-list">
        <navVue />
      </div>
      <div class="right-box">
        <!-- <router-view></router-view> -->
        <Suspense>
          <router-view v-slot="{ Component, route }">
            <transition :name="route.meta.transition || 'fade'" mode="out-in">
              <keep-alive>
                <component
                  :is="Component"
                  :key="route.meta.usePathKey ? route.path : undefined"
                />
              </keep-alive>
            </transition>
          </router-view>
        </Suspense>
      </div>
    </main>
    <footer>
      <footerVue />
    </footer>
  </div>
</template>

<script lang="ts">
import footerVue from './components/footer.vue';
import titleVue from './components/title/index.vue';
import navVue from './components/nav.vue';
import { mapGetters } from 'vuex';
export default {
  components: { footerVue, titleVue, navVue },
  computed: {
    ...mapGetters(['userInfo', 'loginStatus']),
  },
  mounted() {},
};
</script>

<style scoped lang="scss">
.parent {
  display: grid;
  grid-template-rows: auto 1fr auto;

  /* Just for parent demo size */
  height: 100vh;
}

.padding10 {
  padding: 0 10%;
}

.title-play {
  padding: 10px 10%;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  background: $Bcolor;
}

.layout-content {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: grid;
  grid-template-columns: minmax(180px, 15%) 1fr;

  .left-list {
    padding: 10px 0;
    background: $Bcolor;

    .flex-cancer {
      padding: 0 10px;
    }
  }

  .right-box {
    height: 100%;
    padding: 5px 10px;
    overflow: hidden auto;
    border-radius: 5px;
  }
}
</style>
