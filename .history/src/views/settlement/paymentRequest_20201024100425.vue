<template>
  <div class="main">
    <div class="k-item">申请付款明细</div>
    <div class="bgwh">
      <div class="bor-t">
        <span class="dib pct33 bor-r c68">订单号</span>
        <span class="dib pct33 bor-r c68">合同号</span>
        <span class="dib pct33 c68">应收款(元)</span>
      </div>
      <block v-for="(item, index) in $route.query.list" :key="index">
        <div class="bor-t">
          <span class="dib pct33 c34">{{ item.orderNum }}</span>
          <span class="dib pct33 c34">{{ item.courierNumber }}</span>
          <span class="dib pct33 c34">{{ item.price }}</span>
        </div>
      </block>
      <div class="bor-t">
        <span class="dib pct33 c34">合计</span>
        <span class="dib pct33 c34">--</span>
        <span class="dib pct33 c34">{{ $route.query.price }}</span>
      </div>
    </div>
    <div class="mt20">
      <van-field
        v-model="number"
        label="发票编号"
        label-class="bl"
        placeholder="请填写发票编号"
        input-align="right"
      />
      <van-field
        v-model="digit"
        label="开票金额"
        placeholder="请填写开票金额"
        input-align="right"
        type="digit"
      />
      <van-cell-group>
        <van-cell
          title="开票日期"
          :value="date == '' ? '请选择开票日期' : date"
          @click="show = true"
        />
        <van-calendar v-model="show" @confirm="onConfirm" input-align="right" />
      </van-cell-group>
      <van-cell-group>
        <van-field label="税率" input-align="right" value="9%" readonly />
        <van-field
          label="发票类型"
          input-align="right"
          value="专用发票"
          readonly
        />
      </van-cell-group>
    </div>
    <div class="main-mid">
      <span class="main-mid-title">上传发票图片</span>
      <van-uploader
        :after-read="afterRead"
        v-model="fileList"
        :max-count="15"
        multiple
        :max-size="8388608"
        @oversize="oversize"
      ></van-uploader>
    </div>
    <div class="p20">
      <van-button type="info" round size="large" style="width: 100%"  @click="upLoad()"
        >提交申请</van-button
      >
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { toDecimal } from "../../uitls/js/decimal";
import { formatDate } from "../../uitls/js/date";
import { Field, Calendar } from "vant";
import { Cell, Uploader, Button, Toast } from "vant";
import link from "../../uitls/js/link";

Vue.use(Field);
Vue.use(Calendar);

