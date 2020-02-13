<template>
  <div class="carCard">
    <span class="title">订单信息</span>
    <div class="item">
      <span class="item-title">订单号</span>
      <span>{{carddata.orderNum}}</span>
    </div>
    <div class="item">
      <span class="item-title">运输方式</span>
      <span>{{carddata.transTypeName}}</span>
    </div>
    <div class="item">
      <span class="item-title">单价</span>
      <span>{{carddata.price}}</span>
    </div>
    <div class="item">
      <span class="item-title">总吨位</span>
      <span>{{carddata.weight}}</span>
    </div>
    <div class="item">
      <span class="item-title">总金额</span>
      <span>{{carddata.totalMoney}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "OrderInfoCard",
  props: ["carddata"],
  data() {
    return {};
  },
  methods: {
    myclick() {
      this.$emit("cardClick", this.carddata.type, this.carddata.orderNum);
    }
  },
  computed: {},

};
</script>
<style lang="less" scoped>
.carCard {
  .flex(column, space-around);
  .card();
  height: 145px;
  .title {
    .title();
  }
  .item {
    padding-left: 29px;
    height: 20px;
    span {
      display: inline-block;
    }
    &-title {
      min-width: 80px;
    }
  }
}
</style>