<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form>
        <el-form-item>
          <el-button type="success" @click="add" icon="el-icon-plus"></el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="content-container" v-loading="listLoading">
      <el-table
        :data="list"
        border
        style="width: 100%"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        row-key="id"
      >
        <el-table-column prop="name" label="角色名称"></el-table-column>
        <el-table-column prop="status" label="权限状态" >
          <template slot-scope="{row}">
           <el-tag v-if="row.status == 0">正常</el-tag>
            <el-tag v-else>禁用</el-tag>
          </template>
        </el-table-column>
         <el-table-column prop="nodes" label="权限节点">
          <template slot-scope="{row}">
            <sapn>{{row.nodes}}</sapn>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="角色描述">
          <template slot-scope="{row}">
            <el-tag>{{row.description}}</el-tag>
          </template>

        </el-table-column>
        <el-table-column prop="create_time" label="添加时间">
          <template slot-scope="{row}">
            <sapn>{{row.create_time}}</sapn>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250px">
          <template slot-scope="{row}">
            <el-button @click="edit(row)" type="primary" icon="el-icon-edit-outline"></el-button>
            <el-button @click="del(row)" type="danger" icon="el-icon-delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
   <el-dialog :title="title" :visible.sync="dialogVisible" :before-close="handleClose">
      <el-form ref="roleForm" :model="form" label-width="100px" v-if="dialogVisible">
        <el-form-item label="角色名称: " :required="true" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述: " :required="true" prop="description">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="状态选择: " :required="true" prop="status" >
          <el-radio v-model="form.status" label="1">启用</el-radio>
          <el-radio v-model="form.status" label="2">禁用</el-radio>
        </el-form-item>
        <el-form-item label="赋予权限节点:" :required="true" >
          <el-tree
            :data="form.permissions"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            :default-expand-all="true"
            highlight-current
            @check-change="nodeChange"
            :props="defaultProps">
          </el-tree>
        </el-form-item>
        <el-form-item>
          <el-button @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import path from "path";
import { deepClone } from "@/utils";
import { getRoles, addRole, deleteRole, updateRole } from "@/api/role";
import { getPermissionList } from "@/api/auth";

import selectTree from './selectTree'

const defaultRole = {
  key: "",
  name: "",
  description: "",
  routes: [],
};

export default {
  components: {selectTree},
  data() {
    return {
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      count: 1,
      permissions: [],
      title: "",
      role: Object.assign({}, defaultRole),
      routes: [],
      list: [],
      dialogVisible: false,
      dialogType: "new",
      checkStrictly: false,
      form: {
        name: "",
        description: "",
        status: "",
        node:[]
      },
      listLoading: false,
    };
  },
  computed: {
    routesData() {
      return this.routes;
    },
  },
  created() {
    // Mock: get all routes and roles list from server
    // this.getRoutes();
    this.getRoles();
  },
  methods: {
    async getRoutes() {
      const res = await getRoutes();
      this.serviceRoutes = res.data;
      this.routes = this.generateRoutes(res.data);
    },
    async getRoles() {
      const {data} = await getRoles();
      this.list = data.list;
    },
    add() {
      this.dialogVisible = true
      this.title = '添加角色'
    },
    async edit(item) {

    },
    async del(item) {

    },
    nodeChange(){
      let keys = this.$refs.tree.getCheckedKeys()
      if(keys.length!=0){
        this.form.node = keys;
      }else {
        this.form.node = "";
      }
    },
    submit(){
      addRole(this.form).then((response)=>{

      })
    },
    handleClose() {
      this.dialogVisible = false
    },
    getCheckedNodes() {
      console.log(this.$refs.tree.getCheckedNodes());
    },
    getCheckedKeys() {
      return this.$refs.tree.getCheckedKeys();
    },
    setCheckedNodes() {
      this.$refs.tree.setCheckedNodes([{
        id: 5,
        label: '二级 2-1'
      }, {
        id: 9,
        label: '三级 1-1-1'
      }]);
    },
    setCheckedKeys() {
      console.log(this.$refs.tree.setCheckedKeys([3]));
      this.$refs.tree.setCheckedKeys([3]);
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
    },
    //获取权限节点
    allPermissions(){
      getPermissionList().then((response) => {
        const {data} = response
        this.permissions = data.list
        //强制dom渲染
        this.$set(
          this.form,
          "permissions",
          data.list
        );
      })
    }
  },
  mounted() {
    this.allPermissions();
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
