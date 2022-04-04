
import * as api from "@/api/config";


const classTree = {
  data() {
    return {
      depList: [],
      speList: [],
      classList: [],
      speShow: false,
      classShow: false
    }
  },
  methods: {
    getDepartmentList(params) {
      return new Promise(resolve => {
        return api.getDepartmentList({
          pageSize: 10000,
          ...params
        }).then((res) => {
          this.depList = res.rows
          resolve()
        });
      })

    },
    getSpList(params) {
      return new Promise(resolve => {
        return api.getSpList({
          pageSize: 10000,
          ...params
        }).then((res) => {
          this.speList = res.rows
          resolve()
        });
      })

    },
    getClassList(params) {
      api.getClassList({
        pageSize: 10000,
        ...params
      }).then((res) => {
        this.classList = res.rows
      });
    }
  }
}
export default classTree
