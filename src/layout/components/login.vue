<!--  -->
<template>
  <a-drawer class="Adrawer overflow-hidden" :closable="false" width="400px" :visible="visible">
    <template #title>{{ $t("login.login") }}</template>
    <Logo logo="1" width="60%" />
    <a-space direction="vertical" size="large" :style="{ width: '100%' }">
      <div v-if="Qrflag" class="flex justify-center" :style="{ height: '264px' }">
        <img :src="imgSrc" alt="">
      </div>
      <a-form :model="form" layout="vertical" fo v-else="Qrflag">
        <a-form-item field="phone" :label="$t('login.phone')">
          <a-input v-model="form.phone" placeholder="please enter your phone..." />
        </a-form-item>
        <a-form-item field="password" :label="$t('login.password')">
          <a-input-password v-model="form.password" placeholder="please enter your password..." />
        </a-form-item>
        <a-form-item field="isRead">
          <a-checkbox v-model="form.isRead">{{ $t('login.accessToAll') }}</a-checkbox>
        </a-form-item>
        <a-from-item>
          <a-button type="outline" size="large" class="button-login" @click="login">{{ $t('login.login') }}</a-button>
        </a-from-item>
      </a-form>
      <a-button type="text" class="login-way" @click="taggter">
        {{ $t(`login.${Qrflag ? 'loginWithPhone' : 'loginQRCode'}`) }}
      </a-button>
      <p v-html="$t('login.notice')"></p>
    </a-space>
  </a-drawer>
</template>

<script lang="ts" >
import * as Home from '../../api/Home'
import { _login_qr_key, _login_qr_create, _login_qr_check, _user_account } from '@/api/user'
import { defineComponent, reactive, toRefs, watch } from "vue"
import { Account } from './type/user'
import MD5 from 'md5'
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
  setup(props, ctx) {
    let Time: any
    const state = reactive({
      visible: props.visible,
      layout: "horizontal",
      Qrflag: true,
      imgSrc: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
      form: {
        phone: "",
        password: "",
        isRead: false,
      },
    })
    // const { proxy } = getCurrentInstance()
    watch(() => props.visible, (v) => {
      state.visible = v
      if (state.Qrflag) {
        QRLogin()
      } else {

        clearInterval(Time)
      }
    })
    type AccountObj = Account | { Account: Account } | {}
    const checkRes = (res: AccountObj) => {
      store.dispatch('UserLogin', res)
      ctx.emit('update:visible', !state.visible)
    }
    // 登录
    const login = async () => {
      let res = await Home.Login({
        phone: state.form.phone,
        md5_password: MD5(state.form.password),
      }) || {}
      checkRes(res)
    }
    const taggter = () => {
      state.Qrflag = !state.Qrflag
      if (state.Qrflag) QRLogin()
    }
    // 二维码登录
    const QRLogin = async () => {
      if (Time) {
        clearInterval(Time)
      }
      const timestamp = { timestamp: new Date().getTime() }
      const { data: { unikey } } = await _login_qr_key(timestamp)
      const createImg = await _login_qr_create({ key: unikey, qrimg: unikey })
      state.imgSrc = createImg?.data?.qrimg

      Time = setInterval(async () => {
        // 800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies)
        const { code } = await _login_qr_check({ key: unikey, timestamp: new Date().getTime() })
        if (code === 803) {
          clearInterval(Time)
          checkRes(await _user_account())
        }
      }, 2000)
    }
    return {
      ...toRefs(state),
      login,
      QRLogin,
      taggter
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
  text-align: center;
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
