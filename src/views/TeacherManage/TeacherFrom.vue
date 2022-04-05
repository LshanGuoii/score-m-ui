<template>
  <div class="">
    <el-dialog
      :title="edit ? '编辑教师' : '新增教师'"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-form
        :model="teaForm"
        ref="teaForm"
        label-width="100px"
        class="demo-teaForm"
      >
        <!-- <el-form-item label="学号" prop="stuId">
          <div>{{ teaForm.stuId }}</div>
        </el-form-item> -->
        <el-form-item label="姓名" prop="name">
          <el-input v-model="teaForm.teacherName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="teaForm.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话" prop="telphone">
          <el-input v-model="teaForm.telphone"></el-input>
        </el-form-item>

        <el-form-item label="所属系部" prop="address">
          <el-select
            v-model="teaForm.teacherDepartmentId"
            placeholder="请选择系部"
          >
            <el-option
              v-for="(item, index) in depList"
              :key="index"
              :label="item.departmentName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="入学时间" prop="admissionTime">
          <el-date-picker
            v-model="teaForm.admissionTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="teacherAddClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ClassTreeFrom from "./../../components/ClassTreeFrom.vue";
import * as api from "@/api/teacher";
import classMixin from "@/mixins/classTree";

export default {
  name: "StudentFrom",
  mixins: [classMixin],

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
      teaForm: {
        teacherName: "罗赏",
        sex: null,
        telphone: "123131231",
        teacherDepartmentId: "",
        admissionTime: "",
      },

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
    this.getDepartmentList();
    if (JSON.stringify(this.fromData) !== "{}") {
      console.log("[ this.fromData ]-128", this.fromData);
      this.teaForm = { ...this.fromData };
      console.log("[ this.teaForm ]-124", this.teaForm);
      this.edit = true;
      // this.ruleForm.departmentId = this.fromData.departmentId;
      // this.ruleForm.specializeName = this.fromData.specializeName;
      // this.ruleForm.id = this.fromData.id;
    }
  },
  mounted() {
    // const { departmentId, specializeId, classId } = this.fromData;
    // this.fromFilter.departmentId = parseInt(departmentId) || "";
    // this.fromFilter.specializeId = parseInt(specializeId) || "";
    // this.fromFilter.classId = parseInt(classId) || "";
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    teacherAddClick() {
      let params = {
        ...this.teaForm,
      };
      if (!this.edit) {
        console.log("[ params ]-143", params);
        api.getTeacherAdd(params).then((res) => {
          console.log("[ res ]-136", res);
          this.$parent.getList();
          this.$message({
            type: "success",
            message: `${res.msg}`,
          });
          this.dialogVisible = false;
        });
      } else {
        api.getTeacherUpdate(params).then((res) => {
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
