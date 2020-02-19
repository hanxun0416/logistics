<template>
  <div class="manage">
    <div class="manage-title" >
      <van-cell title="新增职员权限" title-class="addtitle" @click="addPerShow=true">
        <van-icon
          slot="right-icon"
          name="plus"
          style="line-height: inherit;"
          size="5.33vw"
          color="#666666"
        />
      </van-cell>
         <van-popup v-model="addPerShow" class="addPerShow"  safe-area-inset-bottom >
                <addper></addper>
             </van-popup>
    </div>
     <div class="manage-main">
         <managelist />
         <managelist />
         <managelist />
  </div>
  </div>
</template>
<script>
import { Cell, Icon,Popup } from "vant";
import AddPer from '../../components/mine/AddPer'
import Modification from '../../components/mine/Modification'
import Manage from '../../components/mine/Manage'

export default {
  name: "manage",
  components: {
    [Cell.name]: Cell,
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    'addper':AddPer,
    'modification':Modification,
    'managelist':Manage,
  },
  data() {
      return {
          addPerShow:false  
      }
  },
  methods: {
  },
};
</script>

<style lang="less" scoped>
.manage{
     color: #333333;
    font-size: 14px;
}
.manage-main{
    margin-top: 10px;
}

.addPerShow{
    width: 376px;
    height: 100%;
    background: #F0F0F0;
    overflow: hidden;
}

</style>

