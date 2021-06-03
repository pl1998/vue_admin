<template>
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
</template>
<script>
import { setToken } from "@/utils/auth";

export default {
  name: "SocialSignin",
  methods: {
    dingdingClick(thirdpart) {
      let url = process.env.VUE_APP_HOST + "/auth/bindQrcode";


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
      window.addEventListener("message", function (e) {
        setToken(e.data);
        console.log(2)

      });

      // Puts focus on the newWindow
      if (window.focus) {
          console.log(3)
        newWindow.focus();
         this.getindex()
      }
    },
    getindex(){
       this.$router.push({
          path: this.redirect || "/",
          query: this.otherQuery,
      });
    },

    wechatHandleClick(thirdpart) {
      alert("ok");
      // this.$store.commit('SET_AUTH_TYPE', thirdpart)
      // const appid = 'xxxxx'
      // const redirect_uri = encodeURIComponent('xxx/redirect?redirect=' + window.location.origin + '/auth-redirect')
      // const url = 'https://open.weixin.qq.com/connect/qrconnect?appid=' + appid + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_login#wechat_redirect'
      // openWindow(url, thirdpart, 540, 540)
    },
    tencentHandleClick(thirdpart) {
      alert("ok");
      // this.$store.commit('SET_AUTH_TYPE', thirdpart)
      // const client_id = 'xxxxx'
      // const redirect_uri = encodeURIComponent('xxx/redirect?redirect=' + window.location.origin + '/auth-redirect')
      // const url = 'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirect_uri
      // openWindow(url, thirdpart, 540, 540)
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>
