<template>
    <div class="perlist">
          <van-cell title="张三" border>
            <template slot="default">
                <span class="edit">编辑</span>
                <span class="allocation">权限设置</span>
            </template>
            </van-cell>
    </div>
</template>
<script>
import { Cell } from "vant";
export default {
    data() {
        return {
        }
    },
    components:{
        [Cell.name]:Cell
    }
}
</script>
<style lang="less" scoped>
.perlist{
    border-bottom: 1px solid #ebedf0;
    width: 375px;
// box-sizing: border-box;
// padding-left:10px ;

}
.edit{
margin-right: 10px;
}
.edit,.allocation{
     color: #333333;
     font-size:13px;
}
</style>