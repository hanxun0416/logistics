<template>
  <div class="carCard">
    <span class="title">订单信息</span>
    <van-field disabled class="item unable" v-model="carddata.orderNum" label="订单号" />
    <van-field disabled class="item unable" v-model="weight" label="总吨位" />
    <van-field
      type="number"
      class="item"
      v-model="carddata.price"
      label="单价"
      placeholder="元/吨"
      required
    />
    <van-field
      class="item"
      @click="selectCar()"
      :class="{unable:!isEmpty}"
      v-model="carddata.transTypeName"
      label="运输方式"
      placeholder="请选择运输方式"
      required
      disabled
    />
    <van-field
      disabled
      class="item unable"
      v-model="totalMoney"
      label="总金额"
      placeholder="元"
      required
    />
  </div>
</template>
<script>
import { Field } from "vant";
import { toDecimal } from "../../uitls/js/decimal";
export default {
  name: "OrderInfo",
  props: ["carddata"],
  components: {
    [Field.name]: Field
  },
  data() {
    return {
      imgList: []
    };
  },
  methods: {
    selectCar() {
      this.$emit("selectCar");
    }
  },
  computed: {
    isEmpty: function() {
      return this.carddata.transTypeName.trim() == "";
    },
    weight: function() {
      return `${this.carddata.weight}吨`;
    },
    totalMoney: function() {
      if (this.carddata.price == "") {
        return "0元";
      } else {
        return `${toDecimal(
          this.carddata.price * this.carddata.weight * 100,
          2
        )}元`;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.carCard {
  .card();
  height: auto;
  .title {
    .title();
  }
  .item {
    width: 88%;
    margin: 0 auto;
  }
  .unable {
    /deep/.van-field__control:disabled {
      color: #323233;
      -webkit-text-fill-color: #323233;
      background-color: transparent;
      opacity: 1;
    }
  }
}
</style>