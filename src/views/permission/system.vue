<template>
  <div class="app-container">
    <div class="content-container" v-loading="listLoading">
      <aside><i class="fa fa-steam"></i> 服务器信息</aside>
      <el-table :data="list" border style="width: 100%" row-key="id">
        <el-table-column prop="name" label="">
          <template slot-scope="{ row }">
          {{ row.name }}
          </template>
        </el-table-column>
          <el-table-column prop="value" label="">
          <template slot-scope="{ row }">
          {{ row.value }}
          </template>
        </el-table-column>
      </el-table>
        <aside> </aside>
    </div>
  </div>
</template>
<script>
import { getSystem } from "@/api/system";
export default {
  data() {
   return {
      listLoading: false,
      list: []
    };
  },
  methods: {
    info() {
       getSystem().then(response => {

        const { data } = response;
        this.list = data;

       })
    },
  },
  mounted() {
    this.info();
  },
};
</script>
