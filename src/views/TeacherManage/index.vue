<template>
  <div class="app-container user-message">
    <div>
      <div class="flex">
        <!-- <div>
          <el-input
            v-model="teacherId"
            clearable
            placeholder="请输入学号"
            style="width: 340px"
          >
            <el-button slot="append" icon="el-icon-search" @click="getList()" />
          </el-input>
        </div> -->
        <div>
          <el-button type="primary" @click="handleClick()">新增教师</el-button>
          <el-button type="danger" @click="delClick(selectIds)"
            >批量删除</el-button
          >
        </div>
      </div>
      <div class="head-button">
        <!-- <div>
          <el-button type="primary" @click="handleClick()">新增学生</el-button>
          <el-button type="danger" @click="delClick(selectIds)"
            >批量删除</el-button
          >
        </div> -->
        <div class="right"></div>
      </div>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :default-sort="{ prop: 'date', order: 'descending' }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>

      <el-table-column prop="teacherId" label="编号" sortable />
      <el-table-column prop="teacherName" label="姓名" sortable />
      <el-table-column prop="sex" label="性别">
        <template slot-scope="scope">
          <span>{{ scope.row.sex ? "男" : "女" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="teacherDepartmentName" label="系部" />
      <el-table-column prop="telphone" label="电话" />
      <el-table-column prop="admissionTime" label="入职时间" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
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
    <TeacherFrom
      v-model="showDialog"
      v-if="showDialog"
      :fromData="studentMessage"
    />
  </div>
</template>

<script>
import TeacherFrom from "./TeacherFrom.vue";
import * as api from "@/api/teacher";
export default {
  name: "StudentManage",

  components: { TeacherFrom },
  data() {
    return {
      showDialog: false,
      studentMessage: {},
      teacherId: "",
      tableFilter: {},
      tableData: [],
      selectIds: "",
    };
  },
  computed: {},
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    getList() {
      let params = {
        ...this.pageInit,
        stuId: "",
      };
      api.getTeacherList(params).then((res) => {
        console.log("[ res ]-111", res);
        this.tableData = res.rows;
        this.pageInit.total = res.total;
      });
    },
    handleClick(item) {
      this.studentMessage = item || {};
      this.showDialog = true;
    },
    delClick(val) {
      console.log("[ val ]-119", val);
      val = val.length ? val : [val];
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          api.getTeacherRemove(val).then((res) => {
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
    handleSelectionChange() {},
  },
};
</script>
<style lang="scss" scoped>
.user-message {
  .flex {
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
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
