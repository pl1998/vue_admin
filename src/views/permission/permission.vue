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
         <div class="content-container" v-loading="listLoading">
      <el-table :data="list" border style="width: 100%" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" row-key="id">
        <el-table-column prop="name" label="权限名称"></el-table-column>
        <!-- <el-table-column label="是否为菜单">
          <template slot-scope="{row}">
            <el-tag v-if="row.p_id == 0">是</el-tag>
            <el-tag v-else>否</el-tag>
          </template>
        </el-table-column> -->
        <el-table-column prop="status" label="权限状态">
          <template slot-scope="{row}">
            <el-tag v-if="row.status == 1">正常</el-tag>
            <el-tag v-else>禁用</el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="title" label="前端title"></el-table-column> -->
        <el-table-column prop="icon" label="icon">
          <template slot-scope="{row}">
            <span v-if="row.icon" :class="row.icon"></span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column prop="url" label="url">
          <template slot-scope="{row}">
            <el-tag>
              <span v-if="row.p_id != 0">{{ row.path }}</span>
              <span v-else>-</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="method" label="方法">
          <template slot-scope="{row}">
            <el-tag>{{row.method.toUpperCase()}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250px">
          <template slot-scope="{row}">
            <el-button @click="edit(row)" type="primary" icon="el-icon-edit-outline" ></el-button>
            <el-button @click="del(row)" type="danger" icon="el-icon-delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    </div>
     <el-dialog :title="title" :visible.sync="dialogVisible" :before-close="handleClose">
      <el-form ref="roleForm" :model="form" label-width="100px" v-if="dialogVisible">
        <el-form-item label="是否为菜单">
          <el-radio-group v-model="form.root">
            <el-radio-button :label="true">是</el-radio-button>
            <el-radio-button :label="false">否</el-radio-button>
          </el-radio-group>
          <i>谨慎修改</i>
        </el-form-item>
        <el-form-item label="权限名称: " :required="true" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="后端api: " :required="true" prop="path">
            <el-input v-model="form.path"></el-input>
        </el-form-item>

        <el-form-item label="icon" v-if="form.root">
           <icon-picker v-model="form.icon" :required="true" prop="path" ></icon-picker>
        </el-form-item>
        <el-form-item label="方法选择: " :required="true" prop="method" v-if="!form.root">
          <el-radio v-model="form.method" label="POST" border></el-radio>
          <el-radio v-model="form.method" label="GET" border></el-radio>
          <el-radio v-model="form.method" label="*" border></el-radio>
          <el-radio v-model="form.method" label="PUT" border></el-radio>
          <el-radio v-model="form.method" label="DELETE" border></el-radio>
        </el-form-item>
        <el-form-item label="请选择父菜单: ">

        <SelectTree v-if="dialogVisible" :props="defaultProps" :nodes="permissions" :value="checkedPermission" @setId="setId($event)" />

          <span style="color: rgb(224, 62, 62); font-size: 12px;">! 可选, 不填写时默认为根节点</span>
        </el-form-item>
        <el-form-item>
          <el-button @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import SelectTree from '../permission/selectTree'
import showTree from '../../components/Tree/showTree'
import {getPermissionList,getAllPermissions,addPermissions,delPermissions,updatePermissions} from "../../api/auth"
export default {
  name: 'PagePermission',
  components: { SelectTree,showTree },
  data(){
    return {
      list:[],
      listLoading: false,
      dialogVisible: false,
      title:undefined,
       form: {
        name: undefined,
        title: undefined,
        icon: undefined,
        path: undefined,
        method: "*",
        id: undefined,
        p_id: 0,
        root: false,
        hidden: "1",
        url: undefined
      },
      permissions:[],
      beforeClose:true,
      checkedPermission: undefined,
      defaultProps: {
      children: "children",
      label: "name"
      },
    }
  },
  methods: {
    /**
     * 获取列表
     */
    getList(params)
    {
      //this.listLoading = true
      getPermissionList(params).then(response => {
        const {data} = response
        this.list = data.list
      })
    },
    submit(){
      console.log(this.form)
      if(this.form.id !=undefined) {
        updatePermissions(this.form).then(response => {
         this.$message.success("success");
          this.dialogVisible = false;
          this.getList()
      })
      } else {
      addPermissions(this.form).then(response => {
         this.$message.success("success");
          this.dialogVisible = false;
          this.getList()
      })
      }

    },
    /**
     * 添加权限
     */
    async add(){
      this.title = '新增权限节点'
      this.form = this.$options.data().form;
      await this.setFormPermissionTree();
      this.dialogVisible = true;
    },
    async edit(item)
    {
      this.title = '编辑权限节点'
        await this.setFormPermissionTree();
      this.dialogVisible = true
      this.form = item
    },
    /**
     * 删除权限节点
     */
    async del(item)
    {
       this.$confirm('此操作将永久删除权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         delPermissions(item.id).then(response => {
           this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList()
      })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    handleClose() {
      this.dialogVisible = false
    },
    /**
     * 设置权限节点树
     */
    setFormPermissionTree (id) {
      new Promise((resolve, reject) => {
        getAllPermissions().then(r => {
          const { data } = r;
          let permissionNode = [
            {
              id: 0,
              name: "根节点",
              title: "根节点"
            }
          ];
          permissionNode = permissionNode.concat(
            data.list
          );

          this.$set(this, "permissions",permissionNode);
          resolve(true);
        });
      });
    },
    handleRolesChange() {
      this.$router.push({ path: '/permission/index?' + +new Date() })
    }
  },
  mounted(){
    this.getList()
  }
}
</script>
