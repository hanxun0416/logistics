<template>
  <div class="main">
    <div class="main-head">
      <img src="../assets/login/logo.png" class="main-head-logo" />
      <img src="../assets/login/logozi.png" class="main-head-text" />
    </div>
    <div class="main-mid">
      <van-field v-model="mobile" class="main-mid-inp" placeholder="请输入用户名" type="text" clearable >
        <van-icon
          slot="left-icon"
          :name="require('../assets/login/yonghu.png')"
          style="line-height: inherit;"
        />
      </van-field>
      <van-row>
</van-row>
      <van-field
        v-model="password"
        class="main-mid-inp"
        placeholder="请输入密码"
        type="password"
        clearable
      >
        <van-icon
          slot="left-icon"
          :name="require('../assets/login/mima.png')"
          style="line-height: inherit;"
        />
          <van-button slot="button" 
           class="main-mid-forget"
            @click="forgot">
            忘记密码</van-button>
      </van-field>
      <van-col  span="24" v-show='isUser' class='main-mid-col'>*请输入正确的用户名和密码*</van-col>
      <van-button @click="login()"
       class="main-mid-btn"
        type="default">
        登录
        </van-button>
      <van-row>
  <van-col class="main-mid-reg"
   span="24">还没有账号？点击
   <router-link 
   :to="{name:'registered',params:{mobile:mobile}}">
   点击新用户注册
   </router-link>
   </van-col>
</van-row>
    </div>
    <div class="main-foot">
      <span>上海乐刚供应链股份有限公司</span>
    </div>
  </div>
</template>
<script>
import { Field, Icon, Button, Toast ,Row, Col } from "vant";
import link from "../uitls/js/link";
export default {
  name: "login",
  data() {
    return {
      mobile: "",
      password: "",
      redirect: "",
      className:"222",
      isUser:false
    };
  },
  components: {
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col,
  },
  created() {
    if(this.$route.params.mobile){
      this.mobile=this.$route.params.mobile
    }
    if (this.$route.query.redirect) {
      this.redirect = this.$route.query.redirect;
    }
  },
  methods: {
    login() {
      if (this.mobile.trim() == "") {
        Toast("请输入用户名");
        return;
      }
      if (this.password.trim() == "") {
        Toast("请输入密码");
        return;
      }
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        mask: true,
        message: "拼命登录中..."
      });
      let postObj = {
        mobile: this.mobile,
        password: this.password
      };
      this.$api
        .post(link.login, postObj)
        .then(result => {
            switch(result.data.msg){
              case '1':Toast.success("登陆成功");this.$store.commit("login/updateToken", {token:result.data.data,isCarrier:true});this.$router.push({name:'home'});break;
              case '2':this.isUser=true;Toast.clear();break;
              case '4':Toast.fail("未通过承运商评审！请先进行评审！");this.$store.commit("login/updateToken",{token:result.data.data,isCarrier:false});this.$router.push({name:'appraisal'});break;
              case '5':Toast.fail("请先进行实名认证！");this.$store.commit("login/updateToken",{token:result.data.data,isCarrier:false});this.$router.push({name:'realName'});break;
            }

            // if (this.redirect == "") {
            //   this.$router.replace("/");
            // this.$router.go(-1);
            // } else {
            //    this.$router.replace("/");
            //   // this.$router.replace(this.redirect);
            // //  this.$router.go(-1);
            // }
        })
        .catch(error => {
          Toast.clear();
        });
    },
    forgot(){
      this.$router.push({name:'forgot',params:{mobile:this.mobile}})
    }
  }
};
</script>
<style lang="less" scoped>
@btn-width: 235.5px;
.main {
  .flex(column, space-between);
  background-color: #ffffff;
  &-head {
    position: relative;
    width: 100%;
    height: 220px;
    .bgconfig(url("../assets/login/logodibu.png"), no-repeat, 100% 100%);
    padding-top: 41px;
    margin-bottom: -40px;
    z-index: 0;
    &-logo {
      .center-block;
      width: 66px;
    }
    &-text {
      .center-block;
      width: 71.5px;
      margin-top: 21px;
    }
  }
  &-mid {
    position: relative;
    z-index: 1;
    padding-top: 36px;
    width: 342.5px;
    height: 353.5px;
    margin: 0 auto;
    .bgconfig(url("../assets/login/di.png"), no-repeat, 100% 100%);
    &-inp {
      width: @btn-width;
      margin-left: 53px;
      margin-bottom: 6px;
      background: rgba(0, 0, 0, 0.02);
      border: 1px solid #dddddd;
      border-radius: 20px;
      padding-right: 14px;
      margin-top: 15px;

    }
      &-col {
      width: @btn-width;
      height:19px;
      margin-left: 66px;
      .font(15px,400,rgba(247,158,62,1));
    }
      &-forget{
      width:100%;
      height:23px;
      .font(12px,400,rgba(102,102,102,1));
      line-height: 0;
      background: rgba(0, 0, 0, 0);
      border: 0;
      border-left: 1px solid rgba(222,222,222,1);
      padding-right: 0;
      padding-left:9.5px;
      }
    &-btn {
      background: @btn-blue;
      margin-top: 24px;
      width: @btn-width;
      margin-left: 53px;
      border-radius: 20px;
      box-shadow: 0px 0px 25px 0px rgba(77, 116, 239, 0.3);
      color: #ffffff;
      font-size: 15px;
      margin-bottom: 12.5px
    }
    &-reg{
      text-align: center;
      width: 100%;;
      height:21px;
      font-size:11px;
      font-weight:400;
      color:rgba(102,102,102,1); 
       a{
      color:#2D82FF;
      border-bottom:1px solid rgba(45,130,255,1);
    }
    }
  }
  &-foot {
    height: 25px;
    width: 100%;
    text-align: center;
    .font(13px, 400, rgba(212, 212, 212, 1));
    margin-bottom: 20px;
  }
}
</style>
