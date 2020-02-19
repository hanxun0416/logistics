<template>
  <div class="proset">
      <!-- 报价 -->
    <van-cell-group title="报价">
      <van-cell title="待报价"  label="用于查看/操作需求订单的报价">
        <van-switch slot="right-icon"  v-model="offer" size='5vw' inactive-color="#B3B3B3" />
      </van-cell>
        <van-cell title="已报价"  label="用于查看已报价的订单">
        <van-switch slot="right-icon"  v-model="offered" size='5vw' inactive-color="#B3B3B3" />
      </van-cell>
    </van-cell-group>
    <!-- 订单 -->
     <van-cell-group title="订单">
      <van-cell title="待派车"  label="用于查看/操作待派车的订单">
        <van-switch slot="right-icon"  v-model="dispatch" size='5vw' inactive-color="#B3B3B3" />
      </van-cell>
        <van-cell title="待提货"  label="用于查看/操作待提货的订单">
        <van-switch slot="right-icon"  v-model="pickup" size='5vw' inactive-color="#B3B3B3" />
      </van-cell>
       <van-cell title="待传单据"  label="用于查看/操作已运输订单的单据上传" > 
              <van-switch slot="right-icon"  v-model="bill" size='5vw' inactive-color="#B3B3B3" />
      </van-cell>
       <van-cell title="已签收"  label="用于查看已运输签收的订单">
        <van-switch slot="right-icon"  v-model="signed" size='5vw' inactive-color="#B3B3B3" />
      </van-cell>
    </van-cell-group>
    <!-- 结算 -->
     <van-cell-group title="结算">
      <van-cell title="对账管理"  label="用于查看/操作订单对账结算">
        <van-switch slot="right-icon"  v-model="settlemach" size='5vw' inactive-color="#B3B3B3" />
      </van-cell>
        <van-cell title="开票管理"  label="用于查看/操作订单发票信息录入与发票上传">
        <van-switch slot="right-icon"  v-model="invoice" size='5vw' inactive-color="#B3B3B3" />
      </van-cell>
    </van-cell-group>
    <!-- 个人中心 -->
         <van-cell-group title="个人中心">
      <van-cell title="车辆管理"  label="用于查看/操作车辆、司机信息">
        <van-switch slot="right-icon"  v-model="minecar" size='5vw' inactive-color="#B3B3B3" />
      </van-cell>
        <van-cell title="运输路线"  label="用于查看/操作运输路线">
        <van-switch slot="right-icon"  v-model="minetran" size='5vw' inactive-color="#B3B3B3" />
      </van-cell>
       <van-cell title="我的资料"  label="用于查看公司基本信息" > 
              <van-switch slot="right-icon"  v-model="mineinfo" size='5vw' inactive-color="#B3B3B3" />
      </van-cell>
       <van-cell title="乐刚开票/邮寄信息"  label="用于查看乐刚开票/邮寄信息">
        <van-switch slot="right-icon"  v-model="lginfo" size='5vw' inactive-color="#B3B3B3" />
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
import { Cell, CellGroup,Button,Switch } from 'vant';
export default {
    data() {
        return {
            offer:false, //待报价
            offered:true, //已报价
            dispatch:false,//待派车
            pickup:false,//待提货
            bill:true,//待传单据
            signed:true,//已签收
            settlemach:false, //对账管理
            invoice:false,//开票管理
            minecar:true, //车辆管理
            minetran:false,//运输路线
            mineinfo:false, //我的资料
            lginfo:true //乐刚开票信息
        }
    },
    components:{
        [Cell.name]:Cell,
        [CellGroup.name]:CellGroup,
        [Button.name]:Button,
        [Switch.name]:Switch,
    }
};
</script>

<style lang="less" scoped>
.proset .van-cell-group__title{
font-size:13px;
font-family:Source Han Sans SC;
font-weight:400;
color:rgba(153,153,153,1);
line-height:20px;
padding-top: 11px;
}
.proset  .van-cell__title span{
font-size:14px;
font-family:Source Han Sans SC;
font-weight:400;
color:rgba(51,51,51,1);
line-height:20px;
}
.proset  .van-cell__label{
font-size:12px;
font-family:Source Han Sans SC;
font-weight:400;
color:rgba(204,204,204,1);
line-height:20px;
}
</style>
