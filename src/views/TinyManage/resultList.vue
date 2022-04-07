<template>
  <div class="app-container user-message">
    <div>
      <div class="flex">
        <div>
          <el-form inline style="width: 100%">
            <el-form-item label="状态选择">
              <el-select
                v-model="tableFilter.entered"
                placeholder="请选择状态"
                @change="getList()"
              >
                <el-option label="未录入" :value="1"></el-option>
                <el-option label="已录入" :value="0"></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item>
              <el-input
                v-model="tableFilter.search"
                clearable
                placeholder="请输入专业名"
                style="width: 340px"
                @change="getList()"
              >
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="getList()"
                />
              </el-input>
            </el-form-item> -->
          </el-form>
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
          <el-button type="primary" @click="exportClick()">导出</el-button>
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
      <el-table-column prop="stuNum" label="学号" sortable />
      <el-table-column prop="stuName" label="姓名" sortable />
      <!-- <el-table-column prop="departmentName" label="系部" />
      <el-table-column prop="specializeName" label="专业" />
      <el-table-column prop="className" label="班级" /> -->
      <el-table-column prop="courseName" label="课程名称" />
      <el-table-column prop="term" label="学期">
        <template slot-scope="scope">
          <span>{{ scope.row.term ? "下学期" : "上学期" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="year" label="学年" />
      <!-- <el-table-column prop="attendScore" label="入学时间" />
      <el-table-column prop="taskScore" label="入学时间" />
      <el-table-column prop="experimentScore" label="入学时间" />
      <el-table-column prop="otherScore" label="入学时间" /> -->
      <el-table-column prop="totalScore" sortable label="总成绩" />
      <el-table-column prop="entered" label="状态">
        <template slot-scope="scope">
          <span>{{ scope.row.entered ? "已录入" : "未录入" }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <!-- <el-button
            @click="handleClick(scope.row,'view')"
            type="text"
            size="small"
          >查看</el-button> -->
          <el-button
            v-if="scope.row.entered"
            type="text"
            size="small"
            @click="handleClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            v-else
            type="text"
            size="small"
            @click="handleClick(scope.row)"
            >录入</el-button
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
    <From v-model="showDialog" v-if="showDialog" :fromData="TinyMessage" />
  </div>
</template>

<script>
import From from "./From.vue";
import * as api from "@/api/tiny";
import { blobDownload } from "@/utils";
export default {
  name: "TinyManage",

  components: { From },
  data() {
    return {
      showDialog: false,
      TinyMessage: {},
      stuId: "",
      tableFilter: {
        entered: null,
      },
      tableData: [],
      selectIds: [],
    };
  },
  computed: {},
  created() {
    console.log("[ this.$router ]-143", this.$route);
    this.getList();
  },
  mounted() {},
  methods: {
    getList() {
      const { classId } = this.$route.query;
      this.loading = true;
      let params = {
        classId: classId,
        // ...this.tableFilter,
        ...this.pageInit,
      };
      api.getTinyList(params).then((res) => {
        console.log("[ res ]-111", res);
        this.tableData = res.rows;
        this.tableData.term = this.$route.query.term;
        this.tableData.year = this.$route.query.year;
        this.tableData.courseId = this.$route.query.courseId;
        this.pageInit.total = res.total;
        this.loading = false;
      });
    },
    handleClick(item) {
      this.TinyMessage = item || {};
      this.TinyMessage.term = this.$route.query.term;
      this.TinyMessage.year = this.$route.query.year;
      this.TinyMessage.courseId = this.$route.query.courseId;
      this.showDialog = true;
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
      api.getTinyExport(params).then((res) => {
        blobDownload(res.data, "学生成绩列表");
      });
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
