<template>
  <div class="">
    <el-descriptions
      class="margin-top"
      title="无边框列表"
      :column="3"
    >
      <template slot="extra">
        <el-button
          type="primary"
          size="small"
        >操作</el-button>
      </template>
      <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
      <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
      <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
      <el-descriptions-item label="备注">
        <el-tag size="small">学校</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import * as api from "@/api/student";
export default {
  name: 'PersonInfo',

  components: {},
  data() {
    return {
      editOperation: false
    }
  },
  computed: {},
  created() {

  },
  mounted() {

  },
  methods: {

  }
};
</script>
<style lang='scss' scoped>
</style>
