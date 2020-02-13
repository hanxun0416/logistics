<template>
  <div class="carCard">
    <van-swipe-cell>
      <div class="carInfo">
        <div>
          <img src="../../assets/mine/carid.png" />
          <span>车号</span>
          <span>{{carddata.carId}}</span>
        </div>
        <div>
          <img src="../../assets/mine/siji.png" />
          <span>司机</span>
          <span>{{carddata.name}}</span>
        </div>
        <div>
          <img src="../../assets/mine/mobile.png" />
          <span>联系方式</span>
          <span>{{carddata.mobile}}</span>
        </div>
      </div>
      <template slot="right">
        <div class="delete" ref="delete" @click="deleteCar()">
          <span style="display:block;margin-bottom:6px">删除</span>
          <img style="display:block;width:18px;margin:0 auto" src="../../assets/mine/delete.png" />
        </div>
      </template>
    </van-swipe-cell>
  </div>
</template>
<script>
import { SwipeCell, Cell, Button } from "vant";
export default {
  name: "MineCarCard",
  props: ["carddata"],
  components: {
    [SwipeCell.name]: SwipeCell,
    [Cell.name]: Cell,
    [Button.name]: Button
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    deleteCar(){
       this.$emit("deleteCar",this.carddata.id)
    }
  }
};
</script>
<style lang="less" scoped>
.carCard {
  width: 355px;
  margin: 0 auto;
  overflow-x: hidden;
  position: relative;
  height: 120px;
  .delete {
    .flex(column, center);
    width: 100px;
    height: 120px;
    text-align: center;
    .font(14px, 400, @font-color-gray);
  }
  .carInfo {
    .flex(column, space-between);
    .font(14px, 400, rgba(51, 51, 51, 1));
    width: 355px;
    height: 80px;
    padding: 20px 0;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 10px 0px rgba(192, 218, 255, 0.6);
    border-radius: 5px;
    img {
      width: 18px;
      height: auto;
      margin: 0 8px;
    }
    span {
      display: inline-block;
      min-width: 94px;
      max-width: 200px;
    }
  }
}
</style>