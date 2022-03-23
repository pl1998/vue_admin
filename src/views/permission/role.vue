<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form>
        <el-form-item>
          <el-button type="success" icon="el-icon-plus" @click="add" />
        </el-form-item>
      </el-form>
    </div>
    <div v-loading="listLoading" class="content-container">
      <el-table
        :data="list"
        border
        style="width: 100%"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        row-key="id"
      >
        <el-table-column prop="name" label="角色名称" />
        <el-table-column prop="status" label="权限状态">
          <template slot-scope="{row}">
            <el-tag v-if="row.status == 1">正常</el-tag>
            <el-tag v-else>禁用</el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="nodes" label="权限节点">
          <template slot-scope="{row}">
            <span>{{row.nodes}}</span>
          </template>
        </el-table-column> -->
        <el-table-column prop="description" label="角色描述">
          <template slot-scope="{row}">
            <el-tag>{{ row.description }}</el-tag>
          </template>

        </el-table-column>
        <el-table-column prop="create_time" label="添加时间">
          <template slot-scope="{row}">
            <span>{{ row.created_at }}</span>
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
      <el-form ref="roleForm" v-loading="formLoadding" :model="form" label-width="100px">
        <el-form-item label="角色名称: " :required="true" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="角色描述: " :required="true" prop="description">
          <el-input v-model="form.description" />
        </el-form-item>
        <el-form-item label="状态选择: " :required="true" prop="status">
          <el-radio v-model="form.status" label="1">启用</el-radio>
          <el-radio v-model="form.status" label="2">禁用</el-radio>
        </el-form-item>
        <el-form-item label="赋予权限节点:" :required="true">
          <el-tree
            ref="tree"
            :data="form.permissions"
            show-checkbox
            node-key="id"
            :default-checked-keys="form.node"
            highlight-current
            :props="defaultProps"
            @check-change="nodeChange"
          />
        </el-form-item>
        <el-form-item>
          <el-button @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
// import path from "path";
// import { deepClone } from "@/utils";
import { getRoles, addRole, deleteRole, updateRole } from '@/api/role'
import { getPermissionList } from '@/api/auth'

const defaultRole = {
  key: '',
  name: '',
  description: '',
  routes: []
}

export default {
  data() {
    return {
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      count: 1,
      permissions: [],
      title: '',
      role: Object.assign({}, defaultRole),
      routes: [],
      list: [],
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      formLoadding: true,
      form: {
        id: undefined,
        name: undefined,
        description: undefined,
        status: undefined,
        node: []
      },
      listLoading: false
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    this.getRoles()
  },
  mounted() {
    this.allPermissions()
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    async getRoles() {
      const { data } = await getRoles()
      this.list = data.list
    },
    async add() {
      this.title = '新增角色'
      this.form = this.$options.data().form
      await this.setFormPermissionTree()
      this.formLoadding = false
      this.dialogVisible = true
    },
    async edit(item) {
      this.form = Object.assign(this.form, {
        name: item.name,
        description: item.description,
        status: item.status.toString(),
        id: item.id,
        node: item.node
      })
      await this.setFormPermissionTree(item.id)
      this.title = '编辑角色 | ' + item.name
      this.dialogVisible = true
      this.formLoadding = false
      this.allPermissions()
    },
    async del(item) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRole(item.id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getRoles()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    setFormPermissionTree() {
      new Promise((resolve, reject) => {
        getPermissionList().then(r => {
          const { data } = r
          // let permissionNode = [
          //   {
          //     id: 0,
          //     name: "根节点",
          //     title: "根节点"
          //   }
          // ];
          this.$set(this.form, 'permissions', data.list)
          resolve(true)
        })
      })
    },
    nodeChange() {
      const keys = this.$refs.tree.getCheckedKeys()

      this.form.node_ids = keys
      if (keys.length !== 0) {
        this.form.node = keys
      } else {
        this.form.node = ''
      }
    },
    submit() {
      if (this.form.id !== undefined) {
        updateRole(this.form).then((response) => {
          this.$message.success('success')
          this.dialogVisible = false
          this.getRoles()
        })
      } else {
        addRole(this.form).then((response) => {
          this.$message.success('success')
          this.dialogVisible = false
          this.getRoles()
        })
      }
    },

    getCheckedNodes() {
      this.$refs.tree.getCheckedNodes()
    },
    getCheckedKeys() {
      return this.$refs.tree.getCheckedKeys()
    },
    setCheckedNodes() {
      this.$refs.tree.setCheckedNodes([{
        id: 5,
        label: '二级 2-1'
      }, {
        id: 9,
        label: '三级 1-1-1'
      }])
    },
    setCheckedKeys() {
      console.log(this.$refs.tree.setCheckedKeys([3]))
      this.$refs.tree.setCheckedKeys([3])
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([])
    },
    // 获取权限节点
    allPermissions() {
      getPermissionList().then((response) => {
        const { data } = response
        this.permissions = data.list
        // 强制dom渲染
        this.$set(
          this.form,
          'permissions',
          data.list
        )
      })
    }
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
