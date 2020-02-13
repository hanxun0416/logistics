<template>
  <div class="home">
    <router-view></router-view>
    <van-tabbar route style="z-index: 1999; position: fixed ">
      <van-tabbar-item replace to="/offer">
        <span>报价</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon[0].active : icon[0].normal" />
      </van-tabbar-item>
      <van-tabbar-item replace to="/order">
        <span>订单</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon[1].active : icon[1].normal" />
      </van-tabbar-item>
      <van-tabbar-item replace to="/settlement">
        <span>结算</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon[2].active : icon[2].normal" />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// @ is an alias to /src
import { Tabbar, TabbarItem } from "vant";
export default {
  name: "home",
  data() {
    return {
      icon: [
        {
          normal: require("../assets/offer/baojia.png"),
          active: require("../assets/offer/baojia-active.png")
        },
        {
          normal: require("../assets/offer/dingdan.png"),
          active: require("../assets/offer/dingdan-active.png")
        },
        {
          normal: require("../assets/offer/jiesuan.png"),
          active: require("../assets/offer/jiesuan-active.png")
        }
      ]
    };
  },
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
};
</script>
<style lang="less" scoped>
.home {
  min-height: 100%;
}
</style>
