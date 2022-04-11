<template>
  <div class="">
    <el-form
      :model="tableFilter"
      ref="tableFilter"
      label-width="80px"
      class="demo-tableFilter"
    >
      <div class="from-flex">
        <el-form-item label="系部选择">
          <el-select
            v-model="tableFilter.departmentId"
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
            v-model="tableFilter.specializeId"
            placeholder="请选择专业"
            clearable
            @change="selectSpeChange"
          >
            <el-option
              v-for="(item, index) in speList"
              :key="index"
              :label="item.specializeName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级选择">
          <el-select
            v-model="tableFilter.classId"
            placeholder="请选择班级"
            clearable
            @change="selectClassChange"
          >
            <el-option
              v-for="(item, index) in classList"
              :key="index"
              :label="item.className"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
    </el-form>
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
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      tableFilter: {
        departmentId: "",
        specializeId: "",
        classId: "",
      },
    };
  },
  computed: {
    // filterObj: {
    //   get: function () {
    //     return this.value;
    //   },
    //   set: function (value) {
    //     this.$emit("input", value);
    //   },
    // },
  },
  async created() {
    await this.getDepartmentList();
    // await this.getSpList({ departmentId: this.fromData.departmentId });
  },
  mounted() {},
  methods: {
    selectDepChange(value) {
      this.tableFilter.specializeId = null;
      this.tableFilter.classId = null;

      if (!value) {
        this.speList = [];
        this.classList = [];
        this.tableFilter.departmentId = null;
      } else {
        this.getSpList({ departmentId: value });
      }
      this.$emit("update", this.tableFilter);
    },
    selectClassChange(value) {
      this.$emit("update", this.tableFilter);
    },
    selectSpeChange(value) {
      this.tableFilter.classId = null;

      if (!value) {
        this.classList = [];
        this.tableFilter.specializeId = null;
      } else {
        this.getClassList({ specializeId: value });
      }
      this.$emit("update", this.tableFilter);
    },
  },
};
</script>
<style lang="scss" scoped>
.from-flex {
  display: inline-block;
  width: 100%;
  ::v-deep {
    .el-form-item {
      display: inline-block;
      .el-form-item__content {
      }
    }
  }
}
</style>
