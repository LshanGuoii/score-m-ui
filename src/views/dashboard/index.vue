<template>
  <div>
    <Admin v-if="userInfo.role === 0" :userInfo="userInfo" />
    <Teacher v-else-if="userInfo.role === 1" :userInfo="userInfo" />
    <Student v-else-if="userInfo.role === 2" :userInfo="userInfo" />
  </div>
</template>

<script>
import Admin from "./Admin.vue";
import Student from "./Student.vue";
import Teacher from "./Teacher.vue";
import { mapGetters } from "vuex";
export default {
  name: "Dashboard",
  components: {
    Admin,
    Student,
    Teacher,
  },
  data() {
    return {};
  },
  created() {
    console.log(this.userInfo);
    // this.getData()
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.getChartData()
    // })
  },
  methods: {},
};
</script>
<style lang="scss" scoped></style>
