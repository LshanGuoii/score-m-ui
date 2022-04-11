<template>
  <div class="app-container user-message">
    <div>
      <div class="flex">
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
      </div>
      <div class="head-button">
        <div>
          <el-button type="primary" @click="downEClick()"
            >下载学生导入模板</el-button
          >
          <el-button type="primary" @click="dialogVisible = true"
            >导入学生</el-button
          >

          <el-button type="primary" @click="handleClick()">新增学生</el-button>
          <el-button type="danger" @click="delClick(selectIds)"
            >批量删除</el-button
          >
          <el-button type="primary" @click="exportClick()">导出</el-button>

          <el-dialog title="上传" :visible.sync="dialogVisible" width="70%">
            <el-upload
              class="upload-demo"
              drag
              action="/student/importData"
              multiple
              :headers="headers"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="handleClickDialog"
                >确 定</el-button
              >
            </span>
          </el-dialog>
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

      <el-table-column prop="stuId" label="学号" sortable />
      <el-table-column prop="name" label="姓名" sortable />
      <el-table-column prop="sex" label="性别">
        <template slot-scope="scope">
          <span>{{ scope.row.sex ? "男" : "女" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="departmentName" label="系部" />
      <el-table-column prop="specializeName" label="专业" />
      <el-table-column prop="className" label="班级" />
      <el-table-column prop="entranceTime" label="入学时间" />
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
import * as api from "@/api/student";
import ClassTreeFilter from "./../../components/ClassTreeFilter.vue";
import { blobDownload } from "@/utils";
import { getToken } from "@/utils/auth"; // get token from cookie

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
      dialogVisible: false,
    };
  },
  computed: {
    headers() {
      return this.configHead();
    },
  },
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    configHead() {
      const config = {
        Authorization: getToken(),
      };
    },
    getList() {
      const { classId, departmentId, specializeId } = this.tableFilter;
      this.loading = true;
      let params = {
        ...this.pageInit,
        classId: classId,
        departmentId: departmentId,
        specializeId: specializeId,
        stuId: this.stuId,
      };
      api.getStudentList(params).then((res) => {
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
          api.getStudentRemove(val).then((res) => {
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
      api.getStudentExport(params).then((res) => {
        console.log("[ res ]-163", res);
        blobDownload(res.data, "学生列表");
      });
    },
    downEClick() {
      api.getStudentImportTemplate({ isExport: true }).then((res) => {
        console.log("[ res ]-201", res);
        blobDownload(res.data, "学生模板");
      });
    },
    importClick() {
      // api.getStudentImportData().then((res) => {
      //   this.getList();
      //   this.dialogVisible = false;
      // });
    },
    handleClickDialog() {
      // this.importClick();
      this.getList();
      this.dialogVisible = false;
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
