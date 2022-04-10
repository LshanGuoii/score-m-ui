<template>
  <div class="dashboard-container">
    <div class="situation-head">
      <div class="item-div" @click="hanleNavigation(1)">
        <img class="item-img" src="@/assets/situation-1.png" />
        <div class="item-title">成绩信息</div>
      </div>
      <!-- <div class="item-div" @click="hanleNavigation(2)">
        <img class="item-img" src="@/assets/situation-2.png" />
        <div class="item-title">老师管理</div>
      </div>
      <div class="item-div" @click="hanleNavigation(3)">
        <img class="item-img" src="@/assets/situation-3.png" />
        <div class="item-title">课程管理</div>
      </div>
      <div class="item-div" @click="hanleNavigation(4)">
        <img class="item-img" src="@/assets/situation-4.png" />
        <div class="item-title">院系设置管理</div>
      </div>
      <div class="item-div" @click="hanleNavigation(5)">
        <img class="item-img" src="@/assets/situation-5.png" />
        <div class="item-title">授课管理</div>
      </div> -->
    </div>
    <div class="situation-content">
      <div v-loading="loading1" class="content-exam">
        <div class="content-title" style="margin-bottom: 8px">
          下午好~ {{ userInfo.name }}
        </div>
        <div></div>
      </div>

      <div class="content-right">
        <div v-loading="loading3" class="data-board">
          <div class="content-title">数据看板</div>
          <div class="board-content">
            <div class="board-item">
              <div class="board-info">{{ boardData.tkCount }}</div>
              <div class="board-title">题库题目总数</div>
            </div>
            <div class="board-item">
              <div class="board-info">{{ boardData.tpCount }}</div>
              <div class="board-title">题卷总数</div>
            </div>
            <div class="board-item">
              <div class="board-info">{{ boardData.oeCount }}</div>
              <div class="board-title">在线考试数</div>
            </div>
            <div class="board-item">
              <div class="board-info">{{ boardData.examCount }}</div>
              <div class="board-title">在线考试总次数</div>
            </div>
          </div>
        </div>
        <div v-loading="loading4" class="exam-info">
          <div>
            <span class="content-title">在线考试参考人数</span>
            <span style="font-size: 12px; color: #a0a1a2">（最近1年数据）</span>
          </div>
          <div>
            <barChart
              ref="exam-bar-echart"
              name="exam-bar-echart"
              class="echart"
              :option="optionRevenueBar"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import barChart from "./barChart";
import Admin from "./Admin.vue";
import Student from "./Student.vue";
import Teacher from "./Teacher.vue";

// import * as api from '@/api'

export default {
  name: "Dashboard",
  components: {
    Admin,
    Student,
    Teacher,
    barChart,
  },
  props: {
    userInfo: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      optionRevenueBar: {},
      dataUrl: "",
      examList: [], // 考试列表
      loading1: false, // 考试列表
      loading2: false, // 链接
      loading3: false, // 画板
      loading4: false, // echarts
      boardData: {
        tkCount: 0,
        tpCount: 0,
        oeCount: 0,
        examCount: 0,
      }, // 看板数据
    };
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
    getData() {
      this.loading1 = true;
      this.loading2 = true;
      this.loading3 = true;
      this.loading4 = true;
      api.default.home
        .getHomeExamList()
        .then((res) => {
          this.examList = res;
          this.loading1 = false;
        })
        .catch(() => {
          this.loading1 = false;
        });
      api.default.home
        .getHomeStatistics()
        .then((res) => {
          this.boardData = res;
          this.loading3 = false;
        })
        .catch(() => {
          this.loading3 = false;
        });
      api.default.home
        .getHomeDataUrl()
        .then((res) => {
          this.dataUrl = res;
          this.loading2 = false;
        })
        .catch(() => {
          this.loading2 = false;
        });
    },
    async getChartData() {
      this.loading4 = true;
      api.default.home
        .getHomeRecentExams({})
        .then((res) => {
          this.loading4 = false;
          this.optionRevenueBar = {
            // title: `测试sdas`,
            // serieData: { datas: [], xaxis: [] },
            serieData: res,

            showLegend: false,
            type: "bar",
            // subTitle: '单位（场）',
            color: "#497EFF",
          };
        })
        .catch(() => {
          this.loading4 = false;
        });

      // this.$nextTick(() => {
      //   this.$refs['exam-bar-echart'].resize()
      // })
    },
    hanleNavigation(type) {
      switch (type) {
        case 1:
          this.$router.push({ name: "StudentManage" });
          break;
        case 2:
          this.$router.push({ name: "TeacherManage" });
          break;
        case 3:
          this.$router.push({ name: "CourseManage" });
          break;
        case 4:
          this.$router.push({ name: "DepManage" });

          break;
        case 5:
          this.$router.push({ name: "TeachingManage" });

          break;
        case 6:
          this.$router.push({ name: "LogManage" });

          break;
      }
    },
    // 复制
    onCopy: function (e) {
      this.$message.success("复制成功！");
    },
    onError: function (e) {
      this.$message.error("复制失败！");
    },
  },
};
</script>
<style lang="scss" scoped>
.dashboard-container {
  min-width: 1280px;
  max-width: 1440px;
  margin: 0 auto;
  .situation-head {
    margin-bottom: 10px;
    background-color: #fff;
    border-radius: 3px;
    padding: 44px 0 14px;
    display: flex;
    // justify-content: space-around;
    .item-div {
      cursor: pointer;
      .item-img {
        width: 104px;
        height: 92px;
      }
      .item-title {
        text-align: center;
        font-size: 16px;
        color: #3d3d3e;
        line-height: 10px;
      }
      .item-tip {
        text-align: center;
        font-size: 12px;
        color: #a0a1a2;
        line-height: 30px;
      }
    }
  }
  .situation-content {
    display: flex;
    .content-title {
      font-weight: 600;
      font-size: 16px;
      line-height: 22px;
      height: 22px;
    }
    .content-left {
      width: 35%;
      .content-exam {
        height: 368px;
        background-color: #fff;
        border-radius: 3px;
        padding: 20px 20px 3px 20px;

        .exam-item {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #eff0f2;
          line-height: 20px;
          .exam-name {
            color: #497eff;
            cursor: pointer;
          }
          .exam-time {
            color: #a0a1a2;
          }
        }
      }
      .content-link {
        margin-top: 10px;
        background-color: #fff;
        border-radius: 3px;
        padding: 20px;
        .link-url {
          width: 300px;
          height: 32px;
          background: #f7f8fa;
          border-radius: 3px;
          margin: 20px auto;
          text-align: center;
          line-height: 32px;
        }
      }
    }
    .content-right {
      width: 65%;
      height: 170px;
      .data-board {
        margin-left: 10px;
        background-color: #fff;
        border-radius: 3px;
        padding: 20px;
        .board-content {
          display: flex;
          margin-top: 20px;
          // justify-content: space-between;
          .board-item {
            width: 186px;
            height: 88px;
            background: #ffffff;
            border-radius: 3px;
            border: 1px solid #eff0f2;
            margin-right: 20px;
            .board-info {
              font-size: 20px;
              font-weight: bold;
              color: #497eff;
              line-height: 30px;
              text-align: center;
              padding-top: 16px;
            }
            .board-title {
              text-align: center;
            }
          }
        }
      }
      .exam-info {
        margin-top: 10px;
        margin-left: 10px;
        background-color: #fff;
        border-radius: 3px;
        padding: 20px;
        height: 368px;
        .echart {
          width: 100%;
          height: 300px;

          &.noTab {
            width: 100%;
            height: 360px;
          }
        }
      }
    }
  }
}
</style>
