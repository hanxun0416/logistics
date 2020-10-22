<template>
  <div class="main">
    <div class="main-head">
      <img @click="toMine()" src="../../assets/offer/wode.png" />
      <div class="paid">
        <router-link  :to="{path:'/invoiced', query: {data: false}}">
          <span class="amount">{{ moneySum5 }}</span>
          <span class="tag">待付款(元) </span>
        </router-link>
      </div>
      <div class="unpaid">
        <router-link  :to="{path:'/invoiced', query: {data: false}}">
          <span class="amount">{{ moneySum6 }}</span>
          <span class="tag">已付款(元)</span>
        </router-link>
      </div>
    </div>
    <div class="main-mid">
      <div class="reconciliation">
        <div class="title">
          <img src="../../assets/settlement/duizhangicon.png" />
          <span>对账管理</span>
        </div>
        <van-collapse v-model="activeName" accordion>
          <van-collapse-item
            title="待对账"
            name="1"
            :value="`￥${sumUnSettle}`"
          >
            <van-cell
              title="加工待对账"
              is-link
              :value="`￥${moneySum7}`"
              to="/unSettlemach"
            ></van-cell>
            <van-cell
              title="贸易待对账"
              is-link
              :value="`￥${moneySum1}`"
              to="/unSettleTrade"
            ></van-cell>
          </van-collapse-item>
        </van-collapse>
        <van-cell
          title="已对账"
          is-link
          :value="`￥${moneySum2}`"
          to="/settled"
        ></van-cell>
      </div>
      <div class="reconciliation">
        <div class="title">
          <img src="../../assets/settlement/duizhangicon.png" />
          <span>开票管理</span>
        </div>
        <van-cell
          title="待开票"
          is-link
          :value="`￥${moneySum3}`"
          to="/uninvoice"
        ></van-cell>
        <van-cell
          title="已开票"
          is-link
          :value="`￥${moneySum4}`"
          @click="toIn"
        >
          <!-- <van-icon
            slot="right-icon"
            :name="require('../../assets/settlement/youchejiantou.png')"
            style="padding-left:5px;line-height: inherit;"
          />-->
        </van-cell>
      </div>
    </div>
  </div>
</template>
<script>
import { Cell, Icon, Collapse, CollapseItem } from "vant";
import { toDecimal } from "../../uitls/js/decimal";
import link from "../../uitls/js/link";
export default {
  name: "Settlement",
  components: {
    [Cell.name]: Cell,
    [Icon.name]: Icon,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
  },
  data() {
    return {
      activeName: "0",
      moneySum1: "", //贸易未对账
      moneySum2: "", //已对账
      moneySum3: "", //未开票
      moneySum4: "", //已开票
      moneySum5: "", //未付款
      moneySum6: "", //已付款
      moneySum7: "", //加工待对账
    };
  },
  activated() {
    this.getMoney();
  },
  created() {
    this.getMoney();
  },
  computed: {
    sumUnSettle: function () {
      return toDecimal(
        (parseFloat(this.moneySum1) + parseFloat(this.moneySum7)) * 100,
        2
      );
    },
  },
  methods: {
    getMoney() {
      let postObj = {
        transCorpID: 71536,
      };
      this.$api.post(link.settleMoney, postObj).then((result) => {
        console.log(result);
        if (result.data.code == "200") {
          let data = result.data.data;
          [
            this.moneySum1,
            this.moneySum2,
            this.moneySum3,
            this.moneySum4,
            this.moneySum5,
            this.moneySum6,
            this.moneySum7,
          ] = [
            toDecimal(data.moneySum1 * 100, 2),
            toDecimal(data.moneySum2 * 100, 2),
            toDecimal(data.moneySum3 * 100, 2),
            toDecimal(data.moneySum4 * 100, 2),
            toDecimal(data.moneySum5 * 100, 2),
            toDecimal(data.moneySum6 * 100, 2),
            toDecimal(data.moneySum7 * 100, 2),
          ];
        }
      });
    },
    //到"我的"页面
    toMine() {
      this.$router.push("/mine");
    },
    toIn() {
      this.$router.push({
        path: '/invoiced',
        query: {
          data: true,
        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
/deep/.van-collapse-item__content {
  padding: 0;
}
.main {
  &-head {
    position: relative;
    width: 100%;
    height: 60px;
    padding-top: 25px;
    .flex(row, space-arround);
    .bgconfig(url("../../assets/settlement/ditu.png"), no-repeat, 100% 100%);
    img {
      width: 25px;
      height: 25px;
      position: absolute;
      top: 10px;
      right: 10.5px;
    }
    .paid,
    .unpaid {
      width: 50%;
      text-align: center;
      span {
        display: block;
      }
      .amount {
        .font(19px, 500, @font-color-white);
        line-height: 20px;
      }
      .tag {
        margin-top: 16px;
        .font(14px, 400, @font-color-white);
        line-height: 20px;
        opacity: 0.65;
      }
    }
  }
  &-mid {
    padding-bottom: 120px;
    width: 100%;
    .reconciliation {
      margin-top: 15px;
      .title {
        height: 44px;
        background-color: #fff;
        border-bottom: 1px solid #ebedf0;
        img {
          display: inline-block;
          width: 15px;
          height: 16px;
          margin-top: 14px;
          vertical-align: text-bottom;
          margin-left: 15px;
        }
        span {
          display: inline-block;
          .font(15px, 400, @btn-blue);
          line-height: 20px;
          vertical-align: middle;
          margin-left: 7px;
        }
      }
    }
  }
}
</style>