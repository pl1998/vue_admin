<template>
  <div>
    <div class="navbar">
      <hamburger
        id="hamburger-container"
        :is-active="sidebar.opened"
        class="hamburger-container"
        @toggleClick="toggleSideBar"
      />
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
      <div class="right-menu">
        <template v-if="device !== 'mobile'">
          <search id="header-search" class="right-menu-item" />
          <error-log class="errLog-container right-menu-item hover-effect" />
          <screenfull id="screenfull" class="right-menu-item hover-effect" />
        </template>

        <div class="right-menu-item">
          <span class="float:left;" style="font-size: 10px">
            <a @click="bindDing('dingidng')">绑定钉钉 </a></span
          >
        </div>

        <div class="right-menu-item hover-effect">
          <span class="float:left;" style="font-size: 10px">{{ name }} </span>
          <i
            class="fa fa-circle text-success"
            style="font-size: 3px; color: #13e26f"
          ></i
          ><span style="font-size: 3px"> 在线</span>
        </div>
        <el-dropdown
          class="avatar-container right-menu-item hover-effect"
          trigger="click"
        >
          <div class="avatar-wrapper">
            <img
              :src="avatar + '?imageView2/1/w/80/h/80'"
              class="user-avatar"
            />
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown">

          <router-link to="/profile/index">
            <el-dropdown-item><i class="fa fa-user"></i>个人设置</el-dropdown-item>
          </router-link>
            <!-- <a href="#" @click="me">
              <el-dropdown-item
                ><i class="fa fa-user"></i>个人设置</el-dropdown-item
              >
            </a> -->
            <el-dropdown-item divided @click.native="logout">
              <span style="display: block"
                ><i class="fa fa-sign-out"></i> Log Out</span
              >
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <Me :show.sync="show"></Me>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import ErrorLog from "@/components/ErrorLog";
import Screenfull from "@/components/Screenfull";
import SizeSelect from "@/components/SizeSelect";
import Search from "@/components/HeaderSearch";
import Me from "../components/Me";

export default {
  data() {
    return {
      show: false,
      Refresh: false,
    };
  },
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    Search,
    Me,
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "device", "name"]),
  },
  methods: {
    bindDing(thirdpart) {
      let url = process.env.VUE_APP_HOST + "/auth/bindQrcode";
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },

    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    me() {
      this.show = true;
      // this.Refresh = true
      // this.$nextTick(() => {
      //   this.show = true;
      // });
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
