<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :model="filter" :inline="true" size="medium">
        <el-form-item label="">
          <el-button type="primary" @click="add()" icon="el-icon-plus"
            >添加任务</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="content-container">
      <el-table
        :cell-style="{ textAlign: 'center' }"
        :data="list"
        border
        style="width: 100%"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        row-key="id"
        size="medium"
        :header-cell-class-name="headerStyle"
      >
        <el-table-column
          width="250px"
          prop="task_name"
          label="任务名称"
        ></el-table-column>
        <el-table-column width="250px" prop="status" label="状态">
          <template slot-scope="{ row }">
            <el-tooltip content="选择是否开启任务" placement="top" >
              <el-switch
              @change="selectStatus(row)"
                v-model="row.status"
                active-color="#DCDFE6"
                inactive-color="#13ce66"
                :active-value="0"
                :inactive-value="1"
              >
              </el-switch>
            </el-tooltip>
            <!-- <span v-if="row.status == 0"><el-tag type="danger">停止</el-tag></span>
            <span v-if="row.status == 1"><el-tag type="success">运行</el-tag></span> -->
          </template>
        </el-table-column>

        <el-table-column width="250px" prop="type" label="任务类型">
          <template slot-scope="{ row }">
            <span v-if="row.type == 1">Api</span>
            <span v-if="row.type == 2">Shell</span>
            <span v-if="row.type == 3">测试模版</span>
          </template>
        </el-table-column>
        <el-table-column
          width="250px"
          prop="created_at"
          label="添加时间"
        ></el-table-column>
        <el-table-column
          width="250px"
          prop="op_name"
          label="添加人"
        ></el-table-column>
  <el-table-column
          width="250px"
          prop="job_id"
          label="任务id"
        ></el-table-column>
        <el-table-column label="操作" width="250px" fixed="right">
          <template slot-scope="{ row }">
            <el-button @click="edit(row)" type="primary">编辑</el-button>

            <el-button @click="del(row)" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <el-form :model="form" size="medium">
        <el-form-item label="任务类型">
          <el-select
            v-model="form.task_type"
            placeholder="任务类型"
            @change="selectTaskType"
          >
            <el-option
              v-for="item in taskType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="执行周期">
         <el-select
            v-model="form.cycle"
            placeholder="执行周期"
            @change="selectTaskType"
          >
            <el-option
              v-for="item in cycleList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>

          </el-select>

        </el-form-item>
        <el-form-item label="任务名称">
          <el-col :span="6">
            <el-input placeholder="请输入任务名称" v-model="form.task_name">
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item v-if="form.task_type == 3" label="收件邮箱">
          <el-col :span="6">
            <el-input placeholder="请输入收件邮箱" v-model="form.email">
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="脚本内容">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="form.textarea"
          >
          </el-input>
        </el-form-item>
        <el-form-item fixed="right">
          <el-button @click="submit()" type="primary">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
import layoutMinix from "@/layout/components/mixins/layout";
import Pagination from "@/components/Pagination/index";
import { getTaskList, delTask, addTask, updateTask } from "@/api/task";
export default {
  components: { Pagination },
  mixins: [layoutMinix],
  data() {
    return {
      taskType: [
        {
          label: "Api",
          value: 1,
        },
        {
          label: "Shell",
          value: 2,
        },
        {
          label: "测试模版",
          value: 3,
        },
      ],
      cycleList: [
        { label: "每天", value: 1 },
        { label: "N天", value:2 },
        { label: "N小时", value:3 },
        { label: "N分钟", value: 4 },
        { label: "每小时", value: 5 },
        { label: "每星期", value:6 },
        { label: "每月", value: 7 },
      ],
      list: [],
      filter: {},
      dialogVisible: false,
      title: "",
      form: {
        task_type: 1,
        task_name: "",
        textarea: "",
        cycle:"",
        email: "",
      },
    };
  },

  methods: {
    selectStatus(row) {
      updateTask({ id: row.id, status: row.status }).then((response) => {
        if (response.code == 200) {
          this.$notify.success("更新状态成功");
          this.getList();
        }
      });
    },
    selectTaskType(value) {
      console.log(value);
      if (value == 3) {
        (this.form.task_name = "这是一个发送邮件的测试模版"),
          (this.form.textarea = "将发送一份邮件给你～～～📧 ");
      }
    },
    submit() {
      addTask(this.form).then((response) => {
        const { code } = response;
        if (code == 200) {
          this.$notify.success("提交任务成功");
          this.dialogVisible = false;
          this.getList();
        }
      });
    },
    del(row) {
      delTask({id:row.id}).then((response)=>{
        this.$notify.success(response.message)
        this.getList()
      })
    },
    add() {
      this.dialogVisible = true;
      this.title = "添加新任务";
    },
    headerStyle({ row, rowIndex }) {
      return "table-th";
    },
    handleClose(done) {
      done();
    },
    getList(params = {}) {
      params = Object.assign(params, this.filter);
      getTaskList(params).then((response) => {
        const { list, mate } = response.data;
        this.list = list;
        console.log(list);
        this.total = mate.total;
        this.page = mate.page;
        this.pageSize = mate.pageSize;
      });
    },
  },
  mounted() {
    this.getList();
  },
};
</script>
