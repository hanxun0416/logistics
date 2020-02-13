<template>
 <div class="reg" id="reg">
   <div class="reg-mid">
       <div class="reg-mid-field">
        <van-field v-model="custMap.mobile"  label="用户名" class="reg-mid-field-inp" placeholder="请输入用户名" type="text" clearable required> </van-field>
        <van-field
           label="密码"
          v-model="custMap.password"
          class="reg-mid-field-inp"
          placeholder="6-16位字符（数字、字母或其组合），区分大小写"
          type="password"
          clearable
          required
        >
        </van-field>
        <van-field
          label="确认密码"
          v-model="password"
          class="reg-mid-field-inp"
          placeholder="请再次输入密码"
          type="password"
          @blur="isTrue"
          clearable
          required
        >
        </van-field>
           <van-field
        label="短信验证码"
        v-model="msgCode"
        class="reg-mid-field-inp"
        placeholder="请输入验证码"
        type="text"
        clearable
        required
      >
          <van-button slot="button"  class="main-mid-forget" @click="getCode" v-show="isTime">获取验证码</van-button>
            <van-button slot="button"  class="main-mid-count"  v-show="!isTime">
                <van-count-down :time="120*1000"
                format="ss"
                :auto-start="false"
                ref="countDown"
                class="count"
                @finish="finished"/>
              <span>s后重新获取</span>
                </van-button>
      </van-field>
        </div>
      </div>

<!-- <p>注册即表示您已阅读并同意<span @click="$router.push({name:'xy',parmas:{mobile:this.custMap.mobile,password:this.custMap.password,pas:this.password,code:this.msgCode}})">《乐刚网用户注册协议》</span></p> -->
<p>注册即表示您已阅读并同意<span @click="xy=true">《乐刚网用户注册协议》</span></p>
      <van-overlay :show="xy">
  <div class="wrapper">
       <div id="xy">
        <div >
