<template>
  <div class="enter-result">
    <el-dialog
      :title="stuForm.entered ? '编辑分数' : '新增分数'"
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
        <el-form-item label="课程名称:" prop="address">
          <el-tag>{{ stuForm.courseName }}</el-tag>
        </el-form-item>
        <el-form-item label="姓名:" prop="name">
          <div>{{ stuForm.stuName }}</div>
        </el-form-item>
        <el-form-item label="学期:" prop="sex">
          <div>{{ stuForm.term ? "下学期" : "上学期" }}</div>
        </el-form-item>
        <el-form-item label="学年:" prop="phone">
          <div>{{ stuForm.year }}</div>
        </el-form-item>
        <el-form-item label="出勤成绩:" prop="attendScore">
          <el-input v-model="stuForm.attendScore"></el-input>(分)
        </el-form-item>
        <el-form-item label="作业成绩:" prop="cardNum">
          <el-input v-model="stuForm.taskScore"></el-input>(分)
        </el-form-item>
        <el-form-item label="实验成绩:" prop="address">
          <el-input v-model="stuForm.experimentScore"></el-input>(分)
        </el-form-item>
        <el-form-item label="其他成绩:" prop="address">
          <el-input v-model="stuForm.otherScore"></el-input>(分)
        </el-form-item>
        <el-form-item label="总成绩:" prop="totalScore">
          <el-input disabled v-model="totalScore"></el-input>(分)
          <span>(自动累加)</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="enterResultClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as api from "@/api/tiny";
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
      stuForm: {
        name: "",
        term: null,
        year: "",
        attendScore: "",
        taskScore: "",
        experimentScore: "",
        otherScore: "",
        // totalScore: "",
        courseName: "",
      },
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
    totalScore() {
      const result =
        parseInt(this.stuForm.attendScore) +
        parseInt(this.stuForm.taskScore) +
        parseInt(this.stuForm.experimentScore) +
        parseInt(this.stuForm.otherScore);
      return result || 0;
    },
  },
  created() {
    console.log("[ this.fromData ]-128", this.fromData);
    this.stuForm = { ...this.fromData };
    console.log("[ this.stuForm ]-124", this.stuForm);
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    enterResultClick() {
      if (this.totalScore > 100)
        return this.$message({
          type: "warning",
          message: `分数不能超过100！`,
        });
      if (
        !(
          this.stuForm.attendScore &&
          this.stuForm.taskScore &&
          this.stuForm.experimentScore &&
          this.stuForm.otherScore
        )
      ) {
        return this.$message({
          type: "warning",
          message: `请填写完整分数`,
        });
      }
      let params = {
        ...this.stuForm,
        totalScore: this.totalScore,
      };
      if (!this.stuForm.entered) {
        api.getTinyAdd(params).then((res) => {
          console.log("[ res ]-136", res);
          this.$parent.getList();
          this.$message({
            type: "success",
            message: `${res.msg}`,
          });
          this.dialogVisible = false;
        });
      } else {
        api.getTinyUpdate(params).then((res) => {
          this.$parent.getList();
          this.$message({
            type: "success",
            message: `${res.msg}`,
          });
          this.dialogVisible = false;
        });
      }
    },
    calculateTotalScore() {},
  },
};
</script>
<style lang="scss" scoped>
.enter-result {
  .demo-stuForm {
    ::v-deep {
      .el-form-item {
        .el-form-item__content {
          .el-input {
            width: 40%;
          }
        }
      }
    }
  }
}
</style>
