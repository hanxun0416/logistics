<template>
  <div class="card" @click="myclick()">
    <div class="order">
      <span class="orderNum">{{`订单号：${carddata.allBillNo || carddata.orderID}`}}</span>
      <span class="orderDate">{{date}}</span>
    </div>
    <div class="start mb5">
         <van-icon name="location" class="f18" color="#2d82ff"  />
      <span class="address" @click="toMap($event,startAddr)">{{carddata.startAddr}}</span>
    </div>
    <div class="arrow mb5">
      <img src="../../assets/offer/arrow.png" />
    </div>
    <div class="end">
        <van-icon name="location" class="f18" color="#f79e3e"  />
      <span class="address" @click="toMap($event,endAddr)">{{carddata.endPlace}}</span>
    </div>
    <van-divider style="margin:0" />
    <div class="data">
      <span>{{carddata.stename}}</span>
      <span>{{`${carddata.quantity}件`}}</span>
      <span>{{`${carddata.weight}吨`}}</span>
      <!-- <span :class="{'price':true,'price--active':active}">{{`￥`+price}}</span> -->
    </div>
    <div class="orderImg">
      <img class="w90" :src="imgUrl" />
    </div>
  </div>
</template>
<script>
import { Divider,Icon} from "vant";
import { formatDate } from "../../uitls/js/date";
export default {
  name: "OrderCard",
  props: ["carddata"],
  data() {
    return {
          startAddr:true,
        endAddr:false,
      imgList: [
        require("../../assets/order/daipaiche.png"),
        require("../../assets/order/daitihuo.png"),
        require("../../assets/order/daichuandanju.png"),
        require("../../assets/order/yiqianshou.png")
      ]
    };
  },
  components: {
    [Divider.name]: Divider,
    [Icon.name]: Icon,
  },
  methods: {
    myclick() {
      this.$emit("cardClick", this.carddata.orderTransType, this.carddata.id);
    },
toMap(ev,flag){
     var ev = ev || window.event;
    if(ev.stopPropagation) {
        ev.stopPropagation();
    }else{
        ev.cancelBubble = true;
    }
    if(flag){
      this.$router.push({name:'map',query:{addr:this.carddata.startAddr}}) 
    }
    else{
       this.$router.push({name:'map',query:{addr:this.carddata.endPlace}}) 
    }
    }
  },
  computed: {
    //图片路径
    imgUrl: function() {
      return this.imgList[this.carddata.orderTransType - 1];
    },
    //格式化日期
    date: function() {
      if (this.carddata.bizDate) {
        return formatDate(
          new Date(this.carddata.bizDate.replace(/-/g, "/")),
          "yyyy-MM-dd"
        );
      } else {
        return this.carddata.bizDate;
      }
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
  margin-top: 15px;
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
      top: 50%;
      transform: translateY(-50%);
      right: 8px;
      font-size: 12px;
      color: rgba(179, 179, 179, 1);
    }
  }
  .start,
  .end {
    position: relative;
    margin-left: 10px;
    line-height: 20px;
    height: 20px;
  }
  .end {
    margin-bottom: 16px;
  }
  // .start::before {
  //   .before(@btn-blue, url("../../assets/offer/start.png"));
  // }
  // .end::before {
  //   .before(@btn-orange, url("../../assets/offer/end.png"));
  // }
  .address {
    min-width: 30vw;
    max-width: 45vw;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: top;
    .font(14px, 500, @font-color-gray);
  }
  .date {
    display: inline-block;
    margin-left: 10.5px;
    .font(14px, 400, @font-color-gray);
     vertical-align: top;
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
    .flex(row, space-around);
    span {
      .flex(column, center);
      overflow: hidden;
      text-overflow: ellipsis;
      -o-text-overflow: ellipsis;
      white-space: nowrap;
      min-width: 70px;
      max-width: 100px;
      .font(14px, 400, @font-color-gray);
    }
    .price {
      // position: absolute;
      right: 33px;
      color: @btn-orange;
    }
    .price--active {
      color: @btn-blue;
    }
  }
}
.orderImg{
 position:absolute;
 top:64px;
 right:16px
}
.f18{font-size: 18px}
.mb5{margin-bottom: 5px}
.w90{width: 90px;}
</style>