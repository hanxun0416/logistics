<template>
  <div class="card" @click="myclick()">
    <div v-if="isPay == true">
      <van-cell is-link @click="showPopup" style="padding: 0px">
        <div class="order">
          <span class="orderNum" style="padding: 0px"
            >{{ `对账单号：${carddata.billNo}` }}
            <span style="color: #e6e6e6">></span></span
          >
          <span class="orderDate" style="top: 0px">{{ date }}</span>
        </div>
        <div style="margin-top: 10px">
          <div class="data-item">发票编号:<span>{{carddata.voiceNo}}</span></div>
          <div class="data-item">开票日期:<span>{{carddata.corpbizDate}}</span></div>
          <div class="data-item">
            发票类型:<span style="margin-right: 20px"></span> 税率:<span
              >9%</span>
          </div>
        </div>
      </van-cell>
      <div class="data dac" style="padding-top: 15px">
        <div class="dac">
          <span>发票照片：</span>
          <blok v-for="(item, index) in carddata.billFlowFiles" :key="index">
            <a
            href="javascript:void(0)"
            class="van-ellipsis ui-files dib vm"
            @click="onChange('http://fs.lgsteel.cn:8080/file/upload/workflow2/2020/2020-10-24/1603526501404.jpg')"
            >{{item.fileName}}</a
          >
          </blok>
        </div>
        <span class="price">{{ `￥${carddata.voiceSum==null?0:carddata.voiceSum}` }}</span>
      </div>
      <div class="orderUnPay"></div>
      <van-popup
        v-model="show"
        round
        position="bottom"
        :style="{ height: '40%' }"
      >
        <div class="k-item">申请付款明细</div>
        <div class="bor-t">
          <span class="dib pct33 bor-r c68">订单号</span>
          <span class="dib pct33 bor-r c68">合同号</span>
          <span class="dib pct33 c68">应收款(元)</span>
        </div>
        <blok v-for="(item, index) in carddata.checkFeeLineList" :key="index">
          <div class="bor-t">
            <span class="dib pct33 c34">{{item.orderID}}</span>
            <span class="dib pct33 c34">{{item.allBillNo}}</span>
            <span class="dib pct33 c34">{{item.moneySum}}</span>
          </div>
        </blok>
        <div class="bor-t">
          <span class="dib pct33 c34">合计</span>
          <span class="dib pct33 c34">--</span>
          <span class="dib pct33 c34">{{carddata.voiceSum==null?0:carddata.voiceSum}}</span>
        </div>
      </van-popup>
      <van-image-preview v-model="imgShow" :images="images" @change="onChange">
      </van-image-preview>
    </div>
    <div v-else>
      <div class="order">
        <span class="orderNum">{{ `订单号：${carddata.orderNum}` }} </span>
        <span class="orderDate">{{ date }}</span>
      </div>
      <div class="start dac">
        <span class="address">{{ carddata.from }}</span>
      </div>
      <div class="arrow">
        <img src="../../assets/offer/arrow.png" />
      </div>
      <div class="end dac">
        <span class="address">{{ carddata.to }}</span>
      </div>
      <van-divider style="margin: 0" />
      <div class="data" style="padding-top: 10px; border: none">
        <span>运单号：{{ carddata.courierNumber }}</span>
        <span class="price">{{ `￥${price}` }}</span>
      </div>
    </div>
    <!-- <div class="orderUnPay"></div> -->
  </div>
</template>
<script>
import { toDecimal } from "../../uitls/js/decimal";
import { formatDate } from "../../uitls/js/date";
import { Divider, Checkbox, Popup, ImagePreview, Cell } from "vant";

