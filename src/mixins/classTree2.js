
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
        if (sessionStorage.getItem('depObj')) {
          this.depList = JSON.parse(sessionStorage.getItem('depObj'))
          resolve()
        }
        return api.getDepartmentList({
          ...params,
          ...this.pageInit
        }).then((res) => {

          this.depList = res.rows
          this.pageInit.total = res.total;
          sessionStorage.setItem('depObj', JSON.stringify(this.depList))
          resolve()
        });
      })

    },
    getSpList(params) {
      return new Promise(resolve => {
        if (sessionStorage.getItem('speObj')) {
          this.speList = JSON.parse(sessionStorage.getItem('speObj'))
          resolve()
        }
        return api.getSpList({
          ...params,
          ...this.pageInit,
          departmentId: this.tableFilter.departmentId
        }).then((res) => {
          this.speList = res.rows
          this.pageInit.total = res.total;
          sessionStorage.setItem('speObj', JSON.stringify(this.speList))
          resolve()
        });
      })

    },
    getClassList(params) {
      if (sessionStorage.getItem('classObj')) {
        this.classList = JSON.parse(sessionStorage.getItem('classObj'))
      }
      api.getClassList({
        ...params,
        ...this.pageInit,
        departmentId: this.tableFilter.departmentId,
        specializeId: this.tableFilter.specializeId


      }).then((res) => {
        this.classList = res.rows
        this.pageInit.total = res.total;
        sessionStorage.setItem('classObj', JSON.stringify(this.classList))
      });
    }
  }
}
export default classTree
