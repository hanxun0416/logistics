<template>
  <div class="goodsCard">
    <span class="title">货物信息</span>
    <div class="item" v-for="(item,index) in carddata" :key="index">
      <span class="item-title">{{item.stename}}</span>
      <span style="padding-top:4px" class="item-title">{{item.steSpec}}</span>
      <span class="item-count">{{item.quantity}}件</span>
      <span class="item-count">{{item.weight}}吨</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "GoodsCard",
  props: ["carddata"],
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.goodsCard {
  .card();
  .title {
    .title();
  }
  .item {
    width: 315px;
    padding: 0 19px;
    height: auto;
    margin-top: 8px;
    .flex(row, space-between);
    &-title {
      min-width: 70px;
      //   max-width: 105px;
    }
    &-count {
      //   max-width: 45px;
      min-width: 40px;
    }
  }
}
</style>