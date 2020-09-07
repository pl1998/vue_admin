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
      <el-table :data="list" border style="width: 100%" row-key="id">
        <el-table-column prop="username" label="Username"></el-table-column>
        <el-table-column prop="email" label="email">
          <template slot-scope="{row}">
            <sapn>{{row.email}}</sapn>
          </template>
        </el-table-column>
        <el-table-column prop="roles_text" label="roles">
          <template slot-scope="{row}">
            <el-tag v-for="role in row.roles_text">
              <sapn>{{role.name}}</sapn>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="create_time">
          <template slot-scope="{row}">
            <sapn>{{row.create_time}}</sapn>
          </template>
        </el-table-column>
        <el-table-column label="method" width="250px">
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
import { getUserList } from "../../api/auth";
export default {
  name: "UserPermission",
  data() {
    return {
      list: [],
      mate: [],
      listLoading: false,
    };
  },
  methods: {
    getList(params) {
      this.listLoading = true;
      getUserList(params).then((response) => {
        const { data, mate } = response;
        this.list = data.list;
        this.mate = data.mate;
        this.listLoading = false;
      });
    },
    add() {},
    async edit(item) {},
    async del(item) {},
  },
  mounted() {
    this.getList();
  },
};
</script>
<style lang="stylus" scoped></style>