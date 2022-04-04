<template>
  <div class="">
    <el-dialog
      :title="fromData ? '编辑' : '新增'"
      :visible.sync="dialogVisible"
      width="70%"
    >
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="专业名" prop="specializeName ">
          <el-input
            v-model="ruleForm.specializeName"
            style="width: 200px"
          ></el-input>
        </el-form-item>
        <el-form-item label="系部选择">
          <el-select v-model="ruleForm.departmentId" placeholder="请选择系部">
            <el-option
              v-for="(item, index) in depList"
              :key="index"
              :label="item.departmentName"
              :value="item.id"
            ></el-option>
          </el-select>
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
import * as api from "@/api/config";
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
    depList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      ruleForm: {
        departmentId: "",
        specializeName: "",
        id: "",
      },
      type: 0, // 0 新增 1 编辑
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
    console.log("[ this.fromData ]-80", this.fromData);
    if (this.fromData) {
      console.log("[ this.fromData ]-82", this.fromData);
      this.type = 1;
      this.ruleForm.departmentId = this.fromData.departmentId;
      this.ruleForm.specializeName = this.fromData.specializeName;
      this.ruleForm.id = this.fromData.id;
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
      if (!this.type) {
        api.getSpAdd(this.ruleForm).then((res) => {
          this.$parent.getList();
          this.$message({
            type: "success",
            message: "新增成功!",
          });
        });
      } else {
        api.getSpUpdate(this.ruleForm).then((res) => {
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
