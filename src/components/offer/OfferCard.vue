<template>
  <div class="card" @click="cardClick(active)">
    <div class="start mb5">
       <van-icon name="location" class="f18" color="#2d82ff"  />
      <span class="address" @click="toMap($event,startAddr)">
        {{carddata.startAddr}}
        </span>
      <span class="date">{{startDate}}</span>
    </div>
    <div class="arrow mb5">
      <img src="../../assets/offer/arrow.png" />
    </div>
    <div class="end">
       <van-icon name="location" class="f18" color="#f79e3e"  />
      <span class="address" @click="toMap($event,endAddr)">
        {{carddata.endPlace}}
        </span>
      <span class="date">{{endDate}}</span>
    </div>

      <van-divider style="margin:0;" />
    <div class="data">
      <span>{{carddata.stename}}</span>
      <span>{{carddata.quantity+`件`}}</span>
      <span>{{carddata.weight+`吨`}}</span>
      <span :class="{'price':true,'price--active':active}">{{`￥`+price}}</span>
    </div>
  </div>
</template>
<script>
import { formatDate } from "../../uitls/js/date";
import { toDecimal } from "../../uitls/js/decimal";
import { Divider,Icon } from "vant";
export default {
  name: "OfferCard",
  props: ["carddata","active"],
  components: {
    [Divider.name]: Divider,
    [Icon.name]:Icon
  },
  data(){
    return{
        startAddr:true,
        endAddr:false,
    }
  },
  computed: {
    //商品价格
    price: function() {
      if (this.active) {
        return this.carddata.transPrice != ""
          ? toDecimal(this.carddata.transPrice * this.carddata.weight * 100, 2)
          : "暂无报价";
      } else {
        return "暂无报价";
      }
    },

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
      } else {
        return this.carddata.endDate;
      }
    }
  },

  methods: {
    cardClick(flag) {
      let id = this.carddata.id;
      if (flag) {
        this.$router.push({
          path: "/offered",
          query: {
            id: id
          }
        });
      } else {
        this.$router.push({
          path: "/unOffer",
          query: {
            id: id
          }
        });
      }
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
  }
};
</script>
<style lang="less" scoped>
.card {
  display: flex;
  flex-direction: column;
  width: 355px;
  height: 130px;
  margin: 0 auto;
  margin-top: 15px;
  padding-top: 22px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 30px 0px rgba(214, 219, 230, 0.4);
  border-radius: 10px;
  .start,
  .end {
    position: relative;
    margin-left: 10px;
    // padding-left: 10px;
    line-height: 20px;
    height: 20px;
  }
  .end {
    margin-bottom: 16px;
  }
  // .start::before {
  //   .before(@btn-blue,url("../../assets/offer/start.png"));
  // }
  // .end::before {
  //   .before(@btn-orange,url("../../assets/offer/end.png"));
  // }
  .address {
    min-width: 30vw;
    max-width: 50vw;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: top;
    font-size: 14px;
    font-family: Source Han Sans SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
  }
  .date {
    display: inline-block;
    margin-left: 10.5px;
    font-size: 14px;
    font-family: Source Han Sans SC;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
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
      min-width: 55px;
      max-width: 89px;
      font-size: 14px;
      font-family: Source Han Sans SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
    .price {
      // position: absolute;
      // right: 33px;
      color: @btn-orange;
    }
    .price--active {
      color: @btn-blue;
    }
  }
}
.f18{font-size: 18px}
.mb5{margin-bottom: 5px}
</style>