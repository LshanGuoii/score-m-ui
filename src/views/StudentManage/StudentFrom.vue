<template>
  <div class="">
    <el-dialog title="提示" :visible.sync="dialogVisible" width="70%">
      <el-form
        :model="stuForm"
        ref="stuForm"
        label-width="100px"
        class="demo-stuForm"
      >
        <el-form-item label="学号" prop="stuId">
          <el-descriptions-item label="用户名">{{
            stuForm.stuId
          }}</el-descriptions-item>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="stuForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="stuForm.sex">
            <el-radio label="男" value="1" />
            <el-radio label="女" value="0" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <ClassTreeFilter />
        </el-form-item>
        <el-form-item label="活动区域" prop="region">
          <el-select v-model="stuForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生时间" required>
          <el-form-item prop="date1">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="stuForm.date1"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="出生时间" required>
          <el-form-item prop="date1">
            <el-date-picker
              type="date"
              placeholder="入学年份"
              v-model="stuForm.date1"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="即时配送" prop="delivery">
          <el-switch v-model="stuForm.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="活动性质" prop="type">
          <el-form-item label="身份证号" prop="name">
            <el-input v-model="stuForm.name"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="特殊资源" prop="resource">
          <el-radio-group v-model="stuForm.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式" prop="desc">
          <el-input type="textarea" v-model="stuForm.desc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ClassTreeFilter from "./../../components/ClassTreeFilter.vue";

export default {
  name: "StudentFrom",

  components: { ClassTreeFilter },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      stuForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
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
  },
  created() {},
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
  },
};
</script>
<style lang="scss" scoped></style>
