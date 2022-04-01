const pagination = {
  data() {
    return {
      pageInit: {
        total: 0,
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      // this.pageInit.pageNum = Math.ceil(
      //   (this.pageInit.pageNum * this.pageInit.pageSize) / val
      // ) // 当切换分页时，当前页需重新定位 有点问题
      this.pageInit.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.pageInit.pageNum = val
      this.getList()
    }
  }
}
export default pagination
