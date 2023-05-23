<!--  -->
<template>
  <a-drawer
    class="Adrawer overflow-hidden"
    :closable="false"
    @cancel="$emit('update:visible', false)"
    width="400px"
    :visible="visible"
  >
    <template #title>{{ $t("login.login") }}</template>
    <Logo logo="1" width="60%" />
    <a-space direction="vertical" size="large" :style="{ width: '100%' }">
      <div
        v-if="Qrflag"
        class="flex justify-center"
        :style="{ height: '264px' }"
      >
        <img :src="imgSrc" alt="" v-if="imgSrc" />
        <img
          src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
          alt=""
          v-else
        />
      </div>
      <a-form :model="form" layout="vertical" fo v-else="Qrflag">
        <a-form-item field="phone" :label="$t('login.phone')">
          <a-input
            v-model="form.phone"
            placeholder="please enter your phone..."
          />
        </a-form-item>
        <a-form-item field="password" :label="$t('login.password')">
          <a-input-password
            v-model="form.password"
            placeholder="please enter your password..."
          />
        </a-form-item>
        <a-form-item field="isRead">
          <a-checkbox v-model="form.isRead">{{
            $t("login.accessToAll")
          }}</a-checkbox>
        </a-form-item>
        <a-form-item>
          <a-button
            type="outline"
            size="large"
            class="button-login"
            @click="login"
            >{{ $t("login.login") }}</a-button
          >
        </a-form-item>
      </a-form>
      <a-button type="text" class="login-way" @click="tagger">
        {{ $t(`login.${Qrflag ? "loginWithPhone" : "loginQRCode"}`) }}
      </a-button>
      <p v-html="$t('login.notice')"></p>
    </a-space>
  </a-drawer>
</template>

<script lang="ts">
import * as Home from "../../api/Home";
import {
  _login_qr_key,
  _login_qr_create,
  _login_qr_check,
  userDetail,
  _user_account,
} from "@/api/user";
import { defineComponent, reactive, toRefs, watch } from "vue";
import { Account } from "./type/user";
import MD5 from "md5";
import store from "../../store";
// defineProps({
//   visible:Boolean
// })
export default defineComponent({
  components: {},
  props: {
    visible: {
      type: Boolean,
    },
  },
  setup(props, ctx) {
    let timeToken: any;
    const state = reactive({
      visible: props.visible,
      layout: "horizontal",
      Qrflag: true,
      imgSrc: "",
      form: {
        phone: "",
        password: "",
        isRead: false,
      },
    });
    // const { proxy } = getCurrentInstance()
    watch(
      () => props.visible,
      (v) => {
        state.visible = v;
        if (state.Qrflag && state.visible) {
          QRLogin();
        } else {
          clearTimer();
        }
      }
    );
    type AccountObj = Account | { account: Account } | {};
    const checkRes = (res: AccountObj) => {
      store.dispatch("UserLogin", res);
      ctx.emit("update:visible", false);
    };
    // 登录
    const login = async () => {
      let res =
        (await Home.Login({
          phone: state.form.phone,
          md5_password: MD5(state.form.password),
        })) || {};
      checkRes(res);
    };
    // 切换登录
    const tagger = () => {
      state.Qrflag = !state.Qrflag;
      if (state.Qrflag) {
        QRLogin();
      } else {
        clearTimer();
      }
    };
    // 清除定时器
    const clearTimer = () => {
      timeToken && clearInterval(timeToken);
    };
    // 二维码登录
    const QRLogin = async () => {
      clearTimer();
      const {
        data: { unikey },
      } = await _login_qr_key({ timestamp: new Date().getTime() });
      const createImg = await _login_qr_create({ key: unikey, qrimg: unikey });
      state.imgSrc = createImg?.data?.qrimg;

      timeToken = setInterval(async () => {
        // 800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies)
        const { code } = await _login_qr_check({
          key: unikey,
          timestamp: new Date().getTime(),
        });
        if (code === 803) {
          clearInterval(timeToken);
          let acc = await _user_account();
          // checkRes(acc);
          const user = await userDetail(acc.account.id);
          checkRes(user);
          console.log("user", user);
        }
      }, 2000);
    };
    return {
      ...toRefs(state),
      login,
      QRLogin,
      tagger,
    };
  },
});
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
