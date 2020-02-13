<template>
  <div class="main">
    <div class="main-mid">
      <div class="main-mid-bill">
        <span class="main-mid-bill-title">上传仓库出库单据</span>
        <van-uploader
          multiple
          :max-count="1"
          :max-size="8388608"
          :after-read="afterRead"
          v-model="fileList1"
          @oversize="oversize"
        ></van-uploader>
        <span class="main-mid-bill-title" style="padding-bottom:0;color:#f9ba80">注：请上传8M以内大小的图片</span>
      </div>
      <div class="main-mid-bill">
        <span class="main-mid-bill-title">上传客户签收单据</span>
        <van-uploader
          multiple
          :max-count="1"
          :max-size="8388608"
          :after-read="afterRead"
          v-model="fileList2"
          @oversize="oversize"
        ></van-uploader>
        <span class="main-mid-bill-title" style="padding-bottom:0;color:#f9ba80">注：请上传8M以内大小的图片</span>
      </div>
      <!-- <div class="main-mid-address">
        <van-cell @click="selectSign()" title="客户签收状态" :value="signType">
          <template slot="title">
            <span class="custom-title">
              <span style="color:red">*</span>客户签收状态
            </span>
          </template>
        </van-cell>
        <van-cell title="单据邮寄地址" value="上海市啊实打实打算fda" />
        <van-cell title="联系方式" value="5454654361456465465" />
      </div>-->
    </div>
    <!-- <van-action-sheet v-model="flag" :actions="actions" @select="onSelect" cancel-text="取消" /> -->
    <van-button class="sendBtn" hairline size="large" @click="submit()">提交</van-button>
  </div>
</template>
<script>
import { Button, Uploader, Cell, ActionSheet, Toast } from "vant";
import link from "../../uitls/js/link";
import { dataURLtoFile } from "../../uitls/js/dataToFile";
export default {
  name: "UploadBill",
  components: {
    [Button.name]: Button,
    [Uploader.name]: Uploader,
    [Cell.name]: Cell,
    [ActionSheet.name]: ActionSheet
  },
  data() {
    return {
      applyID: "",
      fileList1: [], //图片列表1
      fileList2: [], //图片列表2
      file: "", //上传文件之base64格式
      flag: false, //选择签收状态dialog是否显示之标志
      signType: "请确认客户签收状态", //选择签收状态文本区域显示之文本
      actions: [{ name: "客户已签收" }, { name: "客户签收异常" }] //选择签收状态dialog之选项文本
    };
  },
  created() {
    if (this.$route.query.applyID) {
      this.applyID = this.$route.query.applyID;
    } else {
      Toast("请选择提单信息后进行此操作!");
    }
  },
  methods: {
    afterRead(file) {},
    oversize(file) {
      Toast("请上传8M大小以内的图片");
    },
    selectSign() {
      this.flag = true;
    },
    onSelect(value, index) {
      this.flag = false;
      this.signType = value.name;
    },
    //提交按钮事件
    submit() {
      if (this.applyID == "") {
        Toast("请选择提单信息后进行此操作!");
        return false;
      }
      if (this.fileList1.length == 0 || this.fileList2.length == 0) {
        Toast("请选择选择图片后进行此操作");
        return false;
      }
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        mask: true,
        message: "拼命提交中..."
      });
      let imgList = [];
      for (let index = 0; index < this.fileList1.length; index++) {
        let imgObj = {
          content: this.fileList1[index].content,
          fileName: this.fileList1[index].file.name,
          nodeID: "0",
          tabletdID: "0",
          sceneType: "0",
          tableName: "lg_pickbillmain",
          fileGUID: this.applyID
        };
        imgList.push(imgObj);
      }
      for (let index = 0; index < this.fileList2.length; index++) {
        let imgObj = {
          content: this.fileList2[index].content,
          fileName: this.fileList2[index].file.name,
          nodeID: "2",
          tabletdID: "2",
          sceneType: "0",
          tableName: "lg_pickbillmain",
          fileGUID: this.applyID
        };
        imgList.push(imgObj);
      }
      let postObj = {
        imgList: imgList,
        applyID: this.applyID,
        tableName: "lg_transbillmain"
      };
      this.$api
        .post(link.upLoadImg, postObj)
        .then(result => {
          if (result.data.code == "201") {
            Toast.success("提交成功！");
            this.$router.push({
              name: "order",
              params: {
                active: 3
              }
            });
          } else {
            Toast.fail("提交失败");
          }
        })
        .catch(error => {
          Toast.fail("提交失败");
        });
    }
  }
};
</script>
<style lang="less" scoped>
.main {
  min-height: 100vh;
  height: auto;
  &-mid {
    padding-bottom: 75px;
    &-bill {
      margin-bottom: 20px;
      width: 335px;
      height: auto;
      padding: 20px;
      padding-bottom: 10px;
      background: @font-color-white;
      &-title {
        display: block;
        padding-bottom: 15px;
        .font(14px, 500, rgba(51, 51, 51, 1));
      }
    }
  }
}
</style>