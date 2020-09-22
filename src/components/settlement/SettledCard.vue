<template>
  <div class="card" @click="myclick()">
    <div class="order">
      <span class="orderNum">{{`订单号：${carddata.orderNum}`}}</span>
      <!-- <van-checkbox class="checkbox" v-model="carddata.checked"></van-checkbox> -->
      <span class="orderDate">{{date}}</span>
    </div>
    <div class="start">
      <span class="address">{{carddata.from}}</span>
    </div>
    <div class="arrow">
      <img src="../../assets/offer/arrow.png" />
    </div>
    <div class="end">
      <span class="address">{{carddata.to}}</span>
    </div>
    <van-divider style="margin:0" />
    <div class="data">
      <span>运单号：{{carddata.allBillNo}}</span>
         <span class="price">{{`￥${price}`}}</span>
    </div>
    <!-- <div class="orderUnPay" v-if="carddata.isPayEnd!='1'&&showPay=='true'">
    </div> -->
  </div>
</template>
<script>
import { toDecimal } from "../../uitls/js/decimal";
import { formatDate } from "../../uitls/js/date";
import { Divider, Checkbox } from "vant";
export default {
  name: "SettleCard",
  props: ["carddata","showPay"],
  data() {
    return {};
  },
  components: {
    [Divider.name]: Divider,
    [Checkbox.name]: Checkbox
  },
  computed: {
    price: function() {
      return toDecimal(this.carddata.price * 100, 2);
    },
    date: function() {
      if (this.carddata.orderDate) {
        return formatDate(
          new Date(this.carddata.orderDate.replace(/-/g, "/")),
          "yyyy-MM-dd"
        );
      } else {
        return "";
      }
    }
  },
  methods: {
    myclick() {
      this.$emit("cardClick", this.carddata.index);
    }
  }
};
</script>
<style lang="less" scoped>
.card {
  .flex(column);
  width: 355px;
  height: 160px;
  margin: 0 auto;
  margin-bottom: 15px;
  padding-top: 15px;
  position: relative;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 30px 0px rgba(214, 219, 230, 0.4);
  border-radius: 10px;
  .order {
    position: relative;
    width: 90%;
    margin: 0 auto;
    margin-bottom: 14px;
    border-left: 3px solid @btn-blue;
    padding-left: 12px;
    .checkbox {
      display: inline-block;
      position: absolute;
      right: 0;
    }
    span {
      display: inline-block;
      font-family: Source Han Sans SC;
      font-weight: 400;
    }
    .orderNum {
      font-size: 15px;
      line-height: 16px;
      color: @btn-blue;
    }
    .orderDate {
      position: absolute;
      right: 8px;
      font-size: 12px;
      color: rgba(179, 179, 179, 1);
    }
  }
  .start,
  .end {
    position: relative;
    margin-left: 14px;
    line-height: 20px;
    height: 20px;
  }
  .end {
    margin-bottom: 16px;
  }
  .start::before {
     content: '';
     width: 10px;
     height: 10px;
     border-radius: 50%;
     margin-right: 10px;
     background: url("../../assets/offer/start.png") no-repeat 100%;
     background-size: contain;
     display: inline-block;
  }
  .end::before {
      content: '';
     width: 10px;
     height: 10px;
     border-radius: 50%;
     margin-right: 10px;
     background: url("../../assets/offer/end.png") no-repeat 100%;
     background-size: contain;
     display: inline-block;
  }
  .address {
    min-width: 30vw;
    max-width: 85vw;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    .font(14px, 500, @font-color-gray);
  }
  .date {
    display: inline-block;
    margin-left: 10.5px;
    .font(14px, 400, @font-color-gray);
  }
  .arrow {
    height: 17px;
    padding-left: 14px;
    img {
      height: 17px;
      width: auto;
    }
  }
  .data {
    padding-left: 16px;
    flex-grow: 1;
    .flex(row, space-between);
    span {
      .flex(column, center);
      overflow: hidden;
      text-overflow: ellipsis;
      -o-text-overflow: ellipsis;
      white-space: nowrap;
      min-width: 70px;
      .font(13px, 400, @font-color-gray);
    }
    .price {
      .font(14px, bold, @btn-blue);
    }

  }
}
.orderUnPay,
.orderPay{
  width: 81.5px;
  height: 63.5px;
  position: absolute;
  right: 10.5px;
  top: 52px;
  font-size: 14px;
  background: url('../../assets/settlement/yifukuan.png') no-repeat;
  background-size: 81.5px 63.5px
}
.orderUnPay{
  background: url('../../assets/settlement/weifukuan.png') no-repeat;
   background-size: 81.5px 63.5px
}

</style>