<h1>乐刚网用户注册协议</h1> 
<p>本协议由您（“用户”）与乐刚网网站（“本站”，网址：www.lgsteel.com或www.lgsteel.cn或www.lgwsteel.com）所有者（以下简称为“乐刚网”）订立。在您申请注册成为用户前，请您仔细阅读本协议，您勾选“我已阅读并同意《乐刚网用户注册协议》”，本协议即构成对双方有约束力的法律文件。乐刚网有权对本协议条款进行修改。您有义务关注并阅读最新版的协议及网站公告。</p>  
<h1>第一条 本站服务</h1>
<p>1.1 本站通过互联网为您提供互联网信息等服务，您在完全同意本协议及本站规定并完成注册程序的情况下，方有权使用本站的相关服务。</p>
<p>1.2 您须自行准备如下设备和承担如下开支：</p>
<p>（1）上网设备，包括并不限于电脑或者其他上网终端、调制解调器以及其他必备的上网装置；</p>
<p>（2）上网开支，包括并不限于网络接入费、上网设备租用费、手机流量费等。</p>
<h1>第二条 用户管理</h1>
<p>2.1 乐刚网仅向具备完全民事权利能力和民事行为能力的自然人、或依法成立、存续的法人或其他组织开放注册。因此，您应具备上述条件。</p>
<p>2.2 您应自行诚信向本站提供注册资料并保证注册资料真实、准确、完整、合法有效。您的注册资料如有变动，应及时更新。</p>
<p>2.3 涉及您真实姓名/名称、通信地址、联系电话、电子邮箱等隐私信息的，本站将严格保密。</p>
<p>2.4 注册成功后，将产生用户名和密码等账户信息，您可以根据本站规定修改密码。请谨慎合理地保存、使用用户名和密码。</p>
<p>2.5 您不得将用户名和密码借给他人使用，否则您应承担由此产生的全部责任，并与实际使用人承担连带责任。</p>
<p>2.6 您同意并认可乐刚网有权通过邮件、短信、电话等形式向您和收货人发送订单信息、促销活动信息等。</p>
<p>2.7 您同意并认可以贵司名义开具的线上提货单以及线下提货单，包括但不限于提货单原件、传真件等。</p>
<p class="e">2.8 您同意并认可乐刚网系统自动生成的关于您单位的电子签章，您在注册后完善基础信息时需对电子签章进行确认，一旦确认，该电子签章将应用于业务操作的全流程，包括但不限于销售合同、采购合同等；该电子签章的效力与原件的效力一致。</p>
<p  class="e">2.9 您明白并同意，在您使用乐刚电子商务平台的过程中，网页上出现的关于交易操作的提示是用户注册协议的一部分，您对于使用过程中任何一个页面的确认或继续操作表示对用户注册协议的认同。</p>
<h1>第三条 商品信息</h1>
<p>3.1 本站上的商品价格、数量、是否有货等信息随时都有可能发生变动，本站不作特别通知。由于互联网技术等客观因素的存在，本站网页显示的信息可能会有一定的滞后性或差错，对此情形您充分知悉并理解。如您发现商品信息错误或有疑问，请您在第一时间告知乐刚网，并不要提交订单。</p>
<p>3.2 除另有特别说明外，本网站展示的商品的价格为原卷价格，且包含了增值税。送货运费、加工费需由您另行支付。</p>
<h1>第四条 订单操作流程</h1>
<p>4.1 您在本站搜索或提交产品信息，勾选产品大类、品名、规格、牌号、钢厂、计量并填写重量、数量、打包方式等确认无误后，加入购物车，点击“提交订单”后进入“乐刚网下单”页面，选择并输入订单详细信息，点击“提交订单”。</p>
<p>4.2 订单确认后，您的订单将会被本站及时处理，同时您可点击“订单查询”、“合同查看”等对合同的各项内容进行查看、确认等操作。</p>
<p  class="e">4.3 在交易过程中，您一旦对合同进行确认，电子章即会显示在合同中，该合同与盖章原件具有同等法律效力。该合同在乐刚网平台保存，双方无需另行签订书面合同。若由于您的原因造成无法履行合同，您将承担违约责任，每单需支付违约金500积分（元），而且乐刚网有权对您采取暂停交易、冻结账户等一系列的惩罚措施。</p>
<p  class="e">4.4 在交易过程中涉及的银行账户均为公司账户，禁止通过个人账户进行业务往来。请您打款前确认收款账户为合同当事人或合同当事人认可的公司账户，否则由此产生的后果由您自行承担。</p>
<h1>第五条 责任限制及不承诺担保</h1>
<p>5.1 本站及其所包含的或以其它方式通过本站提供给您的全部信息、内容、材料、产品和服务，均是在“按现状”和“按现有”的基础上提供的。</p>
<p>5.2 乐刚网不对本站的运营及其包含在本网站上的信息、内容、材料、产品或服务做任何形式的、明示或默示的声明或担保。</p>
<p>5.3 乐刚网不担保本站所包含的或以其它方式通过本站提供给您的全部信息、内容、材料、产品和服务器或从本站发出的电子信件、信息没有病毒或其他有害成分。</p>
<p>5.4 如因不可抗力或其他本站无法控制的原因使本站系统崩溃或无法正常使用导致网上交易无法完成或丢失有关的信息、记录等，乐刚网会合理地尽力协助处理善后事宜。</p>
<h1>第六条 法律适用和管辖</h1>
<p>本协议适用中国法律。产生的争议由上海市宝山区人民法院管辖。</p>

<h1>第七条 其他</h1>
<p>7.1 本协议内容中以黑体、加粗等方式显著标识的条款，请您着重阅读。</p>
<p>7.2 您勾选“我已阅读并同意《乐刚网用户注册协议》”即视为您完全接受本协议，在勾选之前请您再次确认已知悉并完全理解本协议的全部内容。如您对本协议有任何疑问，应向乐刚网咨询。但无论您事实上在成为乐刚网用户后是否认真阅读了本协议内容，只要您注册成为乐刚用户，本协议即对您产生约束。届时您不应以未阅读本协议的内容，主张本协议无效或要求撤销本协议。</p>
<p>7.3 当您注册成功后，乐刚网会为您进行免费宣传。</p>
</div>
<van-button type="info" class="reg-mid-field-btnn" @click='xy=false' >同意并继续</van-button>

    </div>
  </div>
</van-overlay>
<van-button type="info" class="reg-mid-field-btn" @click="frontRegist">下一步</van-button>
     </div>
</template>

