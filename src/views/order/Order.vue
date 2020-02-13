<template>
  <div class="main">
    <div class="main-head">
      <img @click="toMine()" src="../../assets/offer/wode.png" />
      <transition name="slide-fade">
        <img
          v-if="showUp"
          @click="backTop()"
          src="../../assets/order/up.png"
          style="position:fixed;top:70vh;right:2px;width:30px;height:30px"
        />
      </transition>

      <van-tabs v-model="active" @change="tabchange" swipeable animated>
        <van-tab title="全部">
          <van-pull-refresh v-model="isLoading" @refresh="Refresh(0)">
            <van-list
              v-model="loading"
              :finished="finished[0]"
              :finished-text="finishedtxt"
              @load="onLoad(0)"
            >
              <div v-for="(item,index) in  dataList[0]" :key="index">
                <order-card @cardClick="cardClick" :carddata="item"></order-card>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="待派车">
          <van-pull-refresh v-model="isLoading" @refresh="Refresh(1)">
            <van-list
              v-model="loading"
              :finished="finished[1]"
              :finished-text="finishedtxt"
              @load="onLoad(1)"
            >
              <div v-for="(item,index) in  dataList[1]" :key="index">
                <order-card @cardClick="cardClick" :carddata="item"></order-card>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="待提货">
          <van-pull-refresh v-model="isLoading" @refresh="Refresh(2)">
            <van-list
              v-model="loading"
              :finished="finished[2]"
              :finished-text="finishedtxt"
              @load="onLoad(2)"
            >
              <div v-for="(item,index) in  dataList[2]" :key="index">
                <order-card @cardClick="cardClick" :carddata="item"></order-card>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="待传单据">
          <van-pull-refresh v-model="isLoading" @refresh="Refresh(3)">
            <van-list
              v-model="loading"
              :finished="finished[3]"
              :finished-text="finishedtxt"
              @load="onLoad(3)"
            >
              <div v-for="(item,index) in  dataList[3]" :key="index">
                <order-card @cardClick="cardClick" :carddata="item"></order-card>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="已签收">
          <van-pull-refresh v-model="isLoading" @refresh="Refresh(4)">
            <van-list
              v-model="loading"
              :finished="finished[4]"
              :finished-text="finishedtxt"
              @load="onLoad(4)"
            >
              <div v-for="(item,index) in  dataList[4]" :key="index">
               
                <order-card @cardClick="cardClick" :carddata="item"></order-card>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import { Tab, Tabs, PullRefresh, Divider, List, Cell } from "vant";
