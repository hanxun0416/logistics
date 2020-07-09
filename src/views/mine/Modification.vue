<template>
  <div class="addper">
    <van-field v-model="pername" label="姓名" readonly />
    <van-field v-model="permobile" label="子账号" readonly />
    <van-field
      v-model="digit"
      type="password"
      label="密码"
      placeholder="请输入新密码"
    />
    <van-field
      v-model="number"
      type="password"
      label="确认密码"
      placeholder="请输入确认新密码"
    />
    <van-cell title="职员权限可用" border class="perswitch">
      <template slot="default">
        <van-switch v-model="checked" size='5vw' inactive-color="#B3B3B3" />
      </template>
    </van-cell>

    <van-button color="#2D82FF" round class="addbtn" @click="confirmPer">确认修改</van-button>
  </div>
</template>
<script>
import { Field, Button, Cell, Switch } from "vant";
export default {
  name: "addper",
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [Switch.name]: Switch
  },
  data() {
    return {
      pername:'张三',
      permobile:'12345678910',
      checked: true,
    }
  },
  methods: {
    confirmPer(){
     this.$router.go(-1)
    }
  },
};
</script>
<style lang="less" scoped>
.addper {
  width: 376px;
  background: #f0f0f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.addbtn {
  margin-top: 30px;
  width: 355px;
  height: 40px;
  background: rgba(255, 255, 255, 1);
  border-radius: 20px;
  font-size: 15px;
  font-family: Source Han Sans SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 20px;
}
.perswitch {
  margin-top: 10px;
}
.modbtn {
  height: 20px;
  background: rgba(45, 130, 255, 1);
  line-height: 20px;
}
 .addper .van-field__control{
  text-align: right;
}
</style>