<script>
import { Field, Icon, Button, Toast ,Row, Col ,NavBar,Divider,Overlay,CountDown } from "vant";
import areaList  from '../../assets/js/area.js';
import link from '../../uitls/js/link'
import axios from 'axios'
export default {
    name:"registered",
    data() {
        return {
          custMap:{
            mobile:"",//用户名
            password:"",//密码
          },
             password:"",//密码
             msgCode:"",//短信验证码
            xy:false,
            isTime:true
}
    },
     components: {
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [NavBar.name]: NavBar,
    [Toast.name]: Toast,
    [Divider.name]:Divider,
    [CountDown.name]:CountDown,
    [Overlay.name]:Overlay,
  },
  created() {
    this.custMap.mobile = this.$route.params.mobile
  },
  methods: {

  //密码一致校验
  isTrue(){
      if(this.custMap.password.trim()!=this.password.trim()){
        Toast("两次密码不一致！")
      }
  },
  //获取手机验证码
getCode(){
      if(this.custMap.mobile.trim()==""||!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.custMap.mobile))){
          Toast("您输入的手机号码格式有误");
          return;
        }

    let codeObj ={
      phoneNum:this.custMap.mobile,
      }
    this.$api.post(link.regGetCode, codeObj).then(res=>{
       if(res.data.code=='200'){
            Toast(res.data.data.message)
             if(res.data.data.status=='1'){
              this.isTime=false;
            this.start()
            }
       }
       else if (res.data.code=='405'){
           Toast(res.data.data.message)
           return;
       }
       else{
           Toast('网络错误')
           return;
       }
     }).catch(err=>{
        Toast('网络错误')
        })
  },
  //开始倒计时
    start() {
      this.$refs.countDown.start();
    },
    //倒计时结束
        finished() {
    this.isTime=true,
    this.$refs.countDown.reset();
    },
      frontRegist(){
                if(this.custMap.mobile.trim()==""||!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.custMap.mobile))){
            Toast("您输入的手机号码格式有误");
                return;
        }

        if(this.custMap.password.trim()==""||!(/^[\w_-]{6,16}$/).test(this.newPas)||this.custMap.password.trim()==""){
          Toast("密码格式错误!(6-16位字符（数字、字母或其它组合），区分大小写)");
          return;
        }
              if(this.custMap.password.trim()!=this.password.trim()){
              Toast("两次密码不一致！")
              return
      }

            if(this.msgCode.trim()==""){
        Toast("请输入短信验证码")
        return
      }
        let regObj= {
          phoneNum:this.custMap.mobile,
          password: this.custMap.password,
          msgCode:this.msgCode

        }
      this.$api.post(link.userReg,regObj).then(res=>{
            if(res.data.code=='200'){ 
              if(res.data.data.status=='1'){
                var userObj={
                   mobile: this.custMap.mobile,
                   password: this.custMap.password,
                }
               this.$api.post(link.login,userObj).then(result=>{
               switch(result.data.msg){
                  case '5':Toast.success("注册成功");this.$store.commit("login/updateToken",{token:result.data.data,isCarrier:false});this.$router.push({name:'realName'});break;
            }
                  })
              }else{
                Toast.fail(res.data.data.msg)
              }
            }else{
              Toast("网络错误")
            }
      }).catch(err=>{
        Toast(err)
      })
    } ,
  },
}
</script>

<style lang="less" scoped>
@btn-width: 345px;
.reg {
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

     &-btn{
       width:355px;
height:40px;
background:rgba(45,130,255,1);
border-radius:40px;
margin: 30px auto
     }
    }
  }

}
.van-cell--required::before{
  left: -8px;
}
  p{
    margin: 9px 0 0 19.5px;
    font-size:12px;
font-weight:400;
color:rgba(153,153,153,1);
line-height:20px;
span{
  color: #F79E3E
}
  }
     .main-mid-forget{
      width:100%;
      height:23px;
      .font(12px,400,rgba(45, 130, 255, 1));
      line-height: 0;
      border: 0;
      padding-right: 0;
      }
      .main-mid-count{
      width:100%;
      height:23px;
      .font(12px,400,#cecece);
      line-height: 0;
      border: 0;
      padding-right: 0;
      }
     
    .main-mid-count  .van-button__text{
          display: flex;
          justify-content: center;
          align-items: center
      }
      .count{
        line-height: 0;
     .font(12px,400,#cecece);
      }
  .img{
    height: 100%;
  }
  .code-inp{
    align-items: center;
  }

  .van-field__label{
    -webkit-box-flex: 0 !important;
    -webkit-flex: none !important;
    flex: none !important;
    width: 24vw !important;
  }
         .van-cell__title{
        flex: none !important
      }
      .wrapper{
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
  #xy{
    overflow: auto;
    background: #fff
}
  #xy  h1{
        font-size: 13px;
    }
   #xy  p {
        font-size: 12px;
        color: #000 ;
    }
   #xy {
        box-sizing: border-box;
        height: 100%;
        background: #fff;
        display: flex;
        align-items: center;
        flex-direction: column;
    }
  #xy  .reg-mid-field-btnn{
        margin: 0 auto
    }
</style>

