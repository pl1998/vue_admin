<template>
  <el-card style="margin-bottom: 20px">
    <div slot="header" class="clearfix">
      <span>个人信息</span>
    </div>
    <div class="user-profile">
      <div class="box-center">
        <pan-thumb
          :image="user.avatar"
          :height="'100px'"
          :width="'100px'"
          :hoverable="false"
        >
          <div>Hello</div>
          {{ user.role }}
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ user.name }}</div>
        <div class="user-role text-center text-muted">
          {{ user.role | uppercaseFirst }}
        </div>
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header">
          <svg-icon icon-class="education" /><span>Education</span>
        </div>
        <div class="user-bio-section-body">
          <div class="text-muted">Hi {{clues}} </div>
        </div>
      </div>
      <div class="user-skills user-bio-section">
        <div class="user-bio-section-header">
          <svg-icon icon-class="skill" /><span>Skills</span>
        </div>
        <div class="user-bio-section-body">
            <div class="progress-item">
            <span>PHP</span>
            <el-progress :percentage="80" />
          </div>
          <div class="progress-item">
            <span>Vue</span>
            <el-progress :percentage="30" />
          </div>
          <div class="progress-item">
            <span>JavaScript</span>
            <el-progress :percentage="18" />
          </div>
          <div class="progress-item">
            <span>Css</span>
            <el-progress :percentage="12" />
          </div>

        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import PanThumb from "@/components/PanThumb";

export default {
  data() {
    return {
      clues: "",
    };
  },
  components: { PanThumb },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: "",
          email: "",
          avatar: "",
          role: "",
        };
      },
    },
  },
  created() {
    this.getTimeShow()
  },
  methods: {
    getTimeShow() {
      let date = new Date();
      if (date.getHours() >= 0 && date.getHours() < 12) {
        this.clues = "上午好🌞";
      } else if (date.getHours() >= 12 && date.getHours() < 18) {
        this.clues = "下午好🌞";
      } else {
        this.clues = "晚上好🌛";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>
