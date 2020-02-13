<template>
  <div class="main">
    <div class="main-head">
      <img @click="toMine()" src="../../assets/offer/wode.png" />
    </div>

    <div class="main-mid">
      <van-tabs v-model="active" @change="tabchange" swipeable animated sticky>
        <van-tab title="待报价">
          <van-pull-refresh v-model="isLoading" @refresh="Refresh(0)">
            <van-list
              v-model="loading"
              :finished="finished[0]"
              :finished-text="finishedtxt"
              @load="onLoad(0)"
            >
              <div v-for="(item,index) in dataList[0] " :key="index">
                <offer-card :carddata="item" :active="false"></offer-card>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="已报价">
          <van-pull-refresh v-model="isLoading" @refresh="Refresh(1)">
            <van-list
              v-model="loading"
              :finished="finished[1]"
              :finished-text="finishedtxt"
              @load="onLoad(1)"
            >
              <div v-for="(item,index) in  dataList[1]" :key="index">
                <offer-card :carddata="item" :active="true"></offer-card>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import { Tab, Tabs, PullRefresh, Divider, List, Sticky } from "vant";
import OfferCard from "../../components/offer/OfferCard";
import link from "../../uitls/js/link";
export default {
  name: "offer",
  data() {
    return {
      active: 0, //tab被激活的哪一个
      isLoading: false, //下拉刷新是否正在加载
      finishedtxt: "我是有底线的",
      dataList: [[], []], //数据列表
      finished: [false, false], //上啦加载是否加载结束
      loading: false, //上啦加载是否正在加载
      page: [{ pageNo: 1, pageCount: 0 }, { pageNo: 1, pageCount: 0 }] //分页相关（页码与总页数）
    };
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [PullRefresh.name]: PullRefresh,
    [Divider.name]: Divider,
    "offer-card": OfferCard,
    [List.name]: List,
    [Sticky.name]: Sticky
  },
  activated() {
    if (this.$route.params.active || this.$route.params.active == 0) {
      this.Refresh(this.$route.params.active);
    }
  },
  methods: {
    //下拉刷新
    Refresh(index) {
      this.$api
        .post(link.getOffer, {
          permit: index,
          transCorpID: 71536
        })
        .then(res => {
          if (res.data.code == "200") {
            // this.pageCount = res.data.data.pageCount;
            this.$set(this.dataList, index, [...res.data.data.transBillMains]);
            // this.dataList[index] = [...res.data.data.transBillMains];
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
    onLoad(i) {
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
        permit: i,
        transCorpID: 71536,
        pageNo: this.page[i].pageNo
      };
      this.$api
        .post(link.getOffer, postObj)
        .then(res => {
          if (res.data.code == "200") {
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
    //到"我的"页面
    toMine() {
      this.$router.push("/mine");
    }
  }
};
</script>
<style lang="less" scoped>
.main {
  &-head {
    position: relative;
    width: 100%;
    height: 136px;
    .bgconfig(url("../../assets/offer/banner.png"), no-repeat, 100% 100%);
    img {
      width: 32px;
      height: auto;
      position: absolute;
      top: 10px;
      right: 10.5px;
    }
  }
  &-mid {
    width: 100%;
    padding-bottom: 65px;
    /deep/.van-tabs__nav {
      padding-left: 10vw;
      padding-right: 10vw;
    }
    /deep/.van-pull-refresh__track {
      min-height: e("calc(100vh - 260px)");
    }
    /deep/.van-tabs__line {
      background-color: rgba(45, 130, 255, 1);
    }
    /deep/.van-tab {
      .font();
      line-height: 40px;
    }
    /deep/.van-tab--active {
      color: rgba(45, 130, 255, 1);
    }
  }
}
</style>