export default {
  name: "paymentRequest",
  components: {
    [Cell.name]: Cell,
    [Field.name]: Field,
    [Uploader.name]: Uploader,
    [Button.name]: Button,
  },
  // props: ["carddata"],
  data() {
    return {
      date: "",
      show: false,
      text: "",
      digit: "",
      fileList: [],
      file: "",
      fileApplyID: "",
      price: $route.query.price, //价格
      number: "",
    };
  },
 computed: {
    id: function() {
      return this.$store.state.invoice.id;
    }
  },
  computed: {},
  methods: {
    afterRead(file) {
      this.file = file;
    },
    oversize(file) {
      Toast("请上传8M大小以内的图片");
    },
    upLoad() {
      if (this.$route.query.fileApplyID) {
        this.fileApplyID = this.$route.query.fileApplyID;
      } else {
        Toast("请选择订单后在进行此操作");
      }
      if (this.number == "") {
        Toast("请填写发票号！");
        return;
      }

      console.log('订单号',this.number,'开票金额',this.digit,'日期',this.date,'fileList',this.fileList,'file',this.file)
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        mask: true,
        message: "拼命提交中...",
      });
      if (this.fileList.length == 0) {
        this.submit();
      } else {
        let imgList = [];
        for (let index = 0; index < this.fileList.length; index++) {
          let imgObj = {
            content: this.fileList[index].content,
            fileName: this.fileList[index].file.name,
            nodeID: "0",
            tabletdID: "0",
            sceneType: "0",
            tableName: "lg_pickbillmain",
            fileGUID: this.fileApplyID,
          };
          imgList.push(imgObj);
        }
        let postObj = {
          imgList: imgList,
          applyID: this.fileApplyID,
          tableName: "lg_transbillmain",
        };
        this.$api.post(link.upLoadImg, postObj).then((result) => {
          if (result.data.code == "201") {
            this.submit();
          }
        });
      }
    },
    //提交
    submit() {
      let postObj = {
        corpID: 71536,
        id: this.id,
        fileApplyID: this.fileApplyID,
        invoiceNo: this.number,
        applyMoney: this.price,
        voiceDate:this.date
      };
      this.$api.post(link.upVoice, postObj).then((result) => {
        if (result.data.code == "200") {
          Toast.success("提交成功！");
          this.$router.replace("/uninvoice");
          this.$router.go(-1);
        } else {
          Toast.fail("提交失败，请稍候重试！");
        }
      });
    },
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      this.show = false;
      this.date = this.formatDate(date);
    },
  },
};
</script>
<style lang="less" scoped>
.p20 {
  padding: 20px;
}
.bl {
  font-weight: bold;
}
.k-item {
  height: 29px;
  font-size: 20px;
  margin-left: 20px;
  font-family: Source Han Sans SC;
  font-weight: bold;
  color: #333333;
  line-height: 40px;
  margin-top: 10px;
  margin-bottom: 20px;
}
.x-k {
  font-size: 16px;
  font-family: Source Han Sans SC;
  font-weight: bold;
  color: #333333;
  margin-left: 20px;
}
.bgwh {
  background: #fff;
}
.bor-t {
  border-top: 0.5px solid #e6e6e6;
  padding-top: 15px;
  padding-bottom: 15px;
  display: flex;
}
.c68 {
  color: #686868;
}
.c34 {
  color: #343434;
}

.pct33 {
  width: 33%;
  text-align: center;
  font-size: 16px;
}

.dib {
  display: inline-block;
}

.mt20 {
  margin-top: 20px;
}

.bor-r {
  border-right: 1px solid #e5e5e5;
}
.ui-files {
  font-size: 12px;
  line-height: 26px;
  height: 26px;
  box-sizing: border-box;
  display: inline-block;
  border: 1px solid #e5e5e5;
  border-radius: 13px;
  padding: 0px 10px 0px 30px;
  color: #676767;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAAaVBMVEUAAABnZ2eRkZFnZ2dqampnZ2dnZ2doaGhoaGhqampxcXFnZ2dnZ2dnZ2d1dXV1dXVoaGhoaGhnZ2dpaWlqampra2tnZ2doaGhoaGhnZ2doaGhoaGhoaGhnZ2doaGhpaWloaGhubm5oaGi5bYGQAAAAI3RSTlMA8QTRO+DLo50sFLKrXA8I6dqVQR4Z7MK/uIV7dWliUUsSUy6uY1YAAAB+SURBVAjXVcpJEoMgFADRRkFwQJyNRqPm/ofMj6zs3atq7ur5y11UVoaHksIZY0ekS5Q3VmvXiIu0Er2RnIOXaBIN0LfsbcinDbyqOVNmT7bCR/UyrqgcpUWaxKaBtqczS1QBtgO/DSTVXwzqRApRcCh36N0sF7Gxy0zpufsBazsGKR4Zi4oAAAAASUVORK5CYII=)
    #fff no-repeat 12px 5px;
  background-size: 15px 15px;
  max-width: 500px;
  overflow: hidden;
}
.vm {
  vertical-align: middle;
}
.main {
  &-head {
    /deep/.van-field__control {
      text-align: right;
    }
    /deep/.van-cell__value {
      span {
        color: #323233;
      }
    }
  }
  &-mid {
    margin-top: 15px;
    margin-bottom: 37px;
    padding: 20px;
    padding-left: 10px;
    width: 335px;
    height: auto;
    background: @font-color-white;
    &-title {
      display: block;
      padding-bottom: 15px;
      .font(14px, bold, rgba(51, 51, 51, 1));
    }
  }
}
</style>