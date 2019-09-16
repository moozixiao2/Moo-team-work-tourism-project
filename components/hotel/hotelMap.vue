<template>
  <div id="container"></div>
</template>

<script>
export default {
  mounted() {
    //   等待url加载完毕之后执行
    window.onLoad = function() {
        // 创建地图，container是容器的id
      var map = new AMap.Map("container",{
         zoom: 9, //级别
        center: [118.767629, 32.06575] //中心点坐标
      });
      //为地图注册click事件获取鼠标点击出的经纬度坐标
      // var clickEventListener = map.on("click", function(e) {
      //   var lng = e.lnglat.getLng();
      //   var lat = e.lnglat.getLat();
      //   console.log("经度：" + lng + "纬度" + lat);
      //   var lnglatXY = [lng, lat]; //地图上所标点的坐标
      //   AMap.service("AMap.Geocoder", function() {
      //     //回调函数
      //     geocoder = new AMap.Geocoder({});
      //     geocoder.getAddress(lnglatXY, function(status, result) {
      //       if (status === "complete" && result.info === "OK") {
      //         //获得了有效的地址信息:
      //         //即，result.regeocode.formattedAddress
      //         console.log(result.regeocode.formattedAddress);
      //         var address = result.regeocode.formattedAddress;
      //       } else {
      //         //获取地址失败
      //       }
      //     });
      //   });
      // });
    };
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=204a00e42f8fee046ff22c6fc5f8d275&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  }
};
</script>

<style scoped>
#container {
  height: 260px;
  width: 420px;
}
</style>