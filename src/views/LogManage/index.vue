<template>
  <div class="app-container user-message">
    <div>
      <div class="header-search">
        <div class="left">
          <el-form inline style="width: 100%">
            <el-form-item> </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="exportClick()">导出</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="delClick(selectIds)"
                >批量删除</el-button
              >
            </el-form-item>
          </el-form>
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
      <el-table-column
        prop="operTime"
        width="200"
        label="操作开始时间"
        sortable
      />
      <el-table-column prop="businessType" label="业务类型">
        <template slot-scope="scope">
          <span>{{
            scope.row.businessType
              ? scope.row.businessType === 1
                ? "新增"
                : "修改"
              : "其他"
          }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="businessTypes" width="200" label="业务类型集合">
        <template slot-scope="scope">
          <span>{{
            scope.row.businessType
              ? scope.row.businessType === 1
                ? "新增"
                : "修改"
              : "其他"
          }}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column prop="endTime" width="200" label="操作结束时间" /> -->
      <el-table-column prop="jsonResult" width="200" label="返回参数" />

      <el-table-column prop="operName" width="200" label="操作人员" />
      <el-table-column prop="status" width="200" label="操作状态">
        <template slot-scope="scope">
          <span>{{ scope.row.status ? "异常" : "正常" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="title" width="200" label="模块标题" />

      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
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
import * as api from "@/api/log";
import { blobDownload } from "@/utils";
export default {
  name: "DepManage",

  components: { From },
  data() {
    return {
      showDialog: false,
      studentMessage: {},
      tableData: [],
      search: "",
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
      api
        .getOperlogList({
          ...this.pageInit,
        })
        .then((res) => {
          this.tableData = res.rows;
          this.pageInit.total = res.total;
          console.log("res", this.tableData);
        });
    },
    handleClick(item) {
      this.studentMessage = item;
      this.showDialog = true;
      localStorage.removeItem("depObj");
    },
    delClick(val) {
      val = val.length ? val : [val];
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          api.getOperlogRemove(val).then((res) => {
            console.log("[ res ]-94", res);
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

    handleSelectionChange(val) {
      this.selectIds = val.map((item) => item.id);
      console.log("[ this.selectIds ]-178", this.selectIds);
    },
    exportClick() {
      let params = {
        ids: this.selectIds,
        isExport: true,
      };
      api.getOperlogExport(params).then((res) => {
        console.log("[ res ]-165", res);
        blobDownload(res.data, "日志");
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.user-message {
  .header-search {
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;

    align-items: center;
    margin-bottom: 16px;
    .left {
      display: flex;
      justify-content: center;
      align-items: center;
      div {
        margin-right: 15px;
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
