<template>
    <div class="carCard" @click="cardClick()" id="carCard">
        <van-checkbox :disabled="checkable" class="checkbox" v-model="carddata.checked"></van-checkbox>
        <div class="carInfo">
            <div>
                <img src="../../assets/mine/carid.png" />
                <span>车号</span>
                <span>{{carddata.carId}}</span>
            </div>
            <div>
                <img src="../../assets/mine/siji.png" />
                <span>司机</span>
                <span>{{carddata.name}}</span>
            </div>
            <div>
                <img src="../../assets/mine/mobile.png" />
                <span>联系方式</span>
                <span>{{carddata.mobile}}</span>
            </div>
        </div>
    </div>
</template>
<script>
import { SwipeCell, Cell, Button, Checkbox } from "vant";
export default {
    name: "SendCarCard",
    props: ["carddata", "checkable"],
    components: {
        [SwipeCell.name]: SwipeCell,
        [Cell.name]: Cell,
        [Button.name]: Button,
        [Checkbox.name]: Checkbox
    },
    data() {
        return {
            checked: true
        };
    },
    created() {},
    computed: {},
    methods: {
        cardClick() {
            if (this.checkable) {
                return;
            }
            this.$emit("cardClick", this.carddata.index);
        }
    }
};
</script>
<style lang="less" scoped>
.carCard {
    width: 355px;
    margin: 0 auto;
    margin-bottom: 15px;
    overflow-x: hidden;
    position: relative;
    height: 120px;
    .carInfo {
        .flex(column, space-between);
        .font(14px, 400, rgba(51, 51, 51, 1));
        width: 355px;
        height: 80px;
        padding: 20px 0;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 1px 10px 0px rgba(192, 218, 255, 0.6);
        border-radius: 5px;
        img {
            width: 18px;
            height: auto;
            margin: 0 8px;
        }
        span {
            display: inline-block;
            min-width: 94px;
            max-width: 200px;
        }
    }
    .checkbox {
        display: inline-block;
        position: absolute;
        right: 10px;
        top: 10px;

    }
}
</style>
<style >

</style>

