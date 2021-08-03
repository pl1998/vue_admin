<template>
  <div class="login-container">
    <el-form
      size="mini"
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">{{systemName}}</h3>
      </div>

      <el-form-item prop="email">
        <span class="svg-container">
          <svg-icon icon-class="email" />
        </span>
        <el-input
          ref="email"
          v-model="loginForm.email"
          placeholder="邮箱"
          name="email"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip
        v-model="capsTooltip"
        content="Caps lock is On"
        placement="right"
        manual
      >
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>
      </el-tooltip>
      <el-row>
        <el-col :span="15">
          <el-form-item prop="captcha">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              ref="captcha"
              v-model="loginForm.captcha"
              placeholder="验证码"
              name="captcha"
              type="text"
              maxlength="5"
              tabindex="1"
              autocomplete="on"
            />
          </el-form-item>
        </el-col>
        <el-col :span="1" style="color:#2d3a4b">2222</el-col>
          <el-col :span="4">
            <img class="captcha_img" @click="getCaptcha" :src="captcha_img" />
          </el-col>
        </el-col>
      </el-row>
 <br />
 <!-- <el-button type="primary" @click="dingding">第三方登录</el-button> -->


      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
        >Login</el-button
      >
      <div style="position: relative"></div>
    </el-form>

    <el-dialog title="第三方登录" :visible.sync="showDialog">
        <div class="social-signup-container">
    <!-- <div class="sign-btn" @click="wechatHandleClick('wechat')">
      <span class="wx-svg-container"><svg-icon icon-class="wechat" class="icon" /></span>
      WeChat
    </div> -->
    <div class="sign-btn" @click="weiboHandleClick('weibo')">
      <svg
        t="1622713988014"
        class="icon"
        viewBox="0 0 1026 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="4648"
        width="40"
        height="40"
      >
        <path
          d="M1012.49 451.553v0.159c-6.697 20.66-28.861 31.99-49.449 25.288a39.352 39.352 0 0 1-25.287-49.582l-0.067-0.031c20.536-63.6 7.516-136.156-40.315-189.363-47.892-53.212-118.502-73.554-183.731-59.659-21.222 4.537-42.133-9.047-46.638-30.3-4.506-21.253 9.021-42.194 30.239-46.73 91.709-19.563 191.114 8.98 258.467 83.881 67.36 74.839 85.515 176.85 56.781 266.337z"
          fill="#D32024"
          p-id="4649"
        ></path>
        <path
          d="M740.429 304.348v-0.03c-18.217 3.973-36.178-7.732-40.06-26.01-3.947-18.31 7.763-36.373 25.98-40.254 44.692-9.548 93.143 4.322 125.885 40.781 32.866 36.496 41.631 86.17 27.607 129.772a33.833 33.833 0 0 1-42.562 21.847c-17.782-5.76-27.484-24.914-21.724-42.69h-0.062c6.887-21.346 2.565-45.635-13.46-63.473-16.026-17.818-39.752-24.546-61.604-19.943z m30.05 192.184c-14.46-4.352-24.352-7.326-16.774-26.352 16.333-41.313 18.027-76.964 0.317-102.385-33.31-47.734-124.451-45.133-228.838-1.28 0-0.061-32.799 14.367-24.412-11.704 16.056-51.774 13.645-95.186-11.361-120.192-56.658-56.878-207.304 2.12-336.477 131.64C56.187 463.32 0 566.14 0 655.1 0 825.18 217.503 928.594 430.28 928.594c278.917 0 464.527-162.504 464.527-291.59 0-77.936-65.546-122.193-124.329-140.472zM430.842 867.62c-169.774 16.84-316.35-60.155-327.368-171.96-11.049-111.74 117.72-216.034 287.488-232.873 169.805-16.84 316.355 60.16 327.368 171.904 11.018 111.866-117.683 216.09-287.488 232.929z"
          fill="#D32024"
          p-id="4650"
        ></path>
        <path
          d="M447.805 548.859c-80.783-21.09-172.119 19.287-207.206 90.65-35.743 72.862-1.188 153.681 80.44 180.1 84.578 27.357 184.233-14.525 218.88-93.148 34.181-76.81-8.478-155.94-92.114-177.602zM386.12 734.792c-16.43 26.29-51.584 37.806-78.065 25.661-26.107-11.889-33.833-42.44-17.403-68.045 16.215-25.538 50.207-36.869 76.498-25.856 26.604 11.392 35.087 41.687 18.97 68.24z"
          fill="#D32024"
          p-id="4651"
        ></path>
      </svg>
    </div>
    <div class="sign-btn" @click="dingdingClick('dingding')">
      <svg
        t="1622708090624"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2475"
        width="40"
        height="40"
      >
        <path
          d="M512.003 79C272.855 79 79 272.855 79 512.003 79 751.145 272.855 945 512.003 945 751.145 945 945 751.145 945 512.003 945 272.855 751.145 79 512.003 79z m200.075 375.014c-0.867 3.764-3.117 9.347-6.234 16.012h0.087l-0.347 0.648c-18.183 38.86-65.631 115.108-65.631 115.108l-0.215-0.52-13.856 24.147h66.8L565.063 779l29.002-115.368h-52.598l18.27-76.29c-14.76 3.55-32.253 8.436-52.945 15.1 0 0-27.967 16.36-80.607-31.5 0 0-35.501-31.29-14.891-39.078 8.744-3.33 42.466-7.573 69.004-11.122 35.93-4.845 57.965-7.441 57.965-7.441s-110.607 1.643-136.841-2.468c-26.237-4.11-59.525-47.905-66.626-86.377 0 0-10.953-21.117 23.595-11.122 34.547 10 177.535 38.95 177.535 38.95s-185.933-56.992-198.36-70.929c-12.381-13.846-36.406-75.902-33.289-113.981 0 0 1.343-9.521 11.127-6.926 0 0 137.49 62.75 231.475 97.152 94.028 34.403 175.76 51.885 165.2 96.414z"
          fill="#3AA2EB"
          p-id="2476"
        ></path>
      </svg>
    </div>
  </div>
      <!-- <social-sign /> -->
    </el-dialog>
  </div>
