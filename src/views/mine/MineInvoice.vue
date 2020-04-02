<template>
  <div class="main">
    <van-cell-group>
      <van-cell title="公司名称" :value="custName" />
      <van-cell title="公司地址" :value="custAddress" />
      <van-cell title="开户银行" :value="bank" />
      <van-cell title="开户银行账号" :value="account" />
      <van-cell title="税号" :value="taxNo" />
      <van-cell title="邮寄地址" value="上海市宝山区锦乐路288号" />
      <van-cell title="联系电话" :value="mobile" />
    </van-cell-group>
  </div>
</template>
<script>
import { Cell, CellGroup } from "vant";
import link from "../../uitls/js/link";
export default {
  name: "MineInvoice",
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  data() {
    return {
      custName: "上海乐刚供应链股份有限公司",
      custAddress: "上海市崇明区北沿公路2111号3幢341-65室",
      name: "",
      mobile: "400-820-0666",
      bank: "中国建设银行上海自贸试验区分行",
      account: "3100 1579 5110 5002 3589",
      taxNo:"9131000008414035XN"
    };
  },
  created() {
    // this.getMyInvoice();
  },
  methods: {
    // getMyInvoice() {
    //   let postObj = {
    //     transCorpID: 71536
    //   };
    //   this.$api
    //     .post(link.myVoice, postObj)
    //     .then(result => {
    //       if (result.data.code == "200") {
    //         if (result.data.code == "200") {
    //           let data = result.data.data;
    //           [
    //             this.custName,
    //             this.custAddress,
    //             this.name,
    //             this.mobile,
    //             this.bank,
    //             this.account,
    //             this.taxNo
    //           ] = [
    //             data.cust,
    //             data.reg_Addr,
    //             data.contact,
    //             data.contactTel,
    //             data.bankofposit,
    //             data.accountNo,
    //             data.taxNo
    //           ];
    //         }
    //       }
    //     })
    //     .catch(err => {});
    // }
  }
};
</script>
<style lang="less" scoped>
/deep/.van-cell__title {
  max-width: 100px;
}
</style>