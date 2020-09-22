<template>
  <div class="card" @click="myclick()">
    <div class="order">
      <span class="orderNum">{{`订单号：${carddata.orderNum}`}}</span>
      <div style="width:6vw;height:6vw;z-index:100;opacity: 0;" class="checkbox"></div>
      <div>
      
      <van-checkbox
      v-if="carddata.isOutAll>0||showCheck"
        :disabled="checkable"
        class="checkbox"
        v-model="carddata.checked"
        style="z-index:1"
      ></van-checkbox>
      <div class="checkbox" v-else style="color:#1365e8">未出库</div>
      </div>
      <!-- <span class="orderDate">{{carddata.orderDate}}</span> -->
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
      <span>运单号：{{carddata.courierNumber}}</span>
      <span class="price">{{`￥${carddata.price.toFixed(2)}`}}</span>
    </div>
  </div>
</template>
<script>
import { Divider, Checkbox } from "vant";
export default {
  name: "SettleCard",
  props: ["carddata", "checkable","showCheck"],
  data() {
    return {};
  },
  components: {
    [Divider.name]: Divider,
    [Checkbox.name]: Checkbox
  },
  created() {
     this.carddata.price= this.carddata.price-0
   
  },
  methods: {
    myclick() {
      if (this.checkable||this.carddata.isOutAll<1) {
        return;
      }
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
</style>