<template>
  <div class="main">
    <div class="main-mid">
      <order-info-card :carddata="orderdata"></order-info-card>
      <transport-card style="margin-top:15px" :carddata="transdata"></transport-card>
      <div class="bill-card" style="margin-top:15px" v-if="bill.length>0">
        <span class="title">提单信息</span>
        <van-radio-group v-model="radio" style="width:90%;margin:0 auto;margin-top:10px">
          <van-cell-group>
            <van-cell
              v-for="(item,index) in bill"
              :key="index"
              :title="item.billNo"
              clickable
              @click="selectBill(index,item)"
            >
              <van-radio slot="right-icon" :name="index" />
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
      <car-card style="margin-top:15px" :carddata="cardata"></car-card>
      <goods-card style="margin-top:15px" :carddata="goodsdata"></goods-card>
    </div>
    <van-button class="sendBtn" hairline size="large" @click="toUpload()">传单据</van-button>
  </div>
</template>
<script>
import OrderInfoCard from "../../components/order/OrderInfoCard";
import GoodsCard from "../../components/order/GoodsCard";
import TransportCard from "../../components/order/TransportCard";
import CarCard from "../../components/order/CarCard";
import link from "../../uitls/js/link";
import { Button, Toast, Cell, CellGroup, RadioGroup, Radio } from "vant";
export default {
  name: "Bill",
  components: {
    "order-info-card": OrderInfoCard,
    "goods-card": GoodsCard,
    "transport-card": TransportCard,
    "car-card": CarCard,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio
  },
  data() {
    return {
      radio: -1,
      submitable: false, //是否可以提交
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
      goodsdata: [], //货物信息卡片
      cardata: [], //车辆信息
      bill: [] //提单信息
    };
  },
  created() {
    this.orderdata.id = this.$route.query.id;
    this.getOrderInfo();
  },
  methods: {
    selectBill(index) {
      this.radio = index;
    },
    //到上传单据页面
    toUpload() {
      if (!this.submitable) {
        Toast("暂无提单信息！");
        return false;
      }
      if (this.radio == -1) {
        Toast("请选择提单信息后提交");
        return false;
      }
      this.$router.push({
        path: "/uploadBill",
        query: {
          applyID: this.bill[this.radio].applyID
        }
      });
    },
    //获取订单信息
    getOrderInfo() {
      let postObj = {
        id: this.orderdata.id,
        permit: 1,
        transCorpID: 71536
      };
      this.$api.post(link.getOrderDetail, postObj).then(result => {
        if (result.data.code == "200") {
          if (result.data.data[0].pickBillMains.length == 0) {
            this.submitable = false;
          } else {
            this.submitable = true;
          }
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
          for (let index = 0; index < data.transCars.length; index++) {
            //用车信息赋值
            let goodObj = {
              carNun: data.transCars[index].cartNo || "", //品名
              name: data.transCars[index].driverName || "", //规格
              mobile: data.transCars[index].mobile || "" //件数
            };
            this.cardata.push(goodObj);
          }
          for (let index = 0; index < data.pickBillMains.length; index++) {
            //提单信息赋值
            let billObj = {
              billNo: data.pickBillMains[index].billNo || "", //提单号，用于显示
              applyID: data.pickBillMains[index].id || "" //件数
            };
            this.bill.push(billObj);
          }
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
    padding-bottom: 75px;
    .bill-card {
      .card();
      .title {
        .title();
      }
    }
  }
}
</style>