export default {
  name: "SettleCard",
  props: ["carddata", "isPay"],
  data() {
    return {
      show: false,
      imgShow: false,
    };
  },
  components: {
    [Divider.name]: Divider,
    [Checkbox.name]: Checkbox,
    [ImagePreview.Component.name]: ImagePreview.Component,
    [Popup.name]: Popup,
    [Cell.name]: Cell,
  },
  created() {
   
  },
  computed: {
    price: function () {
      return toDecimal(this.carddata.price * 100, 2);
    },
    date: function () {
      if (this.carddata.orderDate) {
        return formatDate(
          new Date(this.carddata.orderDate.replace(/-/g, "/")),
          "yyyy-MM-dd"
        );
      } else {
        return "";
      }
    },
  },
  methods: {
    myclick() {
      this.$emit("cardClick", this.carddata.index);
    },
    showPopup() {
      this.show = true;
    },
    onChange(url) {
      this.imgShow = true;
      let that = this;
      ImagePreview({
        images: [url],
        closeable: true,
        maxZoom: 3,
        minZoom: 1 / 3,
        onClose() {
          that.imgShow = false;
        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
.k-item {
  height: 29px;
  font-size: 24px;
  font-family: Source Han Sans SC;
  font-weight: 400;
  color: #333333;
  line-height: 40px;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 20px;
}
.bor-t {
  border-top: 0.5px solid #e6e6e6;
  padding-top: 15px;
  padding-bottom: 15px;
  display: flex;
}
.c68 {
  color: #686868;
}
.dac {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: space-between;
}
.c34 {
  color: #343434;
}
.pct33 {
  width: 33%;
  text-align: center;
  font-size: 16px;
}

.dib {
  display: inline-block;
}

.bor-r {
  border-right: 1px solid #e5e5e5;
}
.ui-files {
  font-size: 12px;
  line-height: 26px;
  height: 26px;
  box-sizing: border-box;
  display: inline-block;
  border: 1px solid #e5e5e5;
  border-radius: 13px;
  padding: 0px 10px 0px 30px;
  color: #676767;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAAaVBMVEUAAABnZ2eRkZFnZ2dqampnZ2dnZ2doaGhoaGhqampxcXFnZ2dnZ2dnZ2d1dXV1dXVoaGhoaGhnZ2dpaWlqampra2tnZ2doaGhoaGhnZ2doaGhoaGhoaGhnZ2doaGhpaWloaGhubm5oaGi5bYGQAAAAI3RSTlMA8QTRO+DLo50sFLKrXA8I6dqVQR4Z7MK/uIV7dWliUUsSUy6uY1YAAAB+SURBVAjXVcpJEoMgFADRRkFwQJyNRqPm/ofMj6zs3atq7ur5y11UVoaHksIZY0ekS5Q3VmvXiIu0Er2RnIOXaBIN0LfsbcinDbyqOVNmT7bCR/UyrqgcpUWaxKaBtqczS1QBtgO/DSTVXwzqRApRcCh36N0sF7Gxy0zpufsBazsGKR4Zi4oAAAAASUVORK5CYII=)
    #fff no-repeat 12px 5px;
  background-size: 15px 15px;
  max-width: 500px;
  overflow: hidden;
}
.vm {
  vertical-align: middle;
}
.van-icon-arrow:before {
    content: "\F00A";
}
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
    height: 15px;
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
      position: absolute;
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
  .data-item {
    margin-left: 10px;
    font-size: 12px;
    margin-bottom: 10px;
  }
  .end {
    margin-bottom: 16px;
  }
  .start::before {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 10px;
    background: url("../../assets/offer/start.png") no-repeat 100%;
    background-size: contain;
    display: inline-block;
  }
  .end::before {
    content: "";
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
    margin-top: -6px;
    margin-bottom: 9px;
    img {
      height: 17px;
      width: auto;
    }
  }
  .data {
    border-top: 0.5px solid #e6e6e6;
    padding-left: 10px;
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
.orderPay {
  width: 81.5px;
  height: 63.5px;
  position: absolute;
  right: 10.5px;
  top: 45px;
  font-size: 14px;
  background: url("../../assets/settlement/yifukuan.png") no-repeat;
  background-size: 81.5px 63.5px;
}
.orderUnPay {
  background: url("../../assets/settlement/weifukuan.png") no-repeat;
  background-size: 81.5px 63.5px;
}
</style>