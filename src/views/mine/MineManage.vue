<template>
  <div class="manage">
    <div class="manage-title" >
      <van-cell title="新增职员权限" title-class="addtitle" @click="addPer">
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
            <van-cell title="张三" border>
            <template slot="default">
                <span class="edit">编辑</span>
                <span class="allocation">权限设置</span>
            </template>
            </van-cell>
             <van-cell title="张三" border>
            <template slot="default">
                <span class="edit">编辑</span>
                <span class="allocation">权限设置</span>
            </template>
            </van-cell>
             <van-cell title="张三" border>
            <template slot="default">
                <span class="edit">编辑</span>
                <span class="allocation">权限设置</span>
            </template>
            </van-cell>
     </div>
  </div>
</template>
<script>
import { Cell, Icon } from "vant";
export default {
  name: "manage",
  components: {
    [Cell.name]: Cell,
    [Icon.name]: Icon
  },
  methods: {
      //新增人员权限
      addPer(){

      }
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
.edit{
margin-right: 10px;
}
.edit,.allocation{
  
     color: #333333;
     font-size:13px;
}


</style>