import link from "../../uitls/js/link";
import OrderCard from "../../components/order/OrderCard";
import OfferCard from "../../components/offer/OfferCard";
export default {
  name: "Order",
  data() {
    return {
      active: 0,
      isLoading: false, //下拉刷新是否正在加载
      finishedtxt: "我是有底线的",
      dataList: [[], [], [], [], []], //数据列表
      finished: [false, false, false, false, false], //上啦加载是否加载结束
      loading: false, //上啦加载是否正在加载
      up: false, //是否显示UP按钮
      page: [
        { pageNo: 1, pageCount: 0 },
        { pageNo: 1, pageCount: 0 },
        { pageNo: 1, pageCount: 0 },
        { pageNo: 1, pageCount: 0 },
        { pageNo: 1, pageCount: 0 }
      ] //分页相关（页码与总页数）
    };
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [PullRefresh.name]: PullRefresh,
    [Divider.name]: Divider,
    [List.name]: List,
    [Cell.name]: Cell,
    "order-card": OrderCard,
    "offer-card": OfferCard
  },
  mounted() {
    window.addEventListener("scroll", this.orderScroll);
  },
  activated() {
    if (this.$route.params.active || this.$route.params.active == 0) {
      this.Refresh(this.$route.params.active);
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.orderScroll);
  },
  computed: {
    showUp: function() {
      if (this.active == 0 && this.up) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    //返回顶部
    backTop() {
      document.documentElement.scrollTop = document.body.scrollTop = 0;
    },
    //下拉刷新
    Refresh(index) {
      this.$api
        .post(link.getOrder, {
          pageNo: 1,
          transCorpID: 71536,
          orderTransType: index
        })
        .then(res => {
          console.log(res)
          if (res.data.code == "200") {
            this.$set(this.dataList, index, [...res.data.data.transBillMains]);
            this.isLoading = false;
            this.finished[index] = true;
          }
        })
        .catch(error => {
          this.isLoading = false;
          this.finishedtxt = "网络错误，暂无数据";
        });
    },
    //tab切换
    tabchange(index, title) {
      if (
        this.finished[index] &&
        (this.page[index].pageCount == 0 ||
          this.page[index].pageCount > this.page[index].pageNo)
      ) {
        this.finished[index] = false;
      }

      for (let i = 0; i < this.finished.length; i++) {
        if (i != index) {
          this.finished[i] = true;
        }
      }

      this.loading = false;
      this.isLoading = false;
    },
    //待报价上拉加载
    onLoad(i, order) {
      if (
        this.isLoading ||
        this.finished[i] ||
        (this.dataList[i].length < 20 && this.dataList[i].length > 0)
      ) {
        this.finished[i] = true;
        this.loading = false;
        return;
      }
      this.loading = true;
      let postObj = {
        orderTransType: i,
        transCorpID: 71536,
        pageNo: this.page[i].pageNo
      };
      this.$api
        .post(link.getOrder, postObj)
        .then(res => {
          if (res.data.code == "200") {
            console.log(res)
            this.page[i].pageCount = res.data.data.pageCount;
            this.page[i].pageNo++;
            for (
              let index = 0;
              index < res.data.data.transBillMains.length;
              index++
            ) {
              this.dataList[i].push(res.data.data.transBillMains[index]);
            }
            this.loading = false;
            if (this.dataList[i].length / 20 >= this.page[i].pageCount - 1) {
              this.finished[i] = true;
            }
          }
        })
        .catch(error => {
          this.loading = false;
          this.finished[i] = true;
          this.finishedtxt = "网络错误，暂无数据";
        });
    },
    //卡片被点击事件
    cardClick(type, id) {
      switch (type) {
        case 1:
          this.$router.push({
            path: "/car",
            query: {
              id: id
            }
          });
          break;
        case 2:
          this.$router.push({
            path: "/take",
            query: {
              id: id
            }
          });
          break;
        case 3:
          this.$router.push({
            path: "/bill",
            query: {
              id: id
            }
          });
          break;
        case 4:
          this.$router.push({
            path: "/signed",
            query: {
              id: id
            }
          });
          break;
        default:
          break;
      }
    },
    //到"我的"页面
    toMine() {
      this.$router.push("/mine");
    },
    //滚动条监听事件
    orderScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop >= 1000) {
        this.up = true;
      } else {
        this.up = false;
      }
    }
  },
 
};
</script>
<style lang="less" scoped>
.main {
  &-head {
    padding-bottom: 65px;
    /deep/.van-tabs__wrap {
      width: 90%;
      margin: 0;
      padding-right: 10%;
      background-color: @btn-blue;
    }
    /deep/.van-tabs__nav {
      background-color: @btn-blue;
    }
    /deep/.van-pull-refresh__track {
      min-height: e("calc(100vh - 125px)");
    }
    .van-tabs /deep/ .van-tabs__wrap {
      top: 0;
      position: fixed;
      z-index: 2;
    }
    /deep/.van-tabs__content {
      padding-top: 44px;
      z-index: -1;
    }
    img {
      width: 26px;
      height: auto;
      position: fixed;
      top: 8px;
      right: 6px;
      z-index: 9999;
    }
  }
  /* 进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all 0.3s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
}
</style>