<template>
  <div class="app-container ">
    <div class="filter-container">
      <el-form>
        <el-form-item>
          <el-button type="success" icon="el-icon-plus" @click="add" />
        </el-form-item>
      </el-form>
    </div>
    <div v-loading="listLoading" class="content-container">
      <el-table :data="list" border style="width: 100%" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" row-key="id">
        <el-table-column prop="name" label="权限名称">
          <template slot-scope="{row}">
            <i v-if="row.is_menu===1" class="fa fa-reorder" />
            <i v-else class="fa fa-paper-plane" />
            <span>  {{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="权限状态">
          <template slot-scope="{row}">
            <el-tag v-if="row.status === 1">正常</el-tag>
            <el-tag v-else>禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="url" label="url">
          <template slot-scope="{row}">
            <el-tag>
              <span>{{ row.url }}</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="icon" label="icon">
          <template slot-scope="{row}">
            <i :class="row.icon" />
          </template>
        </el-table-column>
        <el-table-column prop="path" label="前端路由">
          <template slot-scope="{row}">
            <el-tag>
              <span>{{ row.path }}</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="method" label="方法">
          <template slot-scope="{row}">
            <el-tag>{{ row.method.toUpperCase() }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250px">
          <template slot-scope="{row}">
            <el-button type="primary" icon="el-icon-edit-outline" @click="edit(row)" />
            <el-button type="danger" icon="el-icon-delete" @click="del(row)" />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :before-close="handleClose">
      <el-form v-if="dialogVisible" ref="roleForm" :model="form" label-width="100px">
        <el-form-item label="是否为菜单">
          <el-radio-group v-model="form.is_menu">
            <el-radio-button :label="true">是</el-radio-button>
            <el-radio-button :label="false">否</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="权限名称: " :required="true" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="后端api: " :required="true" prop="url">
          <el-input v-model="form.url" />
        </el-form-item>

        <el-form-item v-if="form.is_menu" label="前端路由: " :required="true" prop="path">
          <el-input v-model="form.path" />
        </el-form-item>

        <el-form-item v-if="form.is_menu" label="icon">
          <!-- <e-icon-picker v-model="form.icon" prop="icon" /> -->
          <e-icon-picker v-model="form.icon" />
          <!-- <icon-picker v-model="form.icon" :required="true" prop="path" ></icon-picker> -->
        </el-form-item>
        <el-form-item v-if="!form.is_menu" label="方法选择: " :required="true" prop="method">
          <el-radio v-model="form.method" label="POST" border />
          <el-radio v-model="form.method" label="GET" border />
          <el-radio v-model="form.method" label="*" border />
          <el-radio v-model="form.method" label="PUT" border />
          <el-radio v-model="form.method" label="DELETE" border />
        </el-form-item>
        <el-form-item label="请选择父菜单: ">
          <SelectTree v-if="dialogVisible" :props="defaultProps" :nodes="permissions" :value="checkedPermission" @setId="setId($event)" />
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
import { getPermissionList, getAllPermissions, addPermissions, delPermissions, updatePermissions } from '../../api/auth'
export default {
  name: 'PagePermission',
  components: { SelectTree },
  data() {
    return {
      list: [],
      listLoading: false,
      dialogVisible: false,
      title: undefined,
      form: {
        name: undefined,
        title: undefined,
        icon: undefined,
        path: undefined,
        method: '*',
        id: undefined,
        p_id: 0,
        root: false,
        hidden: '1',
        url: undefined,
        is_menu: 1
      },
      permissions: [],
      beforeClose: true,
      checkedPermission: undefined,
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    /**
     * 获取列表
     */
    getList(params) {
      // this.listLoading = true
      getPermissionList(params).then(response => {
        const { data } = response
        this.list = data.list
      })
    },
    submit() {
      // await this.validateForm("roleForm");
      if (this.form.id !== undefined) {
        updatePermissions(this.form).then(response => {
          this.$message.success('success')
          this.dialogVisible = false
          this.getList()
        })
      } else {
        addPermissions(this.form).then(response => {
          this.$message.success('success')
          this.dialogVisible = false
          this.getList()
        })
      }
    },
    /**
     * 添加权限
     */
    async add() {
      this.title = '新增权限节点'
      this.form = this.$options.data().form
      this.form.is_menu = false
      await this.setFormPermissionTree()
      this.dialogVisible = true
    },
    async edit(item) {
      console.log(item.root)
      await this.setFormPermissionTree()

      this.form = Object.assign(this.form, item, {
        method: item.method.toUpperCase(),
        root: item.p_id === 0,
        hidden: item.hidden.toString(),
        is_menu: item.is_menu
      })

      this.checkedPermission = item.p_id
      this.permissionTitle = item.name
      this.title = '编辑权限 | ' + item.name
      this.dialogVisible = true
    },
    /**
     * 删除权限节点
     */
    async del(item) {
      this.$confirm('此操作将永久删除权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delPermissions(item.id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    setId(id) {
      this.form.p_id = id
    },
    /**
     * 设置权限节点树
     */
    setFormPermissionTree(id) {
      new Promise((resolve, reject) => {
        getAllPermissions().then(r => {
          const { data } = r

          let permissionNode = [
            {
              id: 0,
              name: '根节点',
              title: '根节点'
            }
          ]
          permissionNode = permissionNode.concat(
            data.list
          )

          this.$set(this, 'permissions', permissionNode)
          resolve(true)
        })
      })
    },
    handleRolesChange() {
      this.$router.push({ path: '/permission/index?' + +new Date() })
    }
  }
}
</script>
