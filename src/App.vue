<script setup lang="ts">
import Layout from './layout/default.vue'
import Cookes from 'js-cookie'
import { reactive, ref } from 'vue';
const first = ref(Cookes.get('info'))
const user: string = 'Hello ' + Cookes.get('user')?.name
const firstF = () => {
  Cookes.set('info',true)
  first.value = !first.value
}

</script>

<template>
  <Layout v-if="first" :msg="user" />
  <div v-else class="reset flex fx-center">
    <transition name="slide-fade">
      <div class="fx-center">
        <Logo/>
        <h1 class="tcenter">新一代 音乐播放器</h1>
        <a-button type="primary" @click="firstF">Let's Go!</a-button>
      </div>
    </transition>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital@0;1&display=swap');
</style>
<style>
#app {
  overflow: scroll  hidden;
  box-sizing: border-box;
  font-family:'Nunito Sans', sans-serif, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  width: 100%;
  min-width: 700px;
}
.reset {
  height: 76vh;
  background-image:url('./assets/img/bg.jpg') ;
}
</style>
