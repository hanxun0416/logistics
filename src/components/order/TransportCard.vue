<template>
  <div class="transCard">
    <span class="title">运输信息</span>
    <div class="from" @click="toMap($event,startAddr)">
      <span class="from-dot"><van-icon name="location" color="#2d82ff" class="from-dot-icon" /></span>
      <div class="from-item">
        <span class="address"  >{{carddata.startAddr}}</span>
        <span v-if="carddata&&carddata.type==1" class="todate">联系信息：张三/15444554556</span>
        <span class="date">起运时间{{startDate}}</span>
       <van-image   width="10"
  height="20" :src='img'/>
      </div>
    </div>
    <div class="arrow">
      <img src="../../assets/offer/arrow.png" />
    </div>
    <div class="to" @click="toMap($event,endAddr)">
      <span class="to-dot toColor"> <van-icon name="location" class="from-dot-icon" color="#f79e3e" /></span>
      <div class="to-item">
        <span class="address"  >{{carddata.endPlace}}</span>
        <span v-if="carddata&&carddata.type==1" class="todate">联系信息：李四/15444554556</span>
        <span class="todate">到货时间{{endDate}}</span>
         <van-image   width="10"
  height="20" :src='img'/>
      </div>
    </div>
  </div>
</template>
<script>
import { Icon,Image } from "vant";
import { formatDate } from "../../uitls/js/date";
export default {
  name: "TransportCard",
  props: ["carddata"],

  data() {
    return {
      startAddr:true,
      endAddr:false,
      img:require("../../assets/order/to.png"),
    };
  },
   components: {
    [Icon.name]:Icon,
    [Image.name]:Image
  },
  computed: {
    startDate: function() {
      if (this.carddata.startDate) {
        return formatDate(
          new Date(this.carddata.startDate.replace(/-/g, "/")),
          "yyyy-MM-dd"
        );
      } else {
        return this.carddata.startDate;
      }
    },
    endDate: function() {
      if (this.carddata.endDate) {
        return formatDate(
          new Date(this.carddata.endDate.replace(/-/g, "/")),
          "yyyy-MM-dd"
        );
      }else{
        return this.carddata.endDate
      }
    }
  },
  methods: {
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
};
</script>
<style lang="less" scoped>
.transCard {
  .card();
  .title {
    .title();
    margin-bottom: 8px;
  }
  .from,
  .to {
    position: relative;
    width: 100%;
    background: url('../../assets/order/map.png') no-repeat 100%;
    &-item {
      height: 56px;
      padding-left: 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-top: 5px;
      padding-bottom: 5px;
      span {
        display: block;
      }
      .address {
        margin-bottom: 2px;
        padding-right: 20px;
       font-size: 14px;
      }
      .date {
        margin-bottom: 2px;
        .font(12px, 400, @btn-blue);
      }
      .todate {
        margin-bottom: 2px;
        .font(12px, 400, @btn-orange);
      }
    }
    &-dot {
      display: block;
      position: absolute;
      top: 50%;
      margin-top: -14px;
      left: 10px;
       &-icon{
         font-size: 28px
       }
 
    }
    // .toColor {
    //   background: @btn-orange;
    //   border: 1px solid @btn-orange;
    // }
  }
  .arrow {
    height: 17px;
    padding-left: 20px;
    img {
      height: 16px;
    }
  }
}
.van-image{
  position: absolute;
  right: 5px;
  top: 50%;
  margin-top: -10px;
}
</style>