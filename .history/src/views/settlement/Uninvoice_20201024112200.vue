<template>
  <div class="main" id="carCard">
    <div class="main-mid">
      <van-pull-refresh v-model="isLoading" @refresh="Refresh()">
        <van-list
          v-model="loading"
          :finished="finished"
          :finished-text="finishedtxt"
          :immediate-check="false"
          @load="getShowData()"
        >
          <div v-for="(item,index) in showList" :key="index">
            <settle-card @cardClick="cardClick" :carddata="item"  :checkable="submitLoading"></settle-card>
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
      >多选</van-checkbox>
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
      applyId: "",
      dataList: [], //待开票订单列表
      showList: [],
      checked: false, //全选按钮是否选中
      submitLoading: false, //提交按钮是否loading
      finished: false, //加载是否结束
      isLoading: false, //下拉刷新是否正在加载
      loading: false, //load事件是否在执行是否正在加载
      finishedtxt: "我是有底线的",
      pageNo: 1, //页码
      submitList: [] //提交开票订单的的index
    };
  },
  computed: {
    //总金额
    price: function() {
      let price = 0;
      for (let index = 0; index < this.showList.length; index++) {
        if (this.showList[index].checked) {
          price += this.showList[index].price * 100;
        }
      }
      return price;
    },
    //页数
    pageCount: function() {
      return Math.ceil(this.dataList.length / 20);
    }
  },
  created() {
    this.getData();
  },
  methods: {
    //卡片点击事件
    cardClick(index) {
      if (
        this.submitList.length >= 20 &&
        this.showList[index].checked == false
      ) {
        Toast("最多选择20条");
        return;
      }
      this.showList[index].checked = !this.showList[index].checked;
      if (this.submitList.indexOf(index) == "-1") {
        this.submitList.push(index);
      } else {
        this.submitList.splice(this.submitList.indexOf(index), 1);
      }
      if (this.checked) {
        for (let i = 0; i < this.showList.length; i++) {
          if (this.showList[i].checked != this.checked) {
            this.checked = false;
            return;
          }
        }
      } else {
        if (this.submitList.length == 20) {
          this.checked = true;
        }
      }

      console.log('选中',this.submitList,this.showList)
    },
    //全选按钮
    allClick() {
      if (this.submitLoading) {
        return;
      }
      this.checked = !this.checked;
      for (let index = 0; index < this.submitList.length; index++) {
        this.showList[this.submitList[index]].checked = false;
      }
      this.submitList = [];
      if (this.checked) {
        for (
          let index = 0;
          index < Math.min(this.showList.length, 20);
          index++
        ) {
          this.showList[index].checked = true;
          this.submitList.push(index);
        }
      }
    },
    //提交按钮点击事件
    submitClick() {
      if (this.price == 0) {
        Toast("请选择上传发票的订单");
        return;
      }
      let id = "";
      for (let index = 0; index < this.submitList.length; index++) {
        if (index == 0) {
          id += this.dataList[this.submitList[index]].id;
        } else {
          id += `,${this.dataList[this.submitList[index]].id}`;
        }
      }
      let list = [];
      for(let i = 0;i < this.submitList.length;i++){
        list.push(this.showList[this.submitList[i]])
      }

      console.log(list)

      this.$store.commit("invoice/paymentRequest", id);
      this.$router.push({
        path: "/paymentRequest",
        query: {
          fileApplyID: this.applyId,
          price: this.price / 100,
          list:list
        }
      });
    },
    //显示的数据
    getShowData() {
      this.loading = true;
      if (this.pageNo > this.pageCount) {
        if (this.pageNo == 1 && this.pageCount == 1) {
          this.showList = [...this.dataList];
          this.loading = false;
          this.finished = true;
          return;
        } else {
          this.loading = false;
          this.finished = true;
          return;
        }
      }
      setTimeout(() => {
        if (this.dataList.length > 20) {
          this.showList = this.dataList.slice(0, this.pageNo * 20);
          this.pageNo++;
          this.loading = false;
        } else {
          this.showList = [...this.dataList];
          this.loading = false;
          this.finished = true;
          return;
        }
      }, 1000);
    },
    //加载数据
    getData() {
      let postObj = {
        transCorpID: 71536
      };
      this.$api
        .post(link.unVoice, postObj)
        .then(result => {
          if (result.data.code == "200") {
            console.log(result)
            this.applyId = result.data.msg;
            let dataList = [...result.data.data];
            this.showList = [];
            for (let index = 0; index < dataList.length; index++) {
              let data = {
                orderNum: dataList[index].orderID || dataList[index].allBillNo,
                checked: false,
                index: index,
                id: dataList[index].id,
                from: dataList[index].startAddr,
                to: dataList[index].endPlace,
                courierNumber: dataList[index].allBillNo,
                price: dataList[index].applyMoney
              };
              this.dataList.push(data);
            }
            this.getShowData();
            Toast.clear();
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
      this.submitList = [];
      this.$api
        .post(link.unVoice, {
          transCorpID: 71536
        })
        .then(res => {
          if (res.data.code == "200") {
            this.pageNo = 1;
            this.checked = false;
            let dataList = [...res.data.data];
            this.dataList = [];
            this.showList = [];
            for (let index = 0; index < dataList.length; index++) {
              let data = {
                orderNum: dataList[index].orderID || dataList[index].allBillNo,
                checked: false,
                index: index,
                id: dataList[index].id,
                from: dataList[index].startAddr,
                to: dataList[index].endPlace,
                courierNumber: dataList[index].allBillNo,
                price: dataList[index].applyMoney
              };
              this.dataList.push(data);
            }
          }
          this.getShowData();
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