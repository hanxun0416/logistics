<template>
    <div class="carCard">
        <span class="title">用车信息</span>
        <div class="item" v-for="(item,index) in carddata" :key="index">
            <span class="item-title">{{item.carNun}}</span>
            <span class="item-count">{{item.name}}</span>
            <span class="item-title">{{item.mobile}}</span>
        </div>
    </div>
</template>
<script>
export default {
    name: "CarCard",
    props: ["carddata"],
    data() {
        return {};
    }
};
</script>
<style lang="less" scoped>
.carCard {
    .card();
    .title {
        .title();
    }
    .item {
        width: 315px;
        height: 20px;
        padding: 0 19px;
        margin-top: 8px;
        .flex(row, space-between);
        span {
            display: inline-block;
        }
        &-title {
            min-width: 90px;
            max-width: 105px;
        }
        &-count {
            max-width: 45px;
            min-width: 40px;
        }
    }
}
</style>