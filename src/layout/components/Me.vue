<template>
  <el-dialog
    title="个人设置"
    :show.sync="show"
    @close="$emit('update:show', false)"
    :visible.sync="visible"
  >
    <el-form ref="editForm" :model="form" label-width="100px">
      <el-form-item label="用户名称: " :required="true" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="头像: " :required="true" prop="email">
        <el-upload
          v-model="form.avatar"
          action="http://adminapi.test/api/upload_img"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="form.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="密码: " prop="old_password" :required="true">
        <el-input v-model="form.old_password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码: " prop="password" :required="true">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码: " prop="password" :required="true">
        <el-input
          v-model="form.password_confirmation"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submit()" class="btn btn-success">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import store from '@/store';
import { mapGetters } from "vuex";
export default {
  name: "Me",
  watch: {
    show() {
      this.visible = this.show;
      this.initForm()
      //this.visible = !this.visible //取反
    },
  },
   computed: {
    ...mapGetters(["sidebar", "avatar", "device", "name"]),
  },
  props: {
    show: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
  data() {
    return {
      visible: this.show,
      formLabelWidth: "120px",
      imageUrl: "",
      dialogVisible: false,
      form: {
        name: undefined,
        old_password: undefined,
        password_confirmation: undefined,
        password: undefined,
        avatar: undefined,
      }
    };
  },

  methods: {
    initForm(){
      this.form = Object.assign(this.form, {
        name: this.name,
        avatar:this.avatar
      });
      this.imageUrl = true
      console.log(this.avatar)
    },
    open(form) {
      this.$refs[form].resetFields();
      this.show = false;
    },
    submit() {
       this.$store.dispatch('user/updateMes', this.form)
         .then(() => {
              this.show = false
            })
         .catch(() => {
             this.$message({message: '更新失败',type: 'error' })
        })
    },
   handleAvatarSuccess(res, file) {
     console.log(res,file)
        this.imageUrl = URL.createObjectURL(file.raw);
        this.form.avatar = res.data.url
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }

  },
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
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
