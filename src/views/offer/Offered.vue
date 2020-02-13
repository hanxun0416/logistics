<template>
  <div class="main">
    <div class="main-mid">
      <order-info-card :carddata="orderdata"></order-info-card>
      <transport-card style="margin-top:15px" :carddata="transdata"></transport-card>
      <goods-card style="margin-top:15px" :carddata="goodsdata"></goods-card>
    </div>
  </div>
</template>
<script>
import OrderInfoCard from "../../components/order/OrderInfoCard";
import GoodsCard from "../../components/order/GoodsCard";
import TransportCard from "../../components/order/TransportCard";
import link from "../../uitls/js/link";
export default {
  name: "Car",
  components: {
    "order-info-card": OrderInfoCard,
    "goods-card": GoodsCard,
    "transport-card": TransportCard
  },
  data() {
    return {
      orderdata: {
        //订单信息卡片
        id: "",
        orderNum: "", //订单编号
        weight: "", //总吨位
        price: "", //单价
        totalMoney: "", //总金额
        transTypeName: "" //运输类型
      },
      transdata: {
        //运输信息卡片
        type: 0,
        startAddr: "",
        startDate: "",
        endPlace: "",
        endDate: ""
      },
      goodsdata: [] //货物信息卡片
    };
  },
  created() {
    this.orderdata.id = this.$route.query.id;
    this.getOrderInfo();
  },
  methods: {
    getOrderInfo() {
      let postObj = {
        id: this.orderdata.id,
        permit: 1
      };
      this.$api
        .post(link.getOfferDetail, postObj)
        .then(result => {
          if (result.data.code == "200") {
            let data = result.data.data[0];
            [
              this.orderdata.orderNum,
              this.orderdata.weight,
              this.orderdata.price,
              this.orderdata.totalMoney,
              this.orderdata.transTypeName
            ] = [
              data.allBillNo || data.orderID,
              `${data.weight}吨`,
              data.transPrice,
              data.transMoneySum,
              data.transTypeName
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
    }
  }
};
</script>
<style lang="less" scoped>
.main {
  min-height: 100vh;
  height: auto;
  &-mid {
    padding: 15px 0;
  }
}
</style>