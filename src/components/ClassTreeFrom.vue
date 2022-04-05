<template>
  <div class="class-tree-from">
    <el-form :model="fromFilter" ref="fromFilter" class="from-main">
      <el-form-item>
        <el-select
          v-model="fromFilter.departmentId"
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
      <el-form-item>
        <el-select
          v-model="fromFilter.specializeId"
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
      <el-form-item>
        <el-select
          v-model="fromFilter.classId"
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
      // fromFilter: {
      //   departmentId: "",
      //   specializeId: "",
      //   classId: "",
      // },
    };
  },
  computed: {
    fromFilter: {
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
    if (this.fromFilter.departmentId) {
      await this.getSpList({ departmentId: this.fromFilter.departmentId });
    }
    if (this.fromFilter.specializeId) {
      this.getClassList({ specializeId: this.fromFilter.specializeId });
    }
  },
  mounted() {},
  methods: {
    selectDepChange(value) {
      console.log("[ value ]-94", value);
      this.fromFilter.specializeId = null;
      this.fromFilter.classId = null;

      if (!value) {
        this.speList = [];
        this.classList = [];
      } else {
        this.getSpList({ departmentId: value });
      }
      this.$emit("input", this.fromFilter);
    },
    selectClassChange() {
      this.$emit("input", this.fromFilter);
    },
    selectSpeChange(value) {
      this.fromFilter.classId = null;
      if (!value) {
        this.classList = [];
      } else {
        this.getClassList({ specializeId: value });
      }
      this.$emit("input", this.fromFilter);
    },
  },
};
</script>
<style lang="scss" scoped>
.class-tree-from {
  .from-main {
    div {
      margin-bottom: 10px;
    }
  }
}
</style>
