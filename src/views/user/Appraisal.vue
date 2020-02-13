<template>
    <div class="real" id="real">
        <!-- 公司信息 -->
       <div class="real-mid">
       <h4>公司信息</h4>
       <van-divider borderColor="#E6E6E6" style="margin:0;height:2px" hairline />
       <div class="real-mid-field">
        <van-field v-model="applyTrans.corp" ref="corp" label="公司名称" class="real-mid-field-inp" placeholder="请输入公司名称" type="text" clearable name="applyTrans.corp" required> </van-field>
        <van-field
           label="公司税号"
          v-model="custMap.taxNo"
          class="real-mid-field-inp"
          placeholder="请输入公司税号"
          type="text"
          clearable
          name="custMap.taxNo"
          required
        >
        </van-field>

<van-field
  readonly
  clickable
     class="real-mid-field-inp real-mid-field-bom"
  label="注册地址"
  :value="carmodel"
  placeholder="省/市/区"
  @click="isShow = true"
  required

/>
<van-popup v-model="isShow" position="bottom">
 <van-area
  :area-list="areaList"
  :columns-placeholder="['请选择', '请选择', '请选择']"
  :columns-num="3"
  @confirm="changeAddress"
  @cancel="isShow=false"
/>
</van-popup>
        <van-field
        label=""
          v-model="custMap.real_Addr"
          class="real-mid-field-inp"
          placeholder="请输入详细地址"
          type="text"
          clearable
          required
      />
        <van-field
  readonly
  clickable
  class="real-mid-field-inp real-mid-field-bom"
  label="联系地址"
  :value="carmodel1"
  placeholder="省/市/区"
  @click="isShow3 = true"
  required
/>
<van-popup v-model="isShow3" position="bottom">
 <van-area
  :area-list="areaList"
  :columns-placeholder="['请选择', '请选择', '请选择']"
  :columns-num="3"
  @confirm="changeAddress1"
  @cancel="isShow=false"
/>

</van-popup>
        <van-field
        label=""
          v-model="applyTrans.corpAddress"
          class="real-mid-field-inp"
          placeholder="请输入详细地址"
          type="text"
          clearable
          required
        >
        </van-field>
                <van-field
           label="开户银行"
          v-model="applyTrans.bankAccount"
          class="real-mid-field-inp"
          placeholder="请输入开户银行"
          type="text"
          name="applyTrans.bankAccount"
          clearable
          required
        >
        </van-field>
                <van-field
           label="银行账号"
          v-model="applyTrans.accountNo"
          class="real-mid-field-inp"
          placeholder="请输入银行账号"
          type="text"
          name="applyTrans.accountNo"
          clearable
          required
        >
        </van-field>
        </div>
      </div>
       
      <!-- 入驻附件上传 -->
       <div class="real-mid">
             <van-row  type="flex" justify="space-between">
  <van-col span="12" class="real-mid-left">入驻附件上传</van-col>
  <van-col span="12" class="real-mid-right">注：请上传8M内的图片</van-col>
</van-row>
       <!-- <h4>入驻附件上传</h4> -->
       <van-divider borderColor="#E6E6E6" style="margin:0;height:2px" hairline />
       <div class="real-mid-field">
        
         <div class="real-mid-field-upload">
        <h5>开户资料</h5>
       <van-uploader
        v-model="trad1"
        :max-count="10"
        upload-text="添加图片"  
        multiple
        @oversize="oversize" />
         <div class="maxsize">注:最多添加10张</div>
        </div>
         <div class="real-mid-field-upload">
         <h5>运输资质证件/货运代理资格证书</h5>
       <van-uploader
        v-model="trad2"
        :max-count="10"
        multiple
        upload-text="添加图片"          
        @oversize="oversize"
/>
 <div class="maxsize">注:最多添加10张</div>
        </div>
         <div class="real-mid-field-upload">
               <h5>车辆行驶证</h5>
       <van-uploader
        v-model="trad3"
        :max-count="20"
        upload-text="添加图片"     
        multiple
        @oversize="oversize"
