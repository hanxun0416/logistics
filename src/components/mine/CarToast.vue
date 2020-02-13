<template>
  <div class="carToast">
    <van-field v-model="carId" label="车牌号" type="text" placeholder="请输入车牌号" />
    <van-field v-model="name" label="司机姓名" type="text" placeholder="请输入司机姓名" />
    <van-field v-model="id" label="身份证号" type="text" placeholder="请输入身份证号" />
    <van-field v-model="mobile" label="联系电话" type="number" placeholder="请输入联系方式" />
  </div>
</template>
<script>
import { Field, Toast } from "vant";
import link from "@/uitls/js/link";
export default {
  name: "CarToast",
  components: {
    [Field.name]: Field,
    [Toast.name]: Toast
  },
  data() {
    return {
      carId: "",
      name: "",
      id: "",
      mobile: ""
    };
  },
  methods: {
    inputCheck() {
      if (this.carId.trim() == "") {
        Toast("请输入车牌号");
        return false;
      } else if (this.name.trim() == "") {
        Toast("请输入司机姓名");
        return false;
      } else if (this.id.trim() == "") {
        Toast("请输入身份证号");
        return false;
      } else if (this.mobile.trim() == "") {
        Toast("请输入联系方式");
        return false;
      } else {
        return true;
      }
    },
    //添加车辆
    addCar() {
      if (!this.inputCheck) {
        return;
      }
      let postObj = {
        corpID: 71536,
        carNum: this.carId,
        driverName: this.name,
        driverCardNo: this.id,
        mobile: this.mobile
      };
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        mask: true,
        message: "拼命添加中..."
      });
      this.$api.post(link.addCar, postObj).then(result => {
        if (result.data.code == "200") {
          Toast.success("添加成功");
          this.carId = "";
          this.name = "";
          this.id = "";
          this.mobile = "";
          this.$emit("callBack");
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.carToast {
  padding: 10px 10px;
}
</style>