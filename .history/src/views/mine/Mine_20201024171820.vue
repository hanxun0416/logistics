<template>
    <div class="main">
          <!-- <van-cell title="职员权限" is-link  to="/mineManage"/> -->
        <van-cell title="车辆管理" is-link  to="/mineCar"/>
         <van-cell title="运输路线" is-link to="/mineCourse" />
        <van-cell title="我的资料" is-link to="/mineInfo" />
        <van-cell title="乐刚开票/邮寄信息" is-link to="/mineInvoice" />
        <van-button type="info" @click="show=true" class="exit">退出登录</van-button>
        <van-action-sheet
        v-model="show"
        :actions="actions"
        cancel-text="取消"
        @cancel="show=false"
        @select="onSelect"
        round
        class="exit-pupor"
        />
    </div>
</template>
<script>
import { Cell,Button,ActionSheet    } from "vant";
import store from "../../store/index";

export default {
    name: "mine",
    data(){
        return{
        show:false,
        actions: [
        { name: '确定要退出登录吗?'},
        { name: '确定',color:'#2D82FF'},
      ]
        }
    },
    components: {
        [Cell.name]: Cell,
        [Button.name]:Button,
        [ActionSheet.name]:ActionSheet
    },
    methods: {
        onSelect(item,index){
            if(index){
             store.commit("login/removeToken");
             this.$router.push({name:'login'})
            }
        }
    },
};
</script>
<style lang="less" scoped>
.main{
    display: flex;
    flex-direction: column;
   align-items: center
}
.exit{
    width: 100%;
    margin-top: 100px;
}
.exit-pupor{
    background-color: transparent;
    width: 355px;
    left: auto;
    .van-action-sheet__item:nth-child(2){
                border-radius: 0 0 5.33333vw 5.33333vw;
    }
    .van-action-sheet__cancel{
      margin-top: 10px;
    border-radius: 5.33333vw 5.33333vw 5.33333vw 5.33333vw;
    margin-bottom: 10px;
    overflow: hidden;
    }
     .van-action-sheet__cancel::before{
    content: none
 }

}

</style>
<style>

 </style>