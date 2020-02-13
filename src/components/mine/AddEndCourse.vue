<template>
    <div class="main">
        <div class="main-mid">
        <van-tabs v-model="active" sticky >
        <van-tab title="省份">
            <div class="card" >
                   <div class="pro-list" v-for="(item,index) in areaList" :key="index" @click="isPro(item,index)" :class="{ active:index==current1}">{{item.name}}
                </div>
            </div>
        </van-tab>
        <van-tab title="城市">
            <div class="card" >
                <div class="pro-list "
                 v-for="(item,index) in cityList" 
                 :key="index"
                  @click="isCity(item,index)"
                   :class="{ active:index==current}" >{{item.name}} 
                </div>
                 <van-button type="info" class="main-footer-btn" @click="endCourse">确定</van-button>
            </div>
                </van-tab>
        </van-tabs>
        </div>
    </div>
</template>
<script>
import { Tab, Tabs,Button,Toast } from 'vant';
import link from "../../uitls/js/link";

import areaList  from '../../assets/js/area.js';
export default {
name:'start',
components:{
    [Tab.name]:Tab,
    [Tabs.name]:Tabs,
    [Button.name]:Button,
     [Toast.name]:Toast
},
props:['start'],
data(){
  return{
       active:0,
      areaList:[],
      cityList:[],
      cityList1:{},
      cityList2:{},
      current:200,
      current1:200,
      city:"",
      area:"",
      show:false
  }
},
created() {
     this.current=200,
      this.current1=200,
    this.init()
  
},
methods: {

 init () {
      // 初始化地址选择器
      //拼音首字母排序
      for(let i in areaList.province_list){
        let k = {}
     k.id=i;
     k.name=areaList.province_list[i]
      this.areaList.push(k)
      }
   this.areaList=this.areaList.sort((a,b)=>
       a.name.localeCompare(b.name, 'zh-Hans-CN', {sensitivity: 'accent'})
    )
      this.cityList1 = areaList.city_list
      this.cityList2 = areaList.county_list
    },
    //选择省
    isPro(item,index){
      this.area=item.name
        //选中效果
this.current1=index
     this.cityList=[]
           item.id= item.id.substr(0,2)
       let patt = /^\d{2}/g;
       let patt1 = /^\d{5}/g
      for(let i in this.cityList1){
        let k={}
         if(i.match(patt)==item.id){
           if(i=='429000'|| i=='659000'||i=='469000'){
               let a =i.substr(0,5)
              for(let x  in this.cityList2){
                let c={}
                    if(x.match(patt1)==a){
                      c.id=x;
                      c.name=this.cityList2[x]
                     this.cityList.push(c)
                    }
              }
           }else{
          k.id=i;
          k.name=this.cityList1[i]
          this.cityList.push(k)
           }
         }
      }
      this.cityList=this.cityList.sort((a,b)=>
       a.name.localeCompare(b.name, 'zh-Hans-CN', {sensitivity: 'accent'})
    )
    this.current=200
      this.active=1
    },
    //选择市
     isCity(item,index){
       this.city=item.name
    this.current=index
    },
    endCourse(){
       this.current=200
      this.current1=200
      this.active=0
      let transObj={
        startAdd:this.start,
        endAdd:this.area+this.city
      }
      this.$api.post(link.addTransLine,transObj).then(res=>{
        Toast.success("添加成功")
           this.$emit("endAdd",this.show)
      }).catch(err=>{
        Toast.error('添加失败，请重试');
           this.$emit("endAdd",this.show)
      })
    }
},

}
</script>
<style lang="less" scoped>
.main {
  &-mid {
    width: 100%;
    padding-bottom: 65px;
    /deep/.van-tabs__nav {
      padding-left: 10vw;
      padding-right: 10vw;
    }
    /deep/.van-pull-refresh__track {
      min-height: e("calc(100vh - 260px)");
    }
    /deep/.van-tabs__line {
      background-color: rgba(45, 130, 255, 1);
    }
    /deep/.van-tab {
      .font();
      line-height: 40px;
    }
    /deep/.van-tab--active {
      color: rgba(45, 130, 255, 1);
    }
  }
          &-footer-btn{
            position: fixed;
            bottom: 0;
            width: 100%;
            height:40px;
            font-size:15px;
            line-height: 40px
        }
}
.card{
    display: flex;
    flex-wrap: wrap;
    padding: 0 0 0 5px;
    margin:  0 auto
}
.pro-list{
box-sizing: border-box;
display: flex;
align-items: center;
justify-content: center;
margin: 15px 0 0 15px;
width:100px;
height:45px;
background:rgba(255,255,255,1);
border-radius:5px;
text-align: center;
}
.active{
   border: 1px solid #2D82FF
}
</style>