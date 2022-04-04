<template>
  <div class="app-container user-message">
    <div>
      <ClassTreeFilter @update="tableFilterUpdate" />

      <StudentFrom v-model="showDialog" :data="studentMessage" />
      <div class="header-search">
        <div class="left">
          <el-button type="primary" @click="handleClick()">新增学生</el-button>
        </div>
        <div class="right">
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
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column prop="stuId" label="学号" sortable />
      <el-table-column prop="name" label="姓名" sortable />
      <el-table-column prop="sex" label="性别" />
      <el-table-column prop="departmentName " label="系部" />
      <el-table-column prop="specializeName " label="专业" />
      <el-table-column prop="className" label="班级" />
      <el-table-column prop="entranceDateStart" label="入学时间" />
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
          <el-button type="text" size="small" @click="delClick(scope.row)"
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
import StudentFrom from "./StudentFrom.vue";
import { getStudentList } from "@/api/student";
import ClassTreeFilter from "./../../components/ClassTreeFilter.vue";
export default {
  name: "StudentManage",

  components: { StudentFrom, ClassTreeFilter },
  data() {
    return {
      showDialog: false,
      studentMessage: {},
      stuId: 0,
      tableFilter: {},
      tableData: [],
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

      let params = {
        ...this.pageInit,
        classId: classId,
        departmentId: departmentId,
        specializeId: specializeId,
        stuId: "",
      };
      getStudentList(params).then((res) => {
        console.log("[ res ]-111", res);
        this.tableData = res.rows;
      });
    },
    handleClick(item) {
      console.log("[ item ]-143", item);
      this.studentMessage = item || {};
      console.log("[ this.studentMessage ]-145", this.studentMessage);
      this.showDialog = true;
      console.log("[ this.showDialog ]-147", this.showDialog);
    },
    delClick() {},
    tableFilterUpdate(data) {
      console.log("[ data ]-135", data);
      this.tableFilter = data;
      this.getList();
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
