<template>
  <div class="app-container user-message">
    <div>
      <div class="flex">
        <ClassTreeFilter @update="tableFilterUpdate" />
        <div class="head-button">
          <div>
            <el-button type="primary" @click="handleClick()"
              >授课绑定</el-button
            >
            <el-button type="danger" @click="delClick(selectIds)"
              >批量删除</el-button
            >
            <el-button type="primary" @click="exportClick()">导出</el-button>
          </div>
          <div class="right"></div>
        </div>

        <!-- <div>
          <el-input
            v-model="stuId"
            clearable
            placeholder="请输入学号"
            style="width: 340px"
          >
            <el-button slot="append" icon="el-icon-search" @click="getList()" />
          </el-input>
        </div> -->
      </div>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :default-sort="{ prop: 'date', order: 'descending' }"
      @selection-change="handleSelectionChange"
      v-loading="loading"
    >
      <el-table-column type="selection" width="55"> </el-table-column>

      <el-table-column prop="teacherName" label="任课教师" sortable />
      <el-table-column prop="year" label="学年" />
      <el-table-column prop="term" label="学期">
        <template slot-scope="scope">
          <span>{{ scope.row.term ? "下学期" : "上学期" }}</span>
        </template>
      </el-table-column>
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
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="delClick(scope.row.id)"
            >删除</el-button
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
    <StudentFrom
      v-model="showDialog"
      v-if="showDialog"
      :fromData="studentMessage"
    />
  </div>
</template>

<script>
import StudentFrom from "./StudentFrom.vue";
import * as api from "@/api/teaching";
import ClassTreeFilter from "@/components/ClassTreeFilter.vue";
import { blobDownload } from "@/utils";
export default {
  name: "StudentManage",

  components: { StudentFrom, ClassTreeFilter },
  data() {
    return {
      showDialog: false,
      studentMessage: {},
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
      api.getTeacherYoungList(params).then((res) => {
        console.log("[ res ]-111", res);
        this.tableData = res.rows;
        this.pageInit.total = res.total;
        this.loading = false;
      });
    },
    handleClick(item) {
      console.log("[ item ]-143", item);
      this.studentMessage = item || {};
      console.log("[ this.studentMessage ]-145", this.studentMessage);
      this.showDialog = true;
    },
    delClick(val) {
      val = val.length ? val : [val];
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          api.getTeacherYoungRemove(val).then((res) => {
            this.getList();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    tableFilterUpdate(data) {
      this.tableFilter = data;
      this.getList();
    },
    handleSelectionChange(val) {
      this.selectIds = val.map((item) => item.id);
    },
    exportClick() {
      let params = {
        ...this.tableFilter,
        ids: this.selectIds,
        isExport: true,
      };
      // api.getTeacherYoungExport(params).then((res) => {
      //   console.log("[ res ]-163", res);
      //   blobDownload(res.data, "学生列表");
      // });
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
