<template>
  <div class="app-container">
    <!-- 搜索 -->
    <div class="filter-container">
      <el-form :model="filter" :inline="true">
        <el-form-item label="">
          <el-input v-model="filter.email" placeholder="" clearable>
            <template slot="prepend">Eamil</template>
          </el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="filter.name" placeholder="">
            <template slot="prepend">用户名称</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search" />
          <el-button type="dange" icon="el-icon-refresh" @click="resetForm" />
          <el-button type="success" plain icon="el-icon-plus" @click="add()" />
        </el-form-item>
      </el-form>
    </div>
    <div v-loading="listLoading" class="content-container">
      <el-table :data="list" border style="width: 100%" row-key="id">
        <el-table-column prop="name" label="用户名" />
        <el-table-column width="80px" prop="avatar" label="头像">
          <template slot-scope="{row}">
            <img class="user-avatar" :src="row.avatar">
          </template>
        </el-table-column>

        <el-table-column prop="email" label="邮箱">
          <template slot-scope="{row}">
            <span>{{ row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="roles" label="角色">

          <template slot-scope="{row}">

            <el-tag v-for="(role,key) in row.roles_node" :key="key" style="margin: 0px 2px 0px 2px;"> {{ role.name }} </el-tag>

          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="添加时间">
          <template slot-scope="{row}">
            <span>{{ row.created_at }}</span>
          </template>
        </el-table-column>
        <el-table-column label="method" width="250px">
          <template slot-scope="{row}">
            <el-button type="primary" icon="el-icon-edit-outline" @click="edit(row)" />
            <!-- <el-button @click="del(row)" type="danger" icon="el-icon-delete"></el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog :title="title" :visible.sync="dialogVisible" :before-close="handleClose">
      <el-form ref="editForm" :model="form" label-width="100px">
        <el-form-item label="用户名称: " :required="true" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>

        <el-form-item label="用户邮箱: " :required="true" prop="email">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="密码: " prop="password" :required="true">
          <el-input v-model="form.password" type="password" />
        </el-form-item>
        <el-form-item label="确认密码: " prop="password" :required="true">
          <el-input v-model="form.password_confirmation" type="password" />
        </el-form-item>
        <el-form-item label="赋予角色" prop="roles[]">
          <el-select v-model="form.roles" multiple filterable allow-create default-first-option placeholder="请选择角色" value-key="name">
            <el-option
              v-for="item in allRole"
              :key="item.id"
              :label="item.name"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-success" @click="submit()">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :page-size.sync="listQuery.pageSize" @pagination="getList" />
  </div>
</template>
<script>
import layoutMinix from '../../layout/components/mixins/layout'
import Pagination from '@/components/Pagination/index'
import { getUserList, addUser, updateUser } from '../../api/auth'
import { allRole } from '../../api/role'

export default {
  name: 'UserPermission',
  components: { Pagination },
  mixins: [layoutMinix],
  data() {
    return {
      list: [],
      mate: [],
      listLoading: false,
      page: undefined,
      form: {
        id: undefined,
        name: null,
        email: null,
        avatar: null,
        password: undefined,
        password_confirmation: undefined,
        roles: []
      },
      dialogVisible: false,
      title: undefined,
      allRole: [{
        id: 0,
        name: '无权限'
      }],
      filter: {
        email: undefined,
        name: undefined
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
    getList(params = {}) {
      this.listLoading = true
      params = Object.assign(params, this.filter)
      getUserList(params).then((response) => {
        const { list, mate } = response.data
        this.list = list
        this.total = mate.total
        this.page = mate.page
        this.pageSize = mate.pageSize
      })
      this.listLoading = false
    },
    getAllRole() {
      allRole().then((response) => {
        const { data } = response
        this.allRole = data
      })
    },
    add() {
      this.getAllRole()
      this.title = '添加用户'
      this.dialogVisible = true
    },
    submit() {
      if (this.form.id !== undefined) {
        updateUser(this.form).then((response) => {
          this.$message.success(response.message)
          this.getList()
          this.dialogVisible = false
        })
      } else {
        addUser(this.form).then((response) => {
          if (response.code === 200) {
            this.$message({
              type: 'success',
              message: response.message,
              duration: 5 * 1000
            })
            this.getList()
            this.dialogVisible = false
          }
        })
      }
    },
    async edit(item) {
      await this.getAllRole()
      this.form = Object.assign(item, {
        name: item.name,
        roles: item.roles_node,
        id: item.id
      })
      console.log(item.roles_node)
      // this.checkedRoles = item.roles_node;
      this.title = '编辑用户 | ' + item.name
      this.dialogVisible = true
    },
    search() {
      this.getList()
    },
    resetForm() {
      // this.searchCodeList = []
      this.filter = []
      this.getList()
    },
    async del(item) {}
  }
}
</script>
<style lang="scss">
.user-avatar{
  height: 40px;
  width: 40px;
}
</style>
