<template>
    <div class="main">
    <div class="main-mid">
      <van-field v-model="nmobile" class="main-mid-inp" placeholder="请输入手机号码" type="text" clearable >
      </van-field>
 <van-field v-model="newPas" class="main-mid-inp" placeholder="请设置新的登录密码" type="password" clearable >
      </van-field>  
          <van-row>
     <van-col class="main-mid-reg" span="24">注：6-16位字符（数字、字母或其它组合），区分大小写</van-col>
</van-row>
      <van-field v-model="newPas1" class="main-mid-inp" placeholder="请确认您的密码"   @blur="isTrue" type="password" clearable >
      </van-field>
      <van-field
        v-model="code"
        class="main-mid-inp"
        placeholder="请输入验证码"
        type="text"
        clearable
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
                </van-button>      </van-field>
      <van-row>
     <van-col class="main-mid-reg" span="24">未收到验证码？请拨打乐刚网服务热线 4008-200-666 转 8067</van-col>   
</van-row>
      <van-button @click="finsh()" class="main-mid-btn" type="default">完成</van-button>
    </div>
    </div>
</template>
<script>
import { NavBar,Icon,Button,Field,Row,Col,Toast,CountDown } from "vant";
import link from "../../uitls/js/link";
import axios from 'axios'
export default {
    name:"forgot",
    data() {
        return {
      isTime:true,
      nmobile: "",
      code:"",
      newPas:"",
      newPas1:"",
        }
    },
     components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Field.name]: Field,
    [Row.name]: Row,
    [Col.name]: Col,
    [Toast.name]:Toast,
    [CountDown.name]:CountDown
  },
  created() {
    this.nmobile=this.$route.params.mobile
  },
  methods: {
    //验证密码是否一致
        isTrue(){
      if(this.newPas.trim()!=this.newPas1.trim()){
        Toast("两次密码不一致！")
      }
  },
  //获取验证码
       getCode(){
        if(this.nmobile.trim()==""||!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.nmobile))){
            Toast("您输入的手机号码格式有误");
                return;
        }

     let msgCode = {phoneNum:this.nmobile}

    this.$api.post(link.getCode, msgCode).then(res=>{
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
     //提交
     finsh(){
        if(this.nmobile.trim()==""||!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.nmobile))){
            Toast("您输入的手机号码格式有误");
                return;
        }

        if(this.newPas.trim()==""||!(/^[\w_-]{6,16}$/).test(this.newPas)){
          Toast("密码格式错误!(6-16位字符（数字、字母或其它组合），区分大小写)");
          return;
        }
        if(this.newPas.trim()!=this.newPas1.trim()){
          Toast("两次密码不一致")
        }
        Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        mask: true,
        message: "提交修改中..."
      });
       let pasObj={
           phoneNum:this.nmobile,
           msgCode:this.code,
           password:this.newPas
         }
      this.$api.post(link.editPassword,pasObj).then(res=>{
            if(res.data.code=='200'){
              if(res.data.data.status=='1'){
                Toast.success(res.data.data.message)
                 this.$router.push({name:'login',params:{mobile:this.nmobile}})
              }else{
                Toast.fail(res.data.data.message)
              }
            }else{
              Toast("网络错误")
            }
      }).catch(err=>{
        Toast(err)
      })
      }

},
}
</script>
<style lang="less" scoped>
@btn-width: 345px;
.main {
  .flex(column, space-between);
  background-color: #ffffff;
   width: 375px;
  margin: 0 auto;
  overflow: hidden;
  &-mid {
    height: 100%;
    width: @btn-width;
    margin: 0 auto;
    &-inp {
      width: @btn-width;
      margin-bottom: 6px;
      border-bottom: 1px solid rgba(221,221,221,1);
      padding-right: 0;
      padding-left: 0;
     }
      &-forget{
      width:100%;
      height:23px;
      .font(12px,400,rgba(45, 130, 255, 1));
      line-height: 0;
      border: 0;
      padding-right: 0;
      }
      
    &-btn {
      background: @btn-blue;
      margin-top: 30px;
      width: @btn-width;
      border-radius: 20px;
      box-shadow: 0px 0px 25px 0px rgba(77, 116, 239, 0.3);
      color: #ffffff;
      font-size: 15px;
      margin-bottom: 12.5px;
    }
    &-reg{
      width:345px;
      height:23px;
      font-size:12px;
      font-weight:400;
      color:rgba(247,158,62,1);
    }
  }

}
  .van-field__label{
    -webkit-box-flex: 0 !important;
    -webkit-flex: none !important;
    flex: none !important;
    width: 24vw !important;
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
</style>