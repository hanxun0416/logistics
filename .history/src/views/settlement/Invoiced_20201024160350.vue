<template>
  <div class="main">
    <div class="main-mid">
      <van-pull-refresh v-model="isLoading" @refresh="Refresh()">
        <van-list
          v-model="loading"
          :finished="finished"
          :finished-text="finishedtxt"
          @load="onLoad()"
        >
          <div v-for="(item, index) in dataList" :key="index">
            <settled-card :carddata="item" :isPay="$route.query.data"></settled-card>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import SettledCard from "../../components/settlement/SettledCard";
import link from "../../uitls/js/link";
import { PullRefresh, List } from "vant";
export default {
  name: "Invoiced",
  components: {
    "settled-card": SettledCard,
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
  },
  // props:['isPay0'],
  data() {
    return {
      dataList: [],
      finished: false, //加载是否结束
      isLoading: false, //下拉刷新是否正在加载
      loading: false, //load事件是否在执行是否正在加载
      finishedtxt: "我是有底线的",
      pageNo: 1, //页码
      pageCount: 0, //页数,
    };
  },
   created() {
    console.log(this.$route.query.data);
  },
  methods: {
    onLoad() {
      if (
        this.isLoading ||
        this.finished ||
        (this.dataList.length < 20 && this.dataList.length > 0)
      ) {
        this.finished = true;
        this.loading = false;
        return;
      }
      this.loading = true;
      let postObj = {
        transCorpID: 71536,
        pageNo: 1,
      };
      this.$api
        .post(link.invoiced, postObj)
        .then((result) => {
          console.log('数据',result);
          if (result.data.code == "200") {
            this.pageCount = result.data.data.pageNo;
            this.pageNo++;
            let dataList = [...result.data.data.applyPayMains];
            for (let index = 0; index < dataList.length; index++) {
              let data = {
                orderNum: dataList[index].orderID,
                from: dataList[index].startAddr,
                to: dataList[index].endPlace,
                courierNumber: dataList[index].billNo,
                price: dataList[index].applyMoney,
                allBillNo: dataList[index].allBillNo,
                orderDate: dataList[index].modifyDate,
              };
              this.dataList.push(data);
            }
            this.loading = false;
            if (this.dataList.length / 20 >= this.pageCount - 1) {
              this.finished = true;
            }
          }
        })
        .catch((err) => {
          this.loading = false;
          this.finished = true;
          this.finishedtxt = "网络错误，暂无数据";
        });
    },
    //下拉刷新
    Refresh() {
      this.finished = true;
      this.$api
        .post(link.invoiced, {
          pageNo: 1,
          transCorpID: 71536,
        })
        .then((res) => {
          console.log(res);
          if (res.data.code == "200") {
            this.checked = false;
            this.pageCount = res.data.data.pageNo;
            let dataList = [...res.data.data.applyPayMains];
            this.dataList = [];
            this.pageNo++;
            for (let index = 0; index < dataList.length; index++) {
              let data = {
                orderNum: dataList[index].orderID,
                from: dataList[index].startAddr,
                to: dataList[index].endPlace,
                courierNumber: dataList[index].billNo,
                price: dataList[index].applyMoney,
                allBillNo: dataList[index].allBillNo,
                orderDate: dataList[index].modifyDate,
              };
              this.dataList.push(data);
              // this.$set(this.dataList, index, data);
            }
            //  this.isLoading = false;
            this.isLoading = false;
          }
        })
        .catch((error) => {
          this.isLoading = false;
          this.finishedtxt = "网络错误，暂无数据";
        });
    },
  },
};
</script>
<style lang="less" scoped>
.main {
  height: auto;
  &-mid {
    padding-top: 15px;
    /deep/.van-pull-refresh__track {
      min-height: e("calc(100vh - 90px)");
    }
  }
}

.pm {
  position: fixed;
  width: 100%;
  height: 100%;
  opacity: 0.5;
}
</style>