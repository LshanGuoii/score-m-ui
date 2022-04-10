<template>
  <div class="app-container user-message">
    <div>
      <From
        v-if="showDialog"
        v-model="showDialog"
        :fromData="fromProps"
        :depList="depList"
      />
      <div class="header-search">
        <div class="left">
          <el-form inline style="width: 100%">
            <el-form-item label="系部选择">
              <el-select
                v-model="tableFilter.departmentId"
                placeholder="请选择系部"
                clearable
              >
                <el-option
                  v-for="(item, index) in depList"
                  :key="index"
                  :label="item.departmentName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
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
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleClick()"
                >新增专业
              </el-button>
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
      :data="speList"
      border
      style="width: 100%"
      :default-sort="{ prop: 'date', order: 'descending' }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column type="index" label="序号" width="50"> </el-table-column>
      <el-table-column prop="departmentName" label="系部名称" sortable />
      <el-table-column prop="specializeName" label="专业名称" sortable />
      <el-table-column prop="createTime" width="200" label="创建时间 " />
      <el-table-column prop="updateTime" width="200" label="更新时间 " />
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
      <!-- <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            class="table-button"
            @click="handleClick(scope.row)"
            >编辑</el-button
          >

          <el-button
            type="danger"
            size="small"
            class="table-button"
            @click="delClick(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column> -->
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
import * as api from "@/api/config";
import classMixin from "@/mixins/classTree2";

export default {
  name: "DepManage",

  components: { From },
  mixins: [classMixin],
  data() {
    return {
      showDialog: false,
      fromProps: {},
      departmentList: [],
      tableFilter: {
        departmentId: "",
        search: "",
      },
      selectIds: [],
    };
  },
  computed: {},
  created() {
    this.getList();
    this.getDepartmentList();
  },
  mounted() {},
  methods: {
    getList() {
      this.getSpList();
    },
    handleClick(item) {
      this.fromProps = item;
      this.showDialog = true;
    },
    delClick(val) {
      val = val.length ? val : [val];
      console.log("[ val ]-141", val);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          api.getSpRemove(val).then((res) => {
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
    recoverClick(row) {
      console.log("[ row ]-162", row);
      getDepartmentQuit();
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
