<template>
  <div class="manage">
    <div class="manage-title">
      <van-cell
        title="新增职员权限"
        title-class="addtitle"
        @click="$router.push({name:'addper'})"
      >
        <van-icon
          slot="right-icon"
          name="plus"
          style="line-height: inherit;"
          size="5.33vw"
          color="#666666"
        />
      </van-cell>
    </div>
    <div class="manage-main">
      <managelist  />
    </div>
  </div>
</template>
<script>
import { Cell, Icon } from "vant";
import Manage from "../../components/mine/Manage";

export default {
  name: "manage",
  components: {
    [Cell.name]: Cell,
    [Icon.name]: Icon,
    managelist: Manage,
  },
  data() {
    return {
     
    };
  },
  methods: {

  }
};
</script>

<style lang="less" scoped>
.manage {
  color: #333333;
  font-size: 14px;
}
.manage-main {
  margin-top: 10px;
}
</style>
