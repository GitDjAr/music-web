<!--  -->
<template>
  <a-drawer
    popup-container="#app"
    class="Adrawer"
    :closable="false"
    width="400px"
    :visible="visible"
    @cancel="handleCancel"
  >
    <template #title>{{ $t("login.login") }}</template>
    <Logo logo="1" width="60%" />
    <a-space direction="vertical" size="large" :style="{ width: '100%' }">
      <a-form :model="form" layout="vertical">
        <a-form-item field="phone" :label="$t('login.phone')">
          <a-input v-model="form.phone" placeholder="please enter your phone..." />
        </a-form-item>
        <a-form-item field="password" :label="$t('login.password')">
          <a-input-password v-model="form.password"  placeholder="please enter your password..." />
        </a-form-item>
        <p class="login-way">{{ $t('login.loginWithEmail') }}</p>
        <a-form-item field="isRead">
          <a-checkbox v-model="form.isRead">{{ $t('login.accessToAll') }}</a-checkbox>
        </a-form-item>
        <a-from-item>
          <a-button
            type="outline"
            size="large"
            class="button-login"
            @click="login"
          >{{ $t('login.login') }}</a-button>
        </a-from-item>
      </a-form>
      <p v-html="$t('login.notice')"></p>
    </a-space>
  </a-drawer>
</template>

<script lang="ts" >
import * as Home from '@/api/Home'
import { defineComponent, reactive, toRefs, onMounted, watchEffect, withCtx, watch, computed, getCurrentInstance } from "vue"
import store from '../../store';
// defineProps({
//   visible:Boolean
// })
export default defineComponent({
  components: {},
  props: {
    visible: {
      type: Boolean
    },
  },
  mounted() {
    console.log('aas');

  },
  setup(props, ctx) {
    const state = reactive({
      visible: props.visible,
      layout: "horizontal",
      form: {
        phone: "15984278781",
        password: "1414493820",
        isRead: false,
      },
    })
    const { proxy } = getCurrentInstance()
    watch(() => props.visible, (v) => {
      state.visible = v
    })
    const handleOk = () => {

    }
    const handleCancel = () => {
      ctx.emit('update:visible', !state.visible)
    }
    // 登录
    const login = async () => {
      const res = await Home.Login(state.form)
      if (proxy.$PASS(res)) {
        store.dispatch('UserLogin', res)
        handleCancel()
      }
    }
    return {
      ...toRefs(state),
      handleCancel,
      handleOk,
      login
    }
  },
})
</script>
<style scoped lang="scss">
.Adrawer .arco-drawer-mask {
  background-color: rgba($color: #fff, $alpha: 0);
}

.arco-drawer-mask {
  background-color: rgba($color: #fff, $alpha: 0);
}

.login-way {
  text-align: right;
  color: $T3;
  cursor: pointer;
}
.button-login {
  width: 100%;
  color: $T4;
  font-weight: 400;
  height: 40px;
  line-height: 40px;
  border: none;
  background-image: linear-gradient(to right, #cdd8fc, #ece4fc);
}
</style>