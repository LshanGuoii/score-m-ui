<template>
  <div class="">
    <el-dialog
      :title="fromData ? '编辑' : '新增'"
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
        <el-form-item label="系部" prop="departmentName">
          <el-input
            v-model="ruleForm.departmentName"
            style="width: 200px"
          ></el-input>
        </el-form-item>
        <el-form-item label="专业" prop="departmentName">
          <el-input
            v-model="ruleForm.departmentName"
            style="width: 200px"
          ></el-input>
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
import { getDepartmentAdd, getdepartmentupdate } from "@/api/config";
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
        departmentName: "",
      },
      type: 0, // 0 新增 1 编辑
      rules: {
        departmentName: [
          { required: true, message: "请输入系部名称", trigger: "blur" },
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
    if (this.fromData) {
      this.type = 1;
      this.ruleForm.departmentName = this.fromData.departmentName;
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
      if (this.type) {
        getDepartmentAdd(this.ruleForm).then((res) => {
          this.$parent.getList();
          console.log("[ res ]-81", res);
          this.$message({
            type: "success",
            message: "新增成功!",
          });
        });
      } else {
        getdepartmentupdate(this.ruleForm).then((res) => {
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
