<template>
  <div class="main">
    <van-cell-group class="group">
      <div class="title">
        <span class="title-txt">公司信息</span>
      </div>
      <van-cell title="公司名称" :value="custName" />
      <van-cell title="公司地址" :value="custAddress" />
      <van-cell title="联系人" :value="name" />
      <van-cell title="联系电话" :value="mobile" />
    </van-cell-group>
    <van-cell-group>
      <div class="title">
        <span class="title-txt">打款信息</span>
      </div>
      <van-cell title="银行信息" :value="bank" />
      <van-cell title="银行账号" :value="account  " />
    </van-cell-group>
  </div>
</template>
<script>
import { Cell, CellGroup } from "vant";
import link from "../../uitls/js/link";
export default {
  name: "MineInfo",
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  data() {
    return {
      custName: "",
      custAddress: "",
      name: "",
      mobile: "",
      bank: "",
      account: ""
    };
  },
  created() {
    this.getMyInfo();
  },
  methods: {
    getMyInfo() {
      let postObj = {
        transCorpID: 71536
      };
      console.log(postObj)
      this.$api.post(link.myInfo, postObj).then(result => {
        if (result.data.code == "200") {
          let data = result.data.data;
          [
            this.custName,
            this.custAddress,
            this.name,
            this.mobile,
            this.bank,
            this.account
          ] = [
            data.cust,
            data.reg_Addr,
            data.contact,
            data.contactTel,
            data.bankofposit,
            data.accountNo
          ];
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.main {
  .group {
    margin-bottom: 15px;
    /deep/.van-cell__title {
      max-width: 60px;
    }
  }
  .title {
    position: relative;
    height: 40px;
    width: 100vw;
    padding-left: 10px;
    border-bottom: 1px solid #ebedf0;
    display: table-cell;
    vertical-align: middle;
    &-txt {
      display: inline-block;
      padding-left: 13px;
      .font(15px, 400, @btn-blue);
    }
    &-txt:before {
      content: "";
      display: block;
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translate(0, -50%);
      width: 3px;
      height: 17px;
      background: @btn-blue;
      border-radius: 1px;
    }
  }
}
</style>