/>
 <div class="maxsize">注:最多添加20张</div>
        </div> 
          <!-- <h5>实名认证授权书</h5> -->
            <div class="real-mid-field-upload" v-if="isRealName">
                  <van-row  type="flex" justify="space-between">
  <van-col span="12" class="real-mid-field-upload-left1">实名认证授权书</van-col>
  <van-col span="12" class="real-mid-field-upload-right1 real-right" @click="downLoad(4)">下载授权委托书</van-col>
</van-row>
       <van-uploader
        v-model="trad5"
        :max-count="10" 
        upload-text="添加图片"  @oversize="oversize" multiple/>
         <div class="maxsize">注:最多添加10张</div>
        </div>
         <div class="real-mid-field-upload">
             <van-row  type="flex" justify="space-between">
  <van-col span="12" class="real-mid-field-upload-left1">运输合同/订舱合同</van-col>
  <van-col span="12" class="real-mid-field-upload-right1" @click="downLoad(1)">下载运输合同</van-col>
   <van-col span="12" class="real-mid-field-upload-right1" @click="downLoad(2)">下载订舱合同</van-col>
</van-row>
               <!-- <h5>运输合同/订舱合同</h5> -->
       <van-uploader
        v-model="trad4"
        :max-count="10"
        upload-text="添加图片"  
        @oversize="oversize" 
        multiple
        />
         <div class="maxsize">注:最多添加10张</div>
</div>
        </div>
      </div>
      <!-- 选择现场评审人员 -->
          <van-field
  readonly
  clickable
  label="选择现场评审人员"
  :value="applyTrans.selectOperator"
  placeholder="指定金牌商家/由平台分配"
  @click="isShow1 = true"
  class="real-mid-choose"
  name="applySupplier.selectOperator"
/>

<van-action-sheet v-model="isShow1" :actions="actions" @select="onSelect" value=" "  cancel-text="取消"/>
       <van-overlay :show="a">
  <div class="wrapper">
    <van-search placeholder="请输入搜索关键词" v-model="image.custName"   show-action  @cancel="clickLeft"   @input="sceneReview"/>
    <div class="sear">
      <div class="sear-card" @click="clickHandle1(item.custName,item.custID)" v-for="item in imageList" :key="item.id">
       <div><span class="name">{{item.custName}}</span>—<span class="dz">{{item.area}}</span></div><van-icon name="success" color="#666" />
      </div>
    </div>
  </div>
</van-overlay>
<van-button type="info" class="real-mid-field-btn" @click="submit">提交注册评审</van-button>

    </div>
