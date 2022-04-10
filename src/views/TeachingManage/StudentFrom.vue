<template>
  <div class="">
    <el-dialog
      :title="edit ? '编辑授课' : '新增授课'"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-form
        :model="teachinigFrom"
        ref="teachinigFrom"
        label-width="100px"
        v-loading="loading"
        class="demo-teachinigFrom"
      >
        <el-form-item label="课程选择" prop="courseId">
          <el-select
            v-model="teachinigFrom.courseId"
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="item in courseList"
              :key="item.id"
              :label="item.courseName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任课教师选择" prop="name">
          <el-select
            v-model="teachinigFrom.teacherId"
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="item in teacherList"
              :key="item.id"
              :label="item.teacherName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学期" prop="term">
          <el-radio-group v-model="teachinigFrom.term">
            <el-radio :label="0">上学期</el-radio>
            <el-radio :label="1">下学期</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="班级选择" class="tree-from">
          <ClassTreeFrom v-model="fromFilter" />
        </el-form-item>
        <el-form-item label="学年" prop="year">
          <el-date-picker
            v-model="teachinigFrom.year"
            type="year"
            value-format="yyyy"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="studentAddClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ClassTreeFrom from "./../../components/ClassTreeFrom.vue";
import * as api from "@/api/teaching";
import { getTeacherList } from "@/api/teacher";
import { getCourseList } from "@/api/course";

export default {
  name: "StudentFrom",

  components: { ClassTreeFrom },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    fromData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      teachinigFrom: {
        teacherId: "",
        term: "",
        year: "",
        courseId: "",
      },
      fromFilter: {
        departmentId: "",
        specializeId: "",
        classId: "",
      },
      courseList: [],
      teacherList: [],
      edit: false,
    };
  },
  computed: {
    dialogVisible: {
      get: function () {
        return this.value;
      },
      set: function (value) {
        this.$emit("input", value);
      },
    },
  },
  created() {
    // this.getTeachList();
    // this.getCourseList();
    Promise.allSettled([this.getTeachList(), this.getCourseList()])
      .then((res) => {
        console.log("[ res ]-124", res);
        this.loading = false;
        console.log("[ this.loading ]-128", this.loading);
      })
      .catch(() => {
        this.loading = false;
      });
    if (JSON.stringify(this.fromData) !== "{}") {
      this.teachinigFrom = { ...this.fromData };
      console.log("[ this.teachinigFrom ]-124", this.teachinigFrom);
      this.edit = true;
      // this.ruleForm.departmentId = this.fromData.departmentId;
      // this.ruleForm.specializeName = this.fromData.specializeName;
      // this.ruleForm.id = this.fromData.id;
    }
  },
  mounted() {
    const { departmentId, specializeId, classId } = this.fromData;
    this.fromFilter.departmentId = parseInt(departmentId) || "";
    this.fromFilter.specializeId = parseInt(specializeId) || "";
    this.fromFilter.classId = parseInt(classId) || "";
  },
  methods: {
    getTeachList() {
      this.loading = true;

      return new Promise((resolve) => {
        getTeacherList({ pageSize: 10000 }).then((res) => {
          console.log("[ res ]-111", res);
          this.teacherList = res.rows;
          resolve();
        });
      });
    },
    getCourseList() {
      return new Promise((resolve) => {
        getCourseList({ pageSize: 10000 }).then((res) => {
          this.loading = false;
          this.courseList = res.rows;
          resolve();
        });
      });
    },
    studentAddClick() {
      let params = {
        ...this.teachinigFrom,
        classId: this.fromFilter.classId,
      };
      if (!this.edit) {
        api.getTeacherYoungAdd(params).then((res) => {
          console.log("[ res ]-136", res);
          this.$parent.getList();

          this.$message({
            type: "success",
            message: `${res.msg}`,
          });
          this.dialogVisible = false;
        });
      } else {
        api.getTeacherYoungUpdate(params).then((res) => {
          this.$parent.getList();

          this.$message({
            type: "success",
            message: `${res.msg}`,
          });
          this.dialogVisible = false;
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.tree-from {
  ::v-deep {
    el-form-item__content {
      margin-left: 0;
    }
  }
}
</style>
