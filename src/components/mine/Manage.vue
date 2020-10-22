<template>
    <div class="perlist">
          <van-cell title="张三" border>
            <template slot="default">
                <span class="edit" @click="openMod">编辑</span>
                <span class="allocation" @click="openProSet">权限设置</span>
            </template>
            </van-cell>
    </div>
</template>
<script>
import { Cell } from "vant";
export default {
    components:{
        [Cell.name]:Cell
    },
    data() {
        return {
        }
    },
    methods: {
        // 打开编辑弹窗
        openMod(){
            this.$router.push({name:'modification'})
        },
        openProSet(){
             this.$router.push({name:'proset'})
        }
    },

}
</script>
<style lang="less" scoped>
.perlist{
    border-bottom: 1px solid #ebedf0;
    width: 375px;
}
.edit{
margin-right: 10px;
}
.edit,.allocation{
     color: #333333;
     font-size:13px;
}
</style>