</template>
<script>
import { Field, Icon, Button, Toast ,Row, Col ,NavBar,Divider ,Area,Popup,Cell,Uploader,Picker ,Overlay,Search,ActionSheet,Dialog } from "vant";
import areaList  from '../../assets/js/area.js';
import axios from 'axios'
import link from '../../uitls/js/link'
import { downloadFileByBase64 } from "../../uitls/js/dataToFile";
export default {
    name:'realName',
   data(){
        return{
             url:"",
             mobile:"",
             areaList: {},
             isRealName:true,
             isShow:false, //注册地址选择框
             isShow1:false, //现场评审人员选择框
             isShow2:false, //金牌商家选择框
             isShow3:false,
             a:false,
             trad1:[], //开户资料
             trad2:[],//运输资质证件/货运代理资格证书
             trad3:[], //车辆行驶证
             trad4:[],//运输合同/订舱合同
             trad5:[],//实名认证授权书
             carmodel:"",  //注册地址
             carmodel1:"", //联系地址
             actions: [
                       { name: '指定金牌商家'},
                       { name: '由平台分配'},
                       ],
            applyName:"",
             applyTrans:{
                id:"",
                corp:"", //公司名称
                custContact:"" ,//联系人
                custMobile:'',//手机号
                accountNo:"",//开户账号
                bankAccount:"",//开户银行
                provinceID:"",//联系地址省id
                provinceName:"",//联系地址省
                cityID:"",//联系地址市id
                cityName:"",//联系地址市
                areaID:"",//联系地址区id
                areaName:"",//联系地址区
                corpAddress:"",//联系地址
                isSelect:'0',//是否自选评审人员
                selectOperatorID:"",//评审id
                selectOperator:""//评审姓名
         },
         custMap:{
            cardNO:"",//身份证号
            taxNo:"",//公司税号
            realProvinceID:"",//注册地址省id
            realProvince:'',//注册地址省
            realCityID:"",//注册地址市id
            realCity:"",//注册地址市
            realAreaID:"",//注册地址区id
            realArea:"",//注册地址区
            real_Addr:"" ,//注册地址
            fromUserName:"", //金牌商家姓名
            fromUserId:"",//金牌商家id
         },
         image:{
           custName:""
         },
         imageList:[],
         token:""
        }
    },
    components: {
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col,
    [NavBar.name]: NavBar,
    [Divider.name]: Divider,
    [Area.name]: Area,
    [Popup.name]: Popup,
    [Cell.name]: Cell,
    [Uploader.name]: Uploader,
    [Picker.name]: Picker,
    [Overlay.name]:Overlay,
    [Search.name]:Search,
    [ActionSheet.name]:ActionSheet,
  },
    created() {
      this.init();
      this.$api.post(link.reviewInfo).then(res=>{
       if(res.data.code==200){
         if(res.data.data.lastApplyTrans){
   if(res.data.data.lastApplyTrans.permit=='0'){ 
        this.$router.push({name:'login'})
          Dialog.alert({
           message: '正在进行审核中,请您耐心等待'
              }).then(() => {
          });
        }
           if(res.data.data.lastApplyTrans.permit=='2'){
          Dialog.alert({
           message: '您的审核未通过,请您重新申请'
              })
        }
         }
         let {custMap} = res.data.data
          this.applyTrans.corp = custMap.corp  //公司名称
         this.applyTrans.accountNo = custMap.accountNo //开户账号
         this.applyTrans.bankAccount=custMap.bankofposit //开户银行
          this.custMap.taxNo = custMap.taxNo
        }

         this.mobile = res.data.data.custMap.mobile
         this.applyTrans.id = res.data.data.applyID
         this.applyName =res.data.data.applyRealNameID

});
let fielObj={
         tableNum:'1',
         nodeID:'27', //授权书
         applyID:this.applyName
       }
  this.$api.post(link.queryFiles,fielObj).then(res=>{
          if(res.data.code=='200'){
            if(res.data.data.fileList.length){
               for(let index=0;index<res.data.data.fileList.length;index++){
                 this.trad5[index].content=res.data.data.fileList[index].fileUrl
                 this.trad5[index].fuke=res.data.data.fileList[index].showFileName
               }
            }
          }
})
  },
    methods: {
      onClickLeft(){
          this.$router.go(-1)
      },
       init () {
      // 初始化地址选择器
      this.areaList = areaList // 初始化选择器数据
    },

  // 现场评审人员选择
   onSelect(item,index){
       switch(index){
         case 0:this.a =true;       this.imageList=[]
      let data= {
    'image.custName':null
     }
    axios({
      method:'post',
      url:link.sceneReview,
      data
    }).then(res=>{
      this.imageList=res.data.data.imageList
    });break;
         case 1:this.applyTrans.selectOperator=item.name;this.applyTrans.selectOperatorId='';  this.applyTrans.isSelect = '0';break
       }
        this.isShow1=false
    },
   //现场评审人员--金牌商家
clickHandle1(name,id){
  this.applyTrans.isSelect = '1'
  this.applyTrans.selectOperatorID=id
  this.applyTrans.selectOperator=name
  this.imageList=[]
  this.image.custName=""
  this.a=false
},
sceneReview(){
  if(this.image.custName.trim()==""){
        this.imageList=[]
      let data= {
    'image.custName': ''
     }
    axios({
      method:'post',
      url:link.sceneReview,
      data
    }).then(res=>{
      this.imageList=res.data.data.imageList
    })
    return
  }
  let data= {
    'image.custName': this.image.custName
     }
axios({
  method:'post',
  url:link.sceneReview,
  data
}).then(res=>{
  this.imageList= res.data.data.imageList
})
},
    // 注册地址选择
changeAddress(value){
      let areaName = ''
        for (var i = 0; i < value.length; i++) {
          if(value[i].name){
              if(i==0){
                this.custMap.realProvinceID==""
                 this.custMap.realProvince==""
               this.custMap.realProvinceID=value[i].code;
               this.custMap.realProvince=value[i].name
             }
          if(i==1){
            this.custMap.realCityID==""
             this.custMap.realCity==""
            this.custMap.realCityID=value[i].code;
            this.custMap.realCity=value[i].name
          }
          if(i==2){
            this.custMap.realAreaID==""
            this.custMap.realArea==""
            this.custMap.realAreaID=value[i].code;
            this.custMap.realArea=value[i].name
          }
             areaName  += value[i].name + ' '
          } else{
             break
          }
      }
      this.carmodel = areaName
      this.isShow = false;
    },
    // 联系地址选择
    changeAddress1(value){
      let areaName1 = ''
        for (var i = 0; i < value.length; i++) {
          if(value[i].name){
               if(i==0){
                this.applyTrans.provinceID==""
                 this.applyTrans.provinceName==""
               this.applyTrans.provinceID=value[i].code;
               this.applyTrans.provinceName=value[i].name
             }
          if(i==1){
            this.applyTrans.cityID==""
             this.applyTrans.cityName==""
            this.applyTrans.cityID=value[i].code;
            this.applyTrans.cityName=value[i].name
          }
          if(i==2){
            this.applyTrans.areaID==""
            this.applyTrans.areaName==""
            this.applyTrans.areaID=value[i].code;
            this.applyTrans.areaName=value[i].name
          }

             areaName1= areaName1 + value[i].name + ' '
          } else{
             break
          } 
      }
      this.carmodel1 = areaName1
      this.isShow3 = false;
    },
    submit(){
     
     if(this.applyTrans.corp.trim()==""){
       Toast.fail('请输入公司名称！')
       return;
     }
      if(this.custMap.taxNo.trim()==""){
       Toast.fail('请输入公司税号！')
       return;
     }
    if(this.applyTrans.accountNo.trim()==""){
       Toast.fail('请输入开户账号!')
       return;
     }
    if(this.applyTrans.bankAccount.trim()==""){
       Toast.fail('请输入开户银行!')
       return;
     }
    if(this.applyTrans.areaName.trim()==""||this.custMap.realArea.trim()==""||this.applyTrans.corpAddress==""||this.custMap.real_Addr.trim()==""){
       Toast.fail('请输入地址!')
       return;
     }
      if(this.applyTrans.selectOperator.trim()==""){
       Toast.fail('请选择评审人员！')
       return;
     }

      if(!this.trad1.length||!this.trad2.length||!this.trad3.length||!this.trad4.length){
           Toast.fail('请上传合同！')
           return;
     }
    if(this.isRealName){
      if(!this.trad5.length){
          Toast.fail('请上传实名认证授权书!')
           return;
      }
    }

        Toast.loading('正在提交申请，请稍等...')
        let imgList = [];
        //开户资料
         for (let index = 0; index < this.trad1.length; index++) {
         let imgObj = {
          content: this.trad1[index].content,
          fileName: this.trad1[index].file.name,
          nodeID: "1",
          tabletdID: "10",
          sceneType: "12",
          tableName: "lg_pickbillmain",
          fileGUID: this.applyName
        };
        imgList.push(imgObj);
       };
         //运输资质证件/货运代理资格证书  
     for (let index = 0; index < this.trad2.length; index++) {
         let imgObj = {
          content: this.trad2[index].content,
          fileName: this.trad2[index].file.name,
          nodeID: "1",
          tabletdID: "13",
          sceneType: "2",
          tableName: "lg_pickbillmain",
          fileGUID: this.applyName
        };
        imgList.push(imgObj);
       };
       //车辆行驶证
            for (let index = 0; index < this.trad3.length; index++) {
         let imgObj = {
          content: this.trad3[index].content,
          fileName: this.trad3[index].file.name,
          nodeID: "1",
          tabletdID: "3",
          sceneType: "2",
          tableName: "lg_pickbillmain",
          fileGUID: this.applyName
        };
        imgList.push(imgObj);
       }
              //运输合同/订舱合同
  for (let index = 0; index < this.trad4.length; index++) {
         let imgObj = {
          content: this.trad4[index].content,
          fileName: this.trad4[index].file.name,
          nodeID: "1",
          tabletdID: "6",
          sceneType: "2",
          tableName: "lg_pickbillmain",
          fileGUID: this.applyName
        };
        imgList.push(imgObj);
       }
       //授权书
    if(this.isRealName){
        for (let index = 0; index < this.trad5.length; index++) {
         let imgObj = {
          content: this.trad5[index].content,
          fileName: this.trad5[index].file.name,
          nodeID: "1",
          tabletdID: "27",
          sceneType: "2",
          tableName: "lg_pickbillmain",
          fileGUID: this.applyName
        };
        imgList.push(imgObj);
       }
    }

      let postObj = {
        imgList: imgList,
        applyID: this.applyName,
        tableName: "lg_transbillmain"
      };
      this.$api.post(link.upLoadImg,postObj).then(res=>{
        if(res.data.code=='201'){
          this.upload()
        }
      })
    },
        upload(){
      if(this.applyTrans.isSelect=='1'){
        this.applyTrans.selectOperator
      }else{
           this.applyTrans.selectOperator=''
      }
        let  applyObj={
       'applyRealName.ID':this.applyName,
        'applyTrans.id':this.applyTrans.id,
        'applyTrans.corp':this.applyTrans.corp , //公司名称
        'applyTrans.accountNo':this.applyTrans.accountNo,//开户账号
        'applyTrans.bankAccount':this.applyTrans.bankAccount,//开户银行
        'applyTrans.provinceID':this.applyTrans.provinceID,//联系地址省id
        'applyTrans.provinceName':this.applyTrans.provinceName,//联系地址省
        'applyTrans.cityID':this.applyTrans.cityID,//联系地址市id
        'applyTrans.cityName':this.applyTrans.cityName,//联系地址市
        'applyTrans.areaID':this.applyTrans.areaID,//联系地址区id
        'applyTrans.areaName':this.applyTrans.areaName,//联系地址区
        'applyTrans.corpAddress':this.applyTrans.corpAddress,//联系地址
        'applyTrans.isSelect':this.applyTrans.isSelect, //是否自选评审人员
        'applyTrans.selectOperatorID':this.applyTrans.selectOperatorID,//评审人员id
        'applyTrans.selectOperator':this.applyTrans.selectOperator, //评审人员姓名
        'custMap.taxNo':this.custMap.taxNo,//公司税号
        'custMap.realProvinceID':this.custMap.realProvinceID,//注册地址省id
        'custMap.realProvince':this.custMap.realProvince,//注册地址省
        'custMap.realCityID':this.custMap.realCityID,//注册地址市id
        'custMap.realCity':this.custMap.realCity,//注册地址市
        'custMap.realAreaID':this.custMap.realAreaID,//注册地址区id
        'custMap.realArea':this.custMap.realArea,//注册地址区
        'custMap.real_Addr':this.custMap.real_Addr,//注册地址
      }
      this.$api.post(link.realName,applyObj).then(res=>{
        if(res.data.code=='200'){
          if(res.data.data.status){
            Toast.success('申请成功，请您耐心等候申请结果')
            setTimeout(()=>{
               this.$router.push({name:'login'})
            },3000)
          }else{
            Toast.fail('申请失败，请仔细核对您的申请信息')
          }
        }
        if(res.data.code=='405'){
          Toast.fail(res.data.data.msg)
          setTimeout(()=>{
               this.$router.push({name:'login'})
            },3000)
        }
        }).catch(err=>{
          Toast.clear()
        })
    },
       oversize(file) {
      Toast("请上传8M大小以内的图片");
    },
    clickLeft(){
  this.imageList=[]
  this.image.custName=""
  this.isShow2=false
  this.a = false
    },
       downLoad(a){    
         if(a=='4'){
            Toast.loading('实名认证授权委托书生成中,请稍等...');
      }
      else{
         Toast.loading('合同生成中,请稍等...');
      }
      let downObj={
        'type':a,
        'custMap.cust':this.applyTrans.corp,
        'custMap.contact':this.applyTrans.custContact,
        'custMap.mobile':this.mobile,
        'custMap.reg_Addr':this.custMap.real_Addr,
        'custMap.bankofposit':this.applyTrans.bankAccount,
        'custMap.accountNo':this.applyTrans.accountNo,
        'custMap.taxNo':this.custMap.taxNo,
        'custMap.cardNO':this.custMap.cardNO,
        'custMap.contactTel':this.applyTrans.custMobile
      }
      let name=''
      switch(a){
        case 1:name='运输合同';break;
        case 2:name='订舱合同';break;
        case 3:name='订舱合同(空运)';break;
        case 4:name='实名认证授权委托书';break;
      }
     this.$api.post(link.downloadContract,downObj).then(res=>{
       if(res.data.code=='200'){
            let img = downloadFileByBase64(res.data.data.imgStr,name)
       if(img.flag){
          this.$router.push({name:'img',query:{url:img.url,name:name}})
       }else{
        Toast.fail('生成失败，请重试')
      }
       }else if(res.data.code=='405'){
          Toast.fail(res.data.msg)
       }else{
         Toast.fail(res.data.msg)
       }
     })
    },

},
}
</script>
<style lang="less" scoped>
@btn-width: 345px;
.real {
  .flex(column, space-between);
  background-color: #F0F0F0;
  width: 375px;
  margin: 0 auto;

  &-mid {
    height: 100%;
    width: 100%;
    background-color: #ffffff;
    margin-bottom: 15px;
    h4,&-left{
    width:117px;
    font-size:15px;
    font-family:Source Han Sans SC;
    font-weight:400;
    color:rgba(45,130,255,1);
    border-left: 3px solid rgba(45,130,255,1);
    padding-left: 9.5px;
    margin:16px 0 16px 10px
    }
    &-right{
      width:140px;
font-size:12px;
font-weight:400;
color:rgba(247,158,62,1);
line-height:20px;
margin: 18px 19px 0 0
    }
    
    
    &-field{
        width: @btn-width;
        margin: 0 auto;
     &-inp {
      width: @btn-width;
      margin-bottom: 6px;
      border:0;
      padding-right: 0;
      padding-left: 0;

     }
     &-bom{
      margin-bottom: -16px
     }

     &-upload{
         h5,&-left1{
font-size:14px;
font-family:Source Han Sans SC;
font-weight:500;
color:rgba(51,51,51,1);
line-height:20px;
margin: 15px 0;
         }
      &-left1::before{
    position: absolute;
              left: 2.13333vw;
              color: #ee0a24;
              font-size: 3.73333vw;
              content: '*';
      }

         &-right1{
        width:115px;
font-size:11px;
font-weight:400;
color:rgba(45,130,255,1);
line-height:20px;
margin: 15px 10px 0 0
         }
         padding-bottom: 15px;
         border-bottom:1px solid rgba(230,230,230,1);
     }

     &-btn{
       width:355px;
height:40px;
background:rgba(45,130,255,1);
border-radius:40px;
margin: 30px auto
     }
    }
  }
  p{
    margin: 9px 0 0 19.5px;
    font-size:12px;
font-weight:400;
color:rgba(153,153,153,1);
line-height:20px;
a{
  color: #F79E3E
}
  }
}
.van-cell--required::before{
  left: -8px;
}
        h5::before{
              position: absolute;
              left: 2.13333vw;
              color: #ee0a24;
              font-size: 3.73333vw;
              content: '*';
        }
        .real-mid-choose::before{
            position: absolute;
              left: 2.13333vw;
              color: #ee0a24;
              font-size: 3.73333vw;
              content: '*';
        }
        .wrapper {
          height: 100%;
          width: 100%;
          background: #fff
    }
.wrapper .van-nav-bar .van-icon,.wrapper .van-nav-bar__arrow+.van-nav-bar__text{
  color: #000
}
.wrapper .sear{
  display: flex;
  flex-wrap: wrap;
}
.sear-card{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 30px;
  font-size: 14px;
  color: #666;
  margin: 0 auto;
  border-bottom: 1px solid #cecece;
  line-height: 30px;
  background: #fff
}
  .van-field__label{
    -webkit-box-flex: 0 !important;
    -webkit-flex: none !important;
    flex: none !important;
    width: 24vw !important;
  }
.war-img{
  width: 100%;
  height: 100%;
}
.real .real-right{
  margin-right: 5px
}
.maxsize{
  font-size: 12px;
  color:rgba(153,153,153,1)
}
</style>
