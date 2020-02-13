<template>
  <div class="main">
    <div class="main-head">
      <span>请选择车辆</span>
      <span @click="addClick()" class="add">添加车辆</span>
    </div>
    <div class="main-mid">
      <div v-for="(item,index) in dataList" :key="index">
        <send-car-card @cardClick="cardClick" :carddata="item" :checkable="submitLoading"></send-car-card>
      </div>
    </div>
    <div class="main-foot">
      <span class="main-foot-label">
        已选择
        <span class="count">{{count}}</span> 辆
      </span>
      <van-button
        loading-text="派车中"
        :loading="submitLoading"
        class="submitBtn"
        type="danger"
        size="large"
        @click="submit()"
      >确认</van-button>
    </div>

    <van-dialog
      v-model="addshow"
      title="新增车辆"
      lockScroll
      show-cancel-button
      :before-close="beforeClose"
      confirmButtonColor="#ffffff"
    >
      <car-toast ref="carToast" @callBack="getMyCar"></car-toast>
    </van-dialog>
  </div>
</template>
<script>
import SendCarCard from "../../components/order/SendCarCard";
import CarToast from "../../components/mine/CarToast";
import link from "../../uitls/js/link";
import { Button, Toast, Dialog } from "vant";
export default {
  name: "SendCar",
  components: {
    "send-car-card": SendCarCard,
    [Button.name]: Button,
    [Toast.name]: Toast,
    [Dialog.Component.name]: Dialog.Component,
    "car-toast": CarToast
  },
  data() {
    return {
      id: "", //订单id
      dataList: [], //结果集
      submitLoading: false, //提交按钮加载状态
      addshow: false //添加车辆弹出框是否显示之标志
    };
  },
  computed: {
    count: function() {
      let count = 0;
      for (let index = 0; index < this.dataList.length; index++) {
        if (this.dataList[index].checked) {
          count += 1;
        }
      }
      return count;
    }
  },
  created() {
    this.id = this.$route.query.id;
    this.getMyCar();
  },
  methods: {
    //获取车辆列表
    getMyCar() {
      this.$api
        .post(link.getCarList, {
          transCorpID: 71536
        })
        .then(result => {
          if (result.data.code == "200") {
            let data = [];
            for (let index = 0; index < result.data.data.length; index++) {
              let item = {
                id: result.data.data[index].id,
                checked: false,
                index: index,
                carId: result.data.data[index].carNum,
                mobile: result.data.data[index].mobile,
                name: result.data.data[index].driverName
              };
              data.push(item);
            }
            this.dataList = [...data];
          }
        });
    },
    //卡片点击事件
    cardClick(index) {
      this.dataList[index].checked = !this.dataList[index].checked;
    },
    //确认按钮点击事件
    submit() {
      if (this.count == 0) {
        Toast("至少派出一辆车");
        return false;
      }
      if (this.count > 10) {
        Toast("派车数量请控制在10辆以内");
        return false;
      }
      let transCarIDs = "";
      for (let index = 0; index < this.dataList.length; index++) {
        if (this.dataList[index].checked) {
          if (transCarIDs == "") {
            transCarIDs += this.dataList[index].id;
          } else {
            transCarIDs += `,${this.dataList[index].id}`;
          }
        }
      }
      this.sendCar(transCarIDs);
    },
    //添加车辆按钮事件
    addClick() {
      this.addshow = true;
    },
    //新增车辆弹出框按钮被点击之前所触发之事件
    beforeClose(action, done) {
      if (action === "confirm") {
        setTimeout(done, 1000);
        done(this.$refs.carToast.addCar());
      } else {
        done();
      }
    },
    sendCar(transCarIDs) {
      this.submitLoading = true;
      let postObj = {
        id: this.id,
        transCarIDs: transCarIDs,
        transCorpID: 71536
      };
      this.$api
        .post(link.saveCarList, postObj)
        .then(result => {
          this.submitLoading = false;
          if (result.data.code == "200") {
            Toast("派车成功");
            this.$router.push({
              name: "order",
              params: {
                active: 1
              }
            });
          } else {
            Toast("派车失败");
          }
        })
        .catch(err => {
          this.submitLoading = false;
        });
    }
  }
};
</script>
<style lang="less" scoped>
.main {
  height: auto;
  &-head {
    height: 45px;
    padding: 0 15px;
    line-height: 44px;
    .flex(row, space-between);
    span {
      .font(15px, 400, rgba(51, 51, 51, 1));
    }
    .add {
      color: @btn-blue;
      cursor: pointer;
    }
  }
  &-mid {
    padding-bottom: 50px;
  }
  &-foot {
    position: fixed;
    .flex(row, space-between);
    width: 355px;
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    z-index: 1000;
    bottom: 0;
    background-color: #ffffff;
    .submitBtn {
      width: 110px;
    }
    &-label {
      .font(15px, 400, rgba(51, 51, 51, 1));
    }
    .count {
      color: @btn-blue;
    }
  }
  /deep/.van-dialog__confirm {
    background: #1989fa;
  }
}
</style>