</template>

<script>

import { validUsername } from "@/utils/validate";
// import SocialSign from "./components/SocialSignin";
import particlesConfig from "@/../particles";
import request from "@/utils/request";

export default {
  name: "Login",
  // components: { SocialSign },
  data() {
    //validateCaptcha
    const validateCaptcha = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入验证码"));
      } else {
        if (value.length != 4) {
          callback(new Error("验证码应该是4位数"));
        } else {
          callback();
        }
      }
    };
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("请输入邮箱"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码长度不能低于6位"));
      } else {
        callback();
      }
    };
    return {
      systemName:process.env.VUE_APP_SYSTEM_NAME,
      loginForm: {
        email: undefined,
        password: undefined,
        key: undefined,
        captcha: undefined,
      },
      captcha_img: undefined,
      loginRules: {
        email: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
        key: [{ required: true }],
        captcha: [
          { required: true, trigger: "blur", validator: validateCaptcha },
        ],
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true,
    },
  },

  created() {
    this.getCaptcha();
    window.addEventListener("storage", this.afterQRScan);
  },
  mounted() {
    // this.init();
    if (this.loginForm.email === "") {
      this.$refs.email.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    } else if (this.loginForm.key === "") {
      this.$refs.key.focus();
    } else if (this.loginForm.captcha === "") {
      this.$refs.captcha.focus();
    }
  },
  destroyed() {
    window.removeEventListener("storage", this.afterQRScan);
  },
  methods: {
    dingdingClick(thirdpart) {
      let url = process.env.VUE_APP_HOST + "/auth/bindQrcode";
        this.openWindow(url, thirdpart, 540, 540);
    },
    weiboHandleClick(thirdpart) {
      let url =
        "https://api.weibo.com/oauth2/authorize?client_id=" +
        process.env.VUE_APP_WB_CLIENT_ID +
        "&redirect_uri=" +
        process.env.VUE_APP_WB_REDIRECT_URL;

      this.openWindow(url, thirdpart, 540, 540);
    },

    openWindow(url, title, w, h) {
      // Fixes dual-screen position                            Most browsers       Firefox
      const dualScreenLeft =
        window.screenLeft !== undefined ? window.screenLeft : screen.left;
      const dualScreenTop =
        window.screenTop !== undefined ? window.screenTop : screen.top;

      const width = window.innerWidth
        ? window.innerWidth
        : document.documentElement.clientWidth
        ? document.documentElement.clientWidth
        : screen.width;
      const height = window.innerHeight
        ? window.innerHeight
        : document.documentElement.clientHeight
        ? document.documentElement.clientHeight
        : screen.height;

      const left = width / 2 - w / 2 + dualScreenLeft;
      const top = height / 2 - h / 2 + dualScreenTop;
      const newWindow = window.open(
        url,
        title,
        "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=" +
          w +
          ", height=" +
          h +
          ", top=" +
          top +
          ", left=" +
          left
      );
      window.addEventListener("message",(event)=>{

        this.$store.dispatch("user/weiboLogin", event.data)

        this.showDialog = false
        console.log(this.showDialog)
        this.getindex()

      });

      // Puts focus on the newWindow
      if (window.focus) {
        newWindow.focus();

      }
    },
    getindex() {

      this.$router.push({
        path: this.redirect || "/",
        query: this.otherQuery,
      });
       console.log(3)
    },

    wechatHandleClick(thirdpart) {

    },
    tencentHandleClick(thirdpart) {


    },
    getCaptcha() {
      request({
        url: "/captcha",
        method: "post",
      }).then((response) => {
        const { captcha } = response.data;
        this.loginForm.key = captcha.key;
        this.captcha_img = captcha.img;
      });
    },
    dingding() {
      this.showDialog = true;
    },
    init() {
      particlesJS("particles-js", particlesConfig);
    },
    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({
                path: this.redirect || "/",
                query: this.otherQuery,
              });
              this.loading = false;
            })
            .catch((error) => {
              if (error == "Error: 验证码错误") {
                this.getCaptcha();
              }
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
    afterQRScan() {
      if (e.key === "x-admin-oauth-code") {
        const code = getQueryObject(e.newValue);
        const codeMap = {
          wechat: "code",
          tencent: "code",
        };
        const type = codeMap[this.auth_type];
        const codeName = code[type];
        if (codeName) {
          this.$store.dispatch("LoginByThirdparty", codeName).then(() => {
            this.$router.push({ path: this.redirect || "/" });
          });
        } else {
          alert("第三方登录失败");
        }
      }
    },
  },
};
</script>

<style lang="scss">

.social-signup-container {
  margin: 20px 0;
  .sign-btn {
    display: inline-block;
    cursor: pointer;
  }
  .icon {
    color: #fff;
    font-size: 24px;
    margin-top: 8px;
  }
  .wx-svg-container,
  .qq-svg-container {
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    padding-top: 1px;
    border-radius: 4px;
    margin-bottom: 20px;
    margin-right: 5px;
  }
  .wx-svg-container {
    background-color: #24da70;
  }
  .qq-svg-container {
    background-color: #6ba2d6;
    margin-left: 50px;
  }
}

/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
/* reset element-ui css */
.login-container {
  .captcha_img {
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 420px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }
  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
