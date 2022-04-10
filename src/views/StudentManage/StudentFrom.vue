<template>
  <div class="">
    <el-dialog
      :title="edit ? '编辑学生' : '新增学生'"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-form
        :model="stuForm"
        ref="stuForm"
        label-width="100px"
        class="demo-stuForm"
      >
        <!-- <el-form-item label="学号" prop="stuId">
          <div>{{ stuForm.stuId }}</div>
        </el-form-item> -->
        <el-form-item label="姓名" prop="name">
          <el-input v-model="stuForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="stuForm.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="stuForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="cardNum">
          <el-input v-model="stuForm.cardNum"></el-input>
        </el-form-item>
        <el-form-item label="家庭住址" prop="address">
          <el-input v-model="stuForm.address"></el-input>
        </el-form-item>
        <el-form-item label="班级选择" class="tree-from">
          <ClassTreeFrom v-model="fromFilter" />
        </el-form-item>
        <el-form-item label="入学时间" prop="entranceTime">
          <el-date-picker
            v-model="stuForm.entranceTime"
            type="date"
            value-format="yyyy-MM-dd"
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
import * as api from "@/api/student";
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
      stuForm: {
        name: "",
        sex: null,
        phone: "",
        cardNum: "",
        address: "",
        classId: "",
        entranceTime: "",
      },
      fromFilter: {
        departmentId: "",
        specializeId: "",
        classId: "",
      },
      edit: false,
      // rules: {
      //   name: [
      //     { required: true, message: '请输入活动名称', trigger: 'blur' },
      //     { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //   ],
      //   region: [
      //     { required: true, message: '请选择活动区域', trigger: 'change' }
      //   ],
      //   date1: [
      //     { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
      //   ],
      //   date2: [
      //     { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
      //   ],
      //   type: [
      //     { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
      //   ],
      //   resource: [
      //     { required: true, message: '请选择活动资源', trigger: 'change' }
      //   ],
      //   desc: [
      //     { required: true, message: '请填写活动形式', trigger: 'blur' }
      //   ]
      // }
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
    if (JSON.stringify(this.fromData) !== "{}") {
      console.log("[ this.fromData ]-128", this.fromData);
      this.stuForm = { ...this.fromData };
      console.log("[ this.stuForm ]-124", this.stuForm);
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
    studentAddClick() {
      let params = {
        ...this.stuForm,
        classId: this.fromFilter.classId,
      };
      if (!this.edit) {
        api.getStudentAdd(params).then((res) => {
          console.log("[ res ]-136", res);
          this.$parent.getList();

          this.$message({
            type: "success",
            message: `${res.msg}`,
          });
          this.dialogVisible = false;
        });
      } else {
        api.getStudentUpdate(params).then((res) => {
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
