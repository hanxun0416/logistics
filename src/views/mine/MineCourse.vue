<template>
    <div class="main" id="carCard">
        <div class="main-head">
             <van-checkbox v-model="checked">全国各路线</van-checkbox>
        </div>
        <div class="main-mid" v-if="card.length!=0">
             <h4>您已添加{{card.length}}条路线</h4>
             <div v-for="(item) in card" :key="item.id" >
       <course :carddata="item"  @deleteCourse="deleteCourse" ref="" > </course>
            </div>
        </div>
        <div class="main-mid nomsg" v-else>
            <img src="../../assets/mine/wuxiaoxi.png">
            <div>暂未添加任何运输线路!</div>
        </div>
           <div class="main-footer">
                <van-button type="info" class="main-footer-btn" @click="addTrans">添加路线</van-button>
           </div>
            <van-popup v-model="showStrat" class="transpopup"><addCourse @startAdd='startAdd'></addCourse></van-popup> 
            <van-popup v-model="showEnd" class="transpopup"><add-end @endAdd='endAdd' :start="start"></add-end></van-popup> 
        </div>
</template>
<script>
import Course from '../../components/mine/Course';
import AddCourse from '../../components/mine/AddCourse';
import AddEndCourse from '../../components/mine/AddEndCourse';

import link from "../../uitls/js/link";
import store from "../../store/index";
import { Checkbox,CheckboxGroup,Field,Button,ActionSheet,SwipeCell,Toast,Popup } from 'vant'
export default {
    data(){
        return{
            checked:false,
            isRouterAlive: true,
            card:[],
            start:"",
            showStrat:false,
             showEnd:false,
        }
    },
    components:{
        [Checkbox.name]:Checkbox,
        [CheckboxGroup.name]:CheckboxGroup,
        [Field.name]:Field,
        [Button.name]:Button,
        [ActionSheet.name]:ActionSheet,
        [Toast.name]:Toast,
        [Popup.name]:Popup,
        'course':Course,
         'addCourse':AddCourse,
        'addEnd':AddEndCourse
    },

    created() {
        this.getTransLine()
  },
    methods: {
         addTrans(){
           this.showStrat=true
            },
        getTransLine(){
            let postObj = {
            corpID: '71536'
            };
             this.$api.post(link.TransLine,postObj).then(res=>{
                 this.card=res.data.data
            })
            },

 startAdd(startAdd){
        this.start=startAdd;
        this.showStrat=false
        console.log(this.start)
        this.showEnd=true
 },
 endAdd(flag){
this.showEnd=flag
  this.getTransLine();
 },
deleteCourse(id){
            // console.log(id)
            let deleteObj={
            id,
             status:1,
            }
             this.$api.post(link.updateTransLine,deleteObj).then(res=>{
        if (res.data.code == "200") {
            Toast.success("删除成功");
           this.getTransLine();

          }
     })
}
    },
}
</script>
<style lang="less" scoped>
 .main{
     overflow-x: hidden;
     display: flex;
     flex-direction: column;
     align-items: center;
    &-head{
            width: 100%;
            background: #fff;
            display: flex;
            align-items: center;
            padding: 15px 0 15px 20.5px;
            // padding-left: 20.5px;
            // height: 45px;
            font-size:14px;
            font-weight:500;
            color:rgba(51,51,51,1);
    }
    &-mid{
        margin-bottom: 42px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #F0F0F0;
         h4{
             padding: 13px 0 5px 19px;
             margin: 0;
             width: 100%;
             background: #F0F0F0;
             height:15px;
             font-size:11px;
             font-weight:400;
             color:rgba(179,179,179,1);
         }

        }
        &-footer{
            position: fixed;
            bottom: 0;
            width: 100%;
            height:40px;
            &-btn{
                width: 100%;
                font-size:15px;
                line-height: 40px
            }
        }
} 
.main .nomsg{
    flex: 1;
    background: #F0F0F0;
    img{
        margin-top: 100px;
        width: 190px;
        height: 150px;
    }
    div{
height:14.5px;
font-size:14px;
color:rgba(162,162,162,1);
    }
}


</style>

<style >
#carCard .transpopup{
    width: 100%;
    height: 100%;
    background: #F0F0F0;
    overflow-x: hidden
}
 </style>
