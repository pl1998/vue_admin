<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form>
        <el-form-item>
          <el-button type="success" @click="add()" icon="el-icon-plus"></el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="content-container" v-loading="listLoading">
      <el-table :data="list" border style="width: 100%" row-key="id">
        <el-table-column prop="name" label="用户名"></el-table-column>
        <el-table-column prop="email" label="邮箱">
          <template slot-scope="{row}">
            <span>{{row.email}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="roles" label="角色">
          <template slot-scope="{row}">
            <el-tag >{{row.roles}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="添加时间">
          <template slot-scope="{row}">
            <span>{{row.created_at}}</span>
          </template>
        </el-table-column>
        <el-table-column label="method" width="250px">
          <template slot-scope="{row}">
            <el-button @click="edit(row)" type="primary" icon="el-icon-edit-outline"></el-button>
            <!-- <el-button @click="del(row)" type="danger" icon="el-icon-delete"></el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>

 <el-dialog :title="title" :visible.sync="dialogVisible" :before-close="handleClose">
      <el-form ref="editForm" :model="form" label-width="100px">
        <el-form-item label="用户名称: " :required="true" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱: " :required="true" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="密码: " prop="password" :required="true">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码: " prop="password" :required="true">
          <el-input v-model="form.password_confirmation" type="password"></el-input>
        </el-form-item>
        <el-form-item label="赋予角色:" :required="true">
          <!-- <el-tree ref="roleTree" :data="Roles" show-checkbox :default-checked-keys="checkedRoles" :default-expanded-keys="checkedRoles" node-key="id" :props="defaultProps" @check-change="nodeChange" />
        -->
          <!-- <el-select v-model="form.region" placeholder="赋予角色">
            <el-option label="admin" value="admin"></el-option>
            <el-option label="user" value="user"></el-option>
        </el-select> -->
        </el-form-item>
        <el-form-item>
          <el-button @click="submit()" class="btn-success">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- <selectTree></selectTree> -->
  </div>
</template>
<script>
import { getUserList,addUser} from "../../api/auth";
import { allRole} from "../../api/role";
export default {
  name: "UserPermission",
  data() {
    return {
      list: [],
      mate: [],
      listLoading: false,
      form:{
        name:null,
        email:null,
        avatar:null,
        password:undefined,
        password_confirmation:undefined
      },
      dialogVisible:false,
      title:undefined
    };
  },
  methods: {
     handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    getList() {
      this.listLoading = true;
      getUserList().then((response) => {
        console.log(response)
        const { data, mate } = response;
        this.list = data.list;
        this.mate = data.mate;
        this.listLoading = false;
      });
    },
    getAllRole(){
allRole().then((response)=>{
  
})
    },
    add() {
      this.title='添加用户'
      this.dialogVisible = true;
    },
    submit(){
      addUser(this.form).then((response)=>{

        if(response.code==200){
           this.$message({
            type: "success",
            message: response.message,
            duration: 5 * 1000
          });
     this.getList()
     this.dialogVisible = false
        }
      })
      this.dialogVisible=true
    },
    async edit(item) {},
    async del(item) {},
  },
  mounted() {
    this.getList();
  },
};
</script>
<style lang="stylus" scoped></style>
