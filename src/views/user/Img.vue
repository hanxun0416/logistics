<template>
    <div class="main">
       <img :src=$route.query.url :alt=$route.query.name class="isheight" v-if="$route.query.name=='实名认证授权委托书'" />
           <img :src=$route.query.url :alt=$route.query.name class="noheight" v-else />
    </div>
</template>
<script>
export default {
}
</script>
<style scoped>
.main,.main img{
width: 100%
}
.isheight{
    height: auto;
}
.noheight{
    height: 100%;
}

</style>