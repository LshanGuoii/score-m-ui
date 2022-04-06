<template>
  <div class="app-container user-message">
    <div>
      <!-- <div class="flex">
        <div>
          <ClassTreeFilter @update="tableFilterUpdate" />
        </div>
        <div>
          <el-input
            v-model="stuId"
            clearable
            placeholder="请输入学号"
            style="width: 340px"
          >
            <el-button slot="append" icon="el-icon-search" @click="getList()" />
          </el-input>
        </div>
      </div> -->
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
      <!-- <el-table-column prop="courseId" label="课程编号" /> -->
      <el-table-column prop="term" label="学期">
        <template slot-scope="scope">
          <span>{{ scope.row.term ? "下学期" : "上学期" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="year" label="学年" />

      <el-table-column prop="departmentName" label="系部" />
      <el-table-column prop="specializeName" label="专业" />
      <el-table-column prop="className" label="班级" />
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <!-- <el-button
            @click="handleClick(scope.row,'view')"
            type="text"
            size="small"
          >查看</el-button> -->
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
import ClassTreeFilter from "./../../components/ClassTreeFilter.vue";
export default {
  name: "TinyManage",

  components: { ClassTreeFilter },
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
        classId: classId,
        departmentId: departmentId,
        specializeId: specializeId,
        stuId: "",
      };
      api.getCruRoleTeacherYoung(params).then((res) => {
        console.log("[ res ]-111", res);
        this.tableData = res.rows;
        this.pageInit.total = res.total;
        this.loading = false;
      });
    },
    handleClick(item) {
      this.$router.push({ name: "resultList", query: item });
    },
    tableFilterUpdate(data) {
      this.tableFilter = data;
      this.getList();
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
