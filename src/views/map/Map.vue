<template>
  <div class="map">
  <div id="allmap" class="allmap"></div>
<van-button type="info" class="goAddr" @click="checkRoute">查看路线</van-button>
   </div>
</template>
<script>
import {Button} from 'vant'
export default {
  name: "Map",
  components:{
    [Button.name]:Button
  },
 data(){
  return{
    address:""
  }
 },
    mounted() {
  var map = new BMap.Map("allmap");
	var point = new BMap.Point(116.331398,39.897445);
	map.centerAndZoom(point,12);
	// 创建地址解析器实例
	var myGeo = new BMap.Geocoder();
  // 将地址解析结果显示在地图上,并调整地图视野
  this.address =this.$route.query.addr
	myGeo.getPoint(this.address, function(point){
		if (point) {
			map.centerAndZoom(point, 16);
			map.addOverlay(new BMap.Marker(point));
		}else{
			alert("您选择地址没有解析到结果!");
		}
	},'上海市');
    },
    methods:{
      checkRoute(){
        window.location.href='https://map.baidu.com/mobile/webapp/search/search/qt=s&wd='+this.address+'/?third_party=uri_api'
      }
    }
  }

</script>
<style lang="less" scoped>
  .map,.allmap{
    height: 100%;
  }
  .map{
    position: fixed;
    width: 100%;
  }
.goAddr{
  position: fixed;
  z-index: 11;
  bottom: 0;
  width: 100%;
}
</style>