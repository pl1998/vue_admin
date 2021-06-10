<template>
  <el-form>
    <el-form-item label="昵称" :required="true" label-width="400">
      <el-input v-model.trim="user.name" />
    </el-form-item>
    <el-form-item label="邮箱" :required="true">
      <el-input v-model.trim="user.email" />
    </el-form-item>
    <el-form-item label="头像" :required="true" prop="avatar">
      <br/>
      <el-upload
        v-model.trim="user.avatar"
        :action="url"
        :headers="headers"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="user.avatar" :src="user.avatar" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.old_password" type="password"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="new_password">
      <el-input v-model="form.password" type="password"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="password">
      <el-input v-model="form.password_confirmation" type="password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">Update</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { getToken } from "@/utils/auth";
import store from "@/store";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      headers: undefined,
      formLabelWidth: "120px",
      imageUrl: true,
      dialogVisible: false,
      url: "http://adminapi.test/api/upload_img",
      form: {
        name: undefined,
        password: undefined,
        new_password: undefined,
        password_confirmation: undefined,
        avatar: undefined,
      },
    };
  },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: "",
          email: "",
          avatar: "",
        };
      },
    },
  },
  methods: {
    getHeaders() {
      console.log(this.user)
      this.headers = { Authorization: "Bearer " + getToken() };
    },
    submit() {
      let data = {
        name: this.user.name,
        email: this.user.email,
        avatar: this.user.avatar,
        password: this.form.password,
        old_password: this.form.old_password,
        password_confirmation: this.form.password_confirmation,
      };

      this.$store
        .dispatch("user/updateMes", data)
        .then(() => {
           this.$notify({
              title: 'Success',
              message: '用户信息更新成功',
              type: 'success',
              duration: 2000
            })

          this.show = false;
        })

    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.user.avatar = res.data.url;
    },

    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
  mounted() {
    this.getHeaders();
  },
};
</script>
<style scoped>
.el-upload .el-upload--text {
  border: 1px solid rgb(141, 137, 137);
}
.avatar-uploader .el-upload {
  border: 1px dashed #2e1d1d;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
