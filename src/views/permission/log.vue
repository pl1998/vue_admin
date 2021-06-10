<template>
  <div class="app-container">
    <!-- <div class="filter-container">
      <el-form>
        <el-form-item>
          <el-button type="success" @click="add" icon="el-icon-plus"></el-button>
        </el-form-item>
      </el-form>
    </div> -->
    <div class="content-container" v-loading="listLoading">
      <el-table :data="list" border style="width: 100%" row-key="id">
        <el-table-column prop="name" label="name">
          <template slot-scope="{ row }">
            <el-tag>{{ row.name }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="address">
          <template slot-scope="{ row }">
            {{ row.address }}
          </template>
        </el-table-column>

        <el-table-column prop="url" label="路由">
          <template slot-scope="{ row }">
            <el-tag>{{ row.url }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="method" label="方法">
          <template slot-scope="{ row }">
            <el-tag>{{ row.method.toUpperCase() }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="ip" label="ip">
          <template slot-scope="{ row }">
            <el-tag>{{ row.ip }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="时间">
          <template slot-scope="{ row }">
            <el-tag>{{ row.created_at }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250px">
          <template slot-scope="{ row }">
            <el-button
              @click="del(row)"
              type="danger"
              icon="el-icon-delete"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :pageSize.sync="listQuery.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import layoutMinix from "../../layout/components/mixins/layout";
import { getLogList, delLog } from "@/api/auth";
import Pagination from "@/components/Pagination/index";
export default {
  name: "Log",
  components: { Pagination },
  mixins: [layoutMinix],
  data() {
    return {
      list: [],
      listLoading: false,
      dialogVisible: false,
      title: undefined,
      beforeClose: true,
      checkedPermission: undefined,
      defaultProps: {
        children: "children",
        label: "name",
        filter: [],
      },
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    /**
     * 获取列表
     */
    getList(params = {}) {
      params = Object.assign(params, this.filter);
      getLogList(params).then((response) => {
        const { list, mate } = response.data;
        this.list = list;
        this.total = mate.total;
        this.page = mate.page;
        this.pageSize = mate.pageSize;
      });
    },

    /**
     * 删除权限节点
     */
    async del(item) {

      this.$confirm("此操作将永久删除权限, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })

        .then(() => {
          delLog(item.id).then((response) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    handleRolesChange() {
      this.$router.push({ path: "/permission/index?" + +new Date() });
    },
  },
  mounted() {
    this.getList();
  },
};
</script>
