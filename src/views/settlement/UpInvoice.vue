<template>
  <div class="main">
    <div class="main-head">
      <van-cell title="开票金额" :value="`${price}元`" />
      <van-field type="number" v-model="number" label="发票号" placeholder="请填写发票号" />
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
    <van-button type="info" size="large" @click="upLoad()">提交</van-button>
  </div>
</template>
<script>
import { Cell, Field, Uploader, Button, Toast } from "vant";
import link from "../../uitls/js/link";
export default {
  name: "UpInvoice",
  components: {
    [Cell.name]: Cell,
    [Field.name]: Field,
    [Uploader.name]: Uploader,
    [Button.name]: Button
  },
  data() {
    return {
      fileList: [],
      file: "",
      fileApplyID: "",
      price: "", //价格
      number: ""
    };
  },
  created() {
    if (this.$route.query.fileApplyID) {
      this.fileApplyID = this.$route.query.fileApplyID;
    } else {
      Toast("请选择订单后在进行此操作");
    }
    if (this.$route.query.price) {
      this.price = this.$route.query.price;
    } else {
      Toast("请选择订单后在进行此操作");
    }
  },
  computed: {
    id: function() {
      return this.$store.state.invoice.id;
    }
  },
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
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        mask: true,
        message: "拼命提交中..."
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
            fileGUID: this.fileApplyID
          };
          imgList.push(imgObj);
        }
        let postObj = {
          imgList: imgList,
          applyID: this.fileApplyID,
          tableName: "lg_transbillmain"
        };
        this.$api.post(link.upLoadImg, postObj).then(result => {
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
        applyMoney: this.price
      };
      this.$api.post(link.upVoice, postObj).then(result => {
        if (result.data.code == "200") {
          Toast.success("提交成功！");
          this.$router.replace("/uninvoice");
          this.$router.go(-1);
        } else {
          Toast.fail("提交失败，请稍候重试！");
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
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
    width: 335px;
    height: auto;
    background: @font-color-white;
    &-title {
      display: block;
      padding-bottom: 15px;
      .font(14px, 500, rgba(51, 51, 51, 1));
    }
  }
}
</style>