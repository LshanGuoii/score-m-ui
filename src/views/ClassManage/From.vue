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
        <el-form-item label="班级名" prop="className ">
          <el-input
            v-model="ruleForm.className"
            style="width: 200px"
          ></el-input>
        </el-form-item>
        <div class="from-flex">
          <el-form-item label="系部选择">
            <el-select
              v-model="ruleForm.departmentId"
              placeholder="请选择系部"
              clearable
              @change="selectDepChange"
            >
              <el-option
                v-for="(item, index) in depList"
                :key="index"
                :label="item.departmentName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="专业选择">
            <el-select
              v-model="ruleForm.specializeId"
              placeholder="请选择专业"
              clearable
            >
              <el-option
                v-for="(item, index) in speList"
                :key="index"
                :label="item.specializeName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
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
import classMixin from "@/mixins/classTree";

export default {
  name: "StudentFrom",
  mixins: [classMixin],

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
        departmentId: "",
        specializeId: "",
        className: "",
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
  async created() {
    await this.getDepartmentList();
    await this.getSpList({ departmentId: this.fromData.departmentId });
    if (this.fromData) {
      console.log("[ this.fromData ]-103", this.fromData);
      this.type = 1;
      this.ruleForm.className = this.fromData.className;

      this.ruleForm.departmentId = this.fromData.departmentId;
      this.ruleForm.specializeId = this.fromData.specializeId;
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
      if (!this.type) {
        api.getClassAdd(this.ruleForm).then((res) => {
          this.$parent.getList();
          this.$message({
            type: "success",
            message: "新增成功!",
          });
        });
      } else {
        api.getClassUpdate(this.ruleForm).then((res) => {
          this.$parent.getList();
          this.$message({
            type: "success",
            message: "编辑成功!",
          });
        });
      }

      this.dialogVisible = false;
    },
    selectDepChange(value) {
      this.ruleForm.specializeId = null;

      if (!value) {
        // this.ruleForm.departmentId = null;
        this.speList = [];
      } else {
        this.getSpList({ departmentId: value });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.from-flex {
  display: flex;
}
</style>
