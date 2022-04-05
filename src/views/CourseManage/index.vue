<template>
  <div class="app-container user-message">
    <div>
      <From v-if="showDialog" v-model="showDialog" :fromData="courseMessage" />
      <div class="header-search">
        <div class="left">
          <div>
            <el-button type="primary" @click="handleClick()"
              >新增课程</el-button
            >
          </div>
          <div>
            <el-button type="danger" @click="delClick(selectIds)"
              >批量删除</el-button
            >
          </div>
          <!-- <el-form inline style="width: 100%"> -->
          <!--   <el-form-item>
              <el-input
                v-model="search"
                clearable
                placeholder="请输入系部名"
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
          <!-- <el-form-item>
              <el-button type="primary" @click="handleClick()"
                >新增系部</el-button
              >
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="delClick(selectIds)"
                >批量删除</el-button
              >
            </el-form-item> -->
          <!-- </el-form> -->
        </div>
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
      <el-table-column type="index" label="序号" width="50"> </el-table-column>
      <el-table-column prop="courseName" label="名称" sortable />
      <el-table-column prop="classperiod" label="课时" />

      <el-table-column prop="createTime" width="200" label="创建时间 " />
      <el-table-column prop="updateTime" width="200" label="更新时间 " />
      <el-table-column prop="description" label="课程描述" />

      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            type="text"
            class="table-button"
            @click="handleClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="text"
            class="table-button"
            @click="delClick(scope.row.id)"
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
  </div>
</template>

<script>
import From from "./From.vue";

import * as api from "@/api/course";

export default {
  name: "DepManage",

  components: { From },
  data() {
    return {
      showDialog: false,
      courseMessage: {},
      tableData: [],
      search: "",
      selectIds: [],
    };
  },
  computed: {},
  created() {
    this.getList();
    // console.log("[ config ]-90", api);
  },
  mounted() {},
  methods: {
    getList() {
      api
        .getCourseList({
          ...this.pageInit,
        })
        .then((res) => {
          this.tableData = res.rows;
          this.pageInit.total = res.total;
        });
    },
    handleClick(item) {
      this.courseMessage = item || {};
      this.showDialog = true;
      localStorage.removeItem("speObj");
    },
    delClick(val) {
      val = val.length ? val : [val];
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          api.getCourseRemove(val).then((res) => {
            this.getList();
            localStorage.removeItem("speObj");
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
    handleSelectionChange(val) {
      this.selectIds = val.map((item) => item.id);
    },
  },
};
</script>
<style lang="scss" scoped>
.user-message {
  .header-search {
    // display: flex;
    // justify-content: space-between;
    // align-items: center;
    margin-bottom: 16px;
    .left {
      display: flex;

      flex-direction: row-reverse;
      div {
        margin-left: 15px;
      }
    }
    .right {
      display: flex;
      div {
        margin-left: 12px;
      }
      ::v-deep {
        .el-input-group__append {
          background-color: #fff;
        }
        .table-button {
          color: aqua;
        }
      }
    }
  }
}
</style>
