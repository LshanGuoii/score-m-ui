<template>
  <div class="app-container user-message">
    <div>
      <div class="header-search">
        <div class="left">
          <el-form inline style="width: 100%">
            <el-form-item>
           
            </el-form-item>
            <el-form-item>

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
      <el-table-column prop="departmentName" label="学院名称" sortable />
      <el-table-column prop="createTime" width="200" label="创建时间 " />
      <el-table-column prop="updateTime" width="200" label="更新时间 " />
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
import {
  getDepartmentList,
  getDepartmentDel,
  getDepartmentQuit,
} from "@/api/config";
// import * as api from "@/api/config";

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
    // console.log("[ config ]-90", api);
  },
  mounted() {},
  methods: {
    getList() {
      getDepartmentList({
        ...this.pageInit,
        departmentName: this.search,
      }).then((res) => {
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
          getDepartmentDel(val).then((res) => {
            console.log("[ res ]-94", res);
            this.getList();
            localStorage.removeItem("depObj");
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
  },
};
</script>
<style lang="scss" scoped>
.user-message {
  .header-search {
    display: flex;
    justify-content: space-between;
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
