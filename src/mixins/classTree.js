
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
          pageSize: 10000,
          ...params
        }).then((res) => {

          this.depList = res.rows
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
          pageSize: 10000,
          ...params
        }).then((res) => {
          this.speList = res.rows
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
        pageSize: 10000,
        ...params
      }).then((res) => {
        this.classList = res.rows
        sessionStorage.setItem('classObj', JSON.stringify(this.classList))
      });
    }
  }
}
export default classTree
