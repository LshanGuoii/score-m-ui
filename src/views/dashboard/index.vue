<template>
  <div>
    <Admin />
    <!-- <Teacher /> -->
    <Student />
  </div>
</template>

<script>
import Admin from './Admin.vue'
import Student from './Student.vue'
import Teacher from './Teacher.vue'
export default {
  name: 'Dashboard',
  components: {
    Admin,
    Student,
    Teacher
  },
  data() {
    return {

    }
  },
  created() {
    // this.getData()
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.getChartData()
    // })
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
</style>
