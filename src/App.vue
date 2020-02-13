<template>
    <div id="app">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive" />
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" />
    </div>
</template>
<style lang="less">
@import "../src/uitls/css/modifyvant.less";
@import "../src/uitls/css/layout.less";
html,body,#app{
    min-height: 100%;
}
</style>
