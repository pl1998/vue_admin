<template>
  <div class="app-container">
     <div class="filter-container">
      <el-form>
        <el-form-item>
          <el-button type="success" @click="add" icon="el-icon-plus">add</el-button>
        </el-form-item>
      </el-form>
    </div>
     <div class="content-container" v-loading="listLoading">
      <el-table :data="list" border style="width: 100%" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" row-key="id">
        <el-table-column prop="name" label="权限名称"></el-table-column>
        <el-table-column prop="status" label="权限状态">
          <template slot-scope="{row}">
            <el-tag v-if="row.status == 0">正常</el-tag>
            <el-tag v-else>禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="icon">
          <template slot-scope="{row}">
            <span :icon="row.icon"></span>
          </template>
        </el-table-column>
        <el-table-column prop="url" label="url">
          <template slot-scope="{row}">
            <el-tag>{{row.url}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="method" label="method">
          <template slot-scope="{row}">
            <el-tag>{{row.method}}</el-tag>
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

    <!-- <selectTree></selectTree> -->
  </div>
</template>

<script>
import selectTree from '../permission/selectTree'
import {getPermissionList} from "../../api/auth"
export default {
  name: 'PagePermission',
  components: { selectTree },
  data(){
    return {
      list:[

      ],
      listLoading:false
    }
  },
  methods: {
    getList(params)
    {
      //this.listLoading = true
      getPermissionList(params).then(response => {
        const {data} = response
        console.log(data)
        this.list = data.list
      })
    },
    add(){

    },
    async edit(item)
    {

    },
    async del(item)
    {

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
