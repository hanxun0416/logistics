<template>
  <div class="main">
    <div class="main-mid">
      <van-pull-refresh v-model="isLoading" @refresh="Refresh()">
        <van-list
          v-model="loading"
          :finished="finished"
          :finished-text="finishedtxt"
          @load="getData()"
        >
          <div v-for="(item,index) in dataList" :key="index">
            <settle-card @cardClick="cardClick" :carddata="item" :checkable="submitLoading"></settle-card>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <van-submit-bar
      :price="price"
      button-text="上传发票"
      label="已选金额："
      @submit="submitClick()"
      :loading="submitLoading"
    >
      <van-checkbox
        :disabled="submitLoading"
        @click="allClick"
        style="margin-left:12px"
        v-model="checked"
      >20条</van-checkbox>
    </van-submit-bar>
  </div>
</template>
<script>
import SettleCard from "../../components/settlement/SettleCard";
import { SubmitBar, Checkbox, Toast, PullRefresh, Divider, List } from "vant";
import link from "../../uitls/js/link";
export default {
  name: "Uninvoice",
  components: {
    [Checkbox.name]: Checkbox,
    [SubmitBar.name]: SubmitBar,
    "settle-card": SettleCard,
    [PullRefresh.name]: PullRefresh,
    [Divider.name]: Divider,
    [List.name]: List
  },
  data() {
    return {
      dataList: [], //待开票订单列表
      checked: false, //全选按钮是否选中
      submitLoading: false, //提交按钮是否loading
      finished: false, //加载是否结束
      isLoading: false, //下拉刷新是否正在加载
      loading: false, //load事件是否在执行是否正在加载
      finishedtxt: "我是有底线的",
      pageNo: 1, //页码
      pageCount: 0, //页数
      submitList: [] //提交开票订单的的index
    };
  },
  computed: {
    //总金额
    price: function() {
      let price = 0;
      for (let index = 0; index < this.dataList.length; index++) {
        if (this.dataList[index].checked) {
          price += this.dataList[index].price * 100;
        }
      }
      return price;
    }
  },
  methods: {
    //卡片点击事件
    cardClick(index) {
      this.dataList[index].checked = !this.dataList[index].checked;
      if (this.checked) {
        for (let i = 0; i < this.dataList.length; i++) {
          if (this.dataList[i].checked != this.checked) {
            this.checked = false;
            return;
          }
        }
      } else {
        for (let i = 0; i < this.dataList.length; i++) {
          if (!this.dataList[i].checked) {
            return;
          }
        }
        this.checked = true;
      }
    },
    //全选按钮
    allClick() {
      if (this.submitLoading) {
        return;
      }
      this.checked = !this.checked;
      this.submitList = [];
      for (let index = 0; index < Math.min(this.dataList.length, 20); index++) {
        if (this.checked) {
          this.dataList[index].checked = true;
          this.submitList.push(index);
        } else {
          this.dataList[index].checked = false;
        }
      }
    },
    //提交按钮点击事件
    submitClick() {
      if (this.price == 0) {
        Toast("请选择上传发票的订单");
        return;
      }
      this.$router.push("/upInvoice");
    },
    //加载数据
    getData() {
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
        pageNo: this.pageNo,
        isMachining: 0
      };
      this.$api
        .post(link.unVoice, postObj)
        .then(result => {
          if (result.data.code == "200") {
            this.pageCount = result.data.data.pageCount;
            this.pageNo++;
            let dataList = [...result.data.data.transBillMains];
            for (let index = 0; index < dataList.length; index++) {
              let data = {
                orderNum: dataList[index].allBillNo || dataList[index].orderID,
                checked: false,
                index: index,
                id: dataList[index].id,
                from: dataList[index].startAddr,
                to: dataList[index].endPlace,
                courierNumber: dataList[index].billNo,
                price: dataList[index].transPrice
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
        .post(link.myVoice, {
          pageNo: 1,
          transCorpID: 71536,
          isMachining: 0
        })
        .then(res => {
          if (res.data.code == "200") {
            this.checked = false;
            this.pageCount = res.data.data.pageCount;
            let dataList = [...res.data.data.transBillMains];
            this.dataList = [];
            for (let index = 0; index < dataList.length; index++) {
              let data = {
                orderNum: dataList[index].allBillNo || dataList[index].orderID,
                checked: false,
                index: index,
                id: dataList[index].id,
                from: dataList[index].startAddr,
                to: dataList[index].endPlace,
                courierNumber: dataList[index].billNo,
                price: dataList[index].transPrice
              };
              this.dataList.push(data);
              // this.$set(this.dataList, index, data);
            }
          }
          this.isLoading = false;
          this.finished = false;
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
  &-mid {
    padding-top: 15px;
    padding-bottom: 50px;
    /deep/.van-pull-refresh__track {
      min-height: e("calc(100vh - 90px)");
    }
  }
  /deep/.van-submit-bar__button {
    width: 110px !important;
  }
}
</style>