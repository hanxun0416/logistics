<template>
  <div class="main">
  
    <div v-if="dataList.length==0" class="noList">
       <img src="../../assets/mine/wuxiaoxi.png">
         <div>暂未添加任何车辆信息!</div>
    </div> 
     <div class="main-mid" v-else>
      <div v-for="(item,index) in dataList" :key="index">
        <mine-car-card class="main-mid-item" :carddata="item" @deleteCar="deleteCar"></mine-car-card>
      </div>
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

    <van-button @click="addBtnClick()" class="btn" type="info" size="large">添加车辆</van-button>
  </div>
</template>
<script>
import MineCarCard from "../../components/mine/MineCarCard";
import CarToast from "../../components/mine/CarToast";
import { Button, Dialog ,Toast} from "vant";
import link from "../../uitls/js/link";
export default {
  name: "mineCar",
  data() {
    return {
      addshow: false, //是否显示添加车辆
      dataList: [] //车辆列表
    };
  },
  components: {
    [Button.name]: Button,
    [Dialog.Component.name]: Dialog.Component,
    "mine-car-card": MineCarCard,
    "car-toast": CarToast
  },
  created() {
    this.getMyCar();
  },
  methods: {
    //添加按钮之cilck事件
    addBtnClick() {
      this.addshow = true;
    },
    //删除车辆
    deleteCar(id) {
      let postObj = {
        id: id
      };
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        mask: true,
        message: "拼命删除中..."
      });
      this.$api
        .post(link.deleteCar, postObj)
        .then(result => {
          if (result.data.code == "200") {
            Toast.success("删除成功");
            this.getMyCar();
          }
        })
    },
    //新增车辆弹出框按钮被点击之前所触发之事件
    beforeClose(action, done) {
      if (action === "confirm") {
        done(this.$refs.carToast.addCar());
      } else {
        done();
      }
    },
    getMyCar() {
      let postObj = {
        transCorpID: 71536
      };
      this.$api.post(link.myCar, postObj).then(result => {
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
    }
  }
};
</script>
<style lang="less" scoped>

.main {
  height: auto;
  &-mid {
    padding-top: 15px;
    padding-bottom: 50px;
    &-item {
      margin-bottom: 20px;
    }
  }
  .btn {
    position: fixed;
    bottom: 0;
  }
  /deep/.van-dialog__confirm {
    background: #1989fa;
  }
}
.noList{
height:100% ;
width: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center
}
.noList img{
       margin-top: 100px;
        width: 190px;
        height: 150px;
}
.noList div{
height:14.5px;
font-size:14px;
color:rgba(162,162,162,1);
}
</style>