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
          <div v-for="(item,index) in dataList" :key="index">
            <settled-card :carddata="item"></settled-card>
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
  name: "Settled",
  components: {
    "settled-card": SettledCard,
    [PullRefresh.name]: PullRefresh,
    [List.name]: List
  },
  data() {
    return {
      dataList: [],
      finished: false, //加载是否结束
      isLoading: false, //下拉刷新是否正在加载
      loading: false, //load事件是否在执行是否正在加载
      finishedtxt: "我是有底线的",
      pageNo: 1, //页码
      pageCount: 0 //页数
    };
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
        pageNo: 1
      };
      this.$api
        .post(link.settled, postObj)
        .then(result => {
          if (result.data.code == "200") {
            this.pageCount = result.data.data.pageCount;
            this.pageNo++;
            let dataList = [...result.data.data.transBillMains];
            for (let index = 0; index < dataList.length; index++) {
           
              let data = {
                orderNum: dataList[index].orderID || dataList[index].allBillNo,
                from: dataList[index].startAddr,
                to: dataList[index].endPlace,
                courierNumber: dataList[index].billNo,
                price: dataList[index].transPrice*dataList[index].weight,
                allBillNo: dataList[index].billNo,
                orderDate: dataList[index].modifyDate,
                isPayEnd:dataList[index].isPayEnd
              };
              this.dataList.push(data);
            }
            this.loading = false;

            if (this.dataList.length / 20 >= this.pageCount - 1) {
              this.finished = true;
            }
          }
        })
        .catch(err => {
          this.loading = false;
          this.finished = true;
          this.finishedtxt = "网络错误，暂无数据";
        });
    },
    //下拉刷新
    Refresh() {
      this.$api
        .post(link.settled, {
          pageNo: 1,
          transCorpID: 71536
        })
        .then(res => {
          if (res.data.code == "200") {
            this.pageCount = res.data.data.pageCount;
            let dataList = [...res.data.data.transBillMains];
            this.dataList = [];
            this.pageNo++;
            for (let index = 0; index < dataList.length; index++) {
              let data = {
               orderNum: dataList[index].orderID || dataList[index].allBillNo,
                from: dataList[index].startAddr,
                to: dataList[index].endPlace,
                courierNumber: dataList[index].billNo,
                price: dataList[index].transPrice*dataList[index].weight,
                allBillNo: dataList[index].billNo,
                orderDate: dataList[index].modifyDate
              };
              this.dataList.push(data);
              // this.$set(this.dataList, index, data);
            }
          }
          this.isLoading = false;
          this.finished = true;
        })
        .catch(error => {
          this.isLoading = false;
          this.finishedtxt = "网络错误，暂无数据";
        });
    }
  }
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
</style>