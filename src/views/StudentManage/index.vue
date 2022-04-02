<template>
  <div class="app-container user-message">
    <div>
      <el-button
        type="text"
        @click="handleClick()"
      >Dialog</el-button>
      <StudentFrom
        v-model="showDialog"
        :data="studentMessage"
      />
      <div class="header-search">
        <div class="left">111</div>
        <div class="right">
          <el-input
            v-model="key"
            clearable
            placeholder="请输入学号"
            style="width: 340px"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getList()"
            />
          </el-input>
        </div>
      </div>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column
        prop="date"
        label="学号"
        sortable
      />
      <el-table-column
        prop="name"
        label="姓名"
        sortable
      />
      <el-table-column
        prop="address"
        label="性别"
      />

      <el-table-column
        prop="address"
        label="电话"
      />

      <el-table-column
        prop="address"
        label="入学时间"
      />
      <el-table-column
        prop="address"
        label="院系"
      />
      <el-table-column
        prop="address"
        label="创建时间 "
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <!-- <el-button
            @click="handleClick(scope.row,'view')"
            type="text"
            size="small"
          >查看</el-button> -->
          <el-button
            type="text"
            size="small"
            @click="handleClick(scope.row)"
          >编辑</el-button>
          <el-button
            type="text"
            size="small"
            @click="delClick(scope.row)"
          >删除</el-button>
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
import StudentFrom from "./StudentFrom.vue";
export default {
  name: "StudentManage",

  components: { StudentFrom },
  data() {
    return {
      showDialog: false,
      studentMessage: {},
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ]
    }
  },
  computed: {},
  created() { },
  mounted() { },
  methods: {
    handleClick(item) {
      console.log('[ item ]-143', item);
      this.studentMessage = item || {}
      console.log('[ this.studentMessage ]-145', this.studentMessage);
      this.showDialog = true
      console.log('[ this.showDialog ]-147', this.showDialog);
    },
    delClick() {

    }
  }
}
</script>
<style lang="scss" scoped>
.user-message {
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
