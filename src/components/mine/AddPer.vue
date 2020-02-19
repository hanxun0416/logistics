<template>
  <div class="addper">
    <van-field v-model="text" label="姓名" placeholder="请输入姓名" />
    <van-field v-model="tel" label="子账号" placeholder="请输入作为子账号的手机号码" />
    <van-field
      v-model="digit"
      type="password"
      label="密码"
      placeholder="请输入密码"
    />
    <van-field
      v-model="number"
      type="password"
      label="确认密码"
      placeholder="请输入确认密码"
    />
    <van-button color="#2D82FF" round class="addbtn">确认添加</van-button>
  </div>
</template>
<script>
import { Field,Button  } from "vant";
export default {
  name: "addper",
  components: {
    [Field.name]: Field,
    [Button.name]: Button
  },
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>

.addper {
  width: 376px;
  background: #f0f0f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center
}
.addbtn{
    margin-top: 30px;
    width:355px;
    height:40px;
    background:rgba(255,255,255,1);
    border-radius:20px;
font-size:15px;
font-family:Source Han Sans SC;
font-weight:400;
color:rgba(255,255,255,1);
line-height:20px;
}
</style>
