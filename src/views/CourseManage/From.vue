<template>
  <div class="">
    <el-dialog
      :title="edit ? '编辑' : '新增'"
      :visible.sync="dialogVisible"
      width="70%"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="课程名称" prop="departmentName">
          <el-input
            v-model="ruleForm.courseName"
            style="width: 200px"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="ruleForm.description"></el-input>
        </el-form-item>
        <el-form-item label="课时">
          <el-input-number
            v-model="ruleForm.classperiod"
            :min="1"
            :max="100"
            label="请输入课时"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="学分">
          <el-input-number
            v-model="ruleForm.credits"
            :min="1"
            :max="50"
            label="请输入学分"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as api from "@/api/course";
export default {
  name: "StudentFrom",
  components: {},
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
      ruleForm: {
        courseName: "",
        description: "",
        classperiod: 0,
        credits: 0,
      },
      edit: false,
      rules: {
        departmentName: [
          // { required: true, message: "请输入系部名称", trigger: "blur" },
        ],
      },
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
      // this.ruleForm.departmentName = this.fromData.departmentName;
      this.edit = true;
      this.ruleForm = { ...this.fromData };
    }
  },
  mounted() {},
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
    handleClick() {
      console.log("[ handleClick ]-78");
      if (!this.edit) {
        api.getCourseAdd(this.ruleForm).then((res) => {
          this.$parent.getList();
          console.log("[ res ]-81", res);
          this.$message({
            type: "success",
            message: "新增成功!",
          });
        });
      } else {
        api.getCourseUpdate(this.ruleForm).then((res) => {
          console.log("[ res ]-81", res);
          this.$parent.getList();
          this.$message({
            type: "success",
            message: "编辑成功!",
          });
        });
      }

      this.dialogVisible = false;
    },
  },
};
</script>
<style lang="scss" scoped></style>
