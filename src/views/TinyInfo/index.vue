<template>
  <div class="app-container user-message">
    <div>
      <div class="flex">
        <div>
        </div>
      </div>
       <div class="head-button">
        <div>
          <el-button type="primary" @click="exportClick()">打印成绩单</el-button>
        </div>
        <div class="right"></div>
      </div>
    </div>
    <el-table
      :data="tableData"
      border
      v-loading="loading"
      style="width: 100%"
      :default-sort="{ prop: 'date', order: 'descending' }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="courseName" label="课程名称" />
      <el-table-column prop="courseId" label="课程编号" />
      <el-table-column prop="year" label="学年" />
      <el-table-column prop="term" label="学期">
        <template slot-scope="scope">
          <span>{{ scope.row.term ? "下学期" : "上学期" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="attendScore" sortable label="出勤成绩" />
      <el-table-column prop="taskScore" sortable label="作业成绩" />
      <el-table-column prop="experimentScore" sortable label="实验成绩" />
      <el-table-column prop="otherScore" sortable label="其他成绩" />
      <el-table-column prop="totalScore" sortable label="总成绩" />
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)"
            >成绩详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="pageInit.pageNum"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageInit.pageSize"
      layout="->, total, sizes, prev, pager, next, jumper"
      :total="pageInit.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import * as api from "@/api/tiny";
export default {
  name: "TinyManage",

  components: {  },
  data() {
    return {
      TinyMessage: {},
      stuId: "",
      tableFilter: {},
      tableData: [],
      selectIds: [],
    };
  },
  computed: {},
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    getList() {
      const { classId, departmentId, specializeId } = this.tableFilter;
      this.loading = true;
      let params = {
        ...this.pageInit,
        
        stuId: "",
      };
      api.getTinyByStuId(params).then((res) => {
        console.log("[ res ]-111", res);
        this.tableData = res.rows;
        this.pageInit.total = res.total;
        this.loading = false;
      });
    },
    handleClick(item) {
    },

    handleSelectionChange(val) {
      this.selectIds = val.map((item) => item.id);
    },
  },
};
</script>
<style lang="scss" scoped>
.user-message {
  .flex {
    display: flex;
    justify-content: space-between;
  }
  .head-button {
    display: flex;
    flex-direction: row-reverse;
    margin-bottom: 16px;
  }
  .header-search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    .left {
      .el-select {
        margin-right: 15px;
      }
    }
    .right {
      ::v-deep {
        .el-input-group__append {
          background-color: #fff;
        }
      }
    }
  }
}
</style>
