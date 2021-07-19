<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form size="medium">
        <el-form-item>
          <el-button type="danger" @click="selectDelete" icon="el-icon-delete"
            >删除</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="content-container" v-loading="listLoading">
      <el-table
        :data="list"
        border
        style="width: 100%"
        row-key="id"
        @selection-change="handleSelectionChange"
        size="medium"
        :header-cell-class-name="headerStyle"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="name" label="name">

        </el-table-column>
        <el-table-column prop="address" label="address">
        </el-table-column>

        <el-table-column prop="url" label="路由">

        </el-table-column>

        <el-table-column prop="method" label="方法">
          <template slot-scope="{ row }">
            <el-tag>{{ row.method.toUpperCase() }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="ip" label="ip">
        </el-table-column>
        <el-table-column prop="created_at" label="时间">
        </el-table-column>
        <el-table-column label="操作" width="250px" fixed="right">
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
      multipleSelection: [],
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
    headerStyle({ row, rowIndex }) {
      return "table-th";
    },
    async del(item) {
      this.$confirm("此操作将永久删除权限, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delLog(item.id).then((response) => {
            this.$notify({
              type: "success",
              message: "删除成功!",
            });
            this.getList();
          });
        })
        .catch(() => {
          this.$notify({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    selectDelete() {
      if (this.multipleSelection.length == 0) {
        this.$notify({
          type: "warning",
          message: "请选择需要删除的数据",
        });
      } else {
        var ids = [];
        for (var i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i]["id"]);
        }
        this.del({ id: ids.join(",") });
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
