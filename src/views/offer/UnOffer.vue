<template>
  <div class="main">
    <div class="main-mid">
      <order-info :carddata="orderdata" @selectCar="selectCar()"></order-info>
      <transport-card style="margin-top:15px" :carddata="transdata"></transport-card>
      <goods-card style="margin-top:15px" :carddata="goodsdata"></goods-card>
    </div>
    <van-button class="sendBtn" hairline size="large" @click="submit()">提交报价</van-button>
    <van-action-sheet v-model="flag" :actions="actions" @select="onSelect" />
  </div>
</template>
<script>
import OrderInfo from "../../components/offer/OrderInfo";
import GoodsCard from "../../components/order/GoodsCard";
import TransportCard from "../../components/order/TransportCard";
import { Button, ActionSheet, Toast } from "vant";
import link from "../../uitls/js/link";
export default {
  name: "Car",
  components: {
    "order-info": OrderInfo,
    "goods-card": GoodsCard,
    "transport-card": TransportCard,
    [Button.name]: Button,
    [ActionSheet.name]: ActionSheet
  },
  data() {
    return {
      orderdata: {
        //订单信息卡片
        id: "",
        orderNum: "", //订单编号
        weight: "", //总吨位
        price: "", //单价
        transType: "", //运输类型
        transTypeName: "", //运输类型名称
        quoteType: "" //订单类型
      },
      transdata: {
        //运输信息卡片
        type: 0,
        startAddr: "",
        startDate: "",
        endPlace: "",
        endDate: ""
      },
      goodsdata: [], //货物信息卡片
      flag: false, //运输类型选项是否显示
      actions: [
        { name: "整车", transType: "5001" },
        { name: "配车", transType: "5002" },
        { name: "包车", transType: "5003" }
      ]
    };
  },
  created() {
    this.orderdata.id = this.$route.query.id;
    this.getOrderInfo();
  },
  methods: {
    //选择运输方式输入框点击事件
    selectCar() {
      this.flag = true;
    },
    //选择运输方式回调
    onSelect(value, index) {
      this.flag = false;
      this.orderdata.transTypeName = value.name;
      this.orderdata.transType = value.transType;
    },
    getOrderInfo() {
      let postObj = {
        id: this.orderdata.id,
        permit: 0
      };
      this.$api
        .post(link.getOfferDetail, postObj)
        .then(result => {
          if (result.data.code == "200") {
            let data = result.data.data[0];
            [
              this.orderdata.orderNum,
              this.orderdata.weight,
              this.orderdata.quoteType
            ] = [
              data.allBillNo || data.orderID,
              data.weight,
              data.quoteType
            ]; //订单信息赋值
            [
              this.transdata.startAddr,
              this.transdata.startDate,
              this.transdata.endPlace,
              this.transdata.endDate
            ] = [data.startAddr, data.startDate, data.endPlace, data.endDate]; //运输信息赋值
            for (let index = 0; index < data.transBillLines.length; index++) {
              //商品信息赋值
              let goodObj = {
                stename: data.transBillLines[index].steName || "", //品名
                steSpec: data.transBillLines[index].steSpec || "", //规格
                quantity: data.transBillLines[index].quantity || "", //件数
                weight: data.transBillLines[index].weight || "" //重量
              };
              this.goodsdata.push(goodObj);
            }
          }
        })
        .catch(err => {});
    },
    //提交按钮点击事件
    submit() {
      //提交前校验
      for (const key in this.orderdata) {
        if (this.orderdata[key] == "") {
          switch (key) {
            case "price":
              Toast(`请填写单价`);
              return;
            case "transType":
              Toast(`请选择运输方式`);
              return;
            default:
              break;
          }
        }
      }
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        mask: true,
        message: "拼命提交中..."
      });
      let postObj = JSON.parse(JSON.stringify(this.orderdata));
      postObj.totalMoney = postObj.price * postObj.weight;
      postObj.transPrice = postObj.price;
      this.$api.post(link.saveOffer, postObj).then(result => {
        if (result.data.code == "200") {
          Toast.success("提交成功");
          this.$router.push({
            name: "offer",
            params: {
              active: 0
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.main {
  min-height: 100vh;
  height: auto;
  &-mid {
    padding-top: 15px;
    padding-bottom: 65px;
  }
}
</style>