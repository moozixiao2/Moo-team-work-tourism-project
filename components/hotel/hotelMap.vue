<template>
  <div id="container"></div>
</template>

<script>
export default {
  mounted() {
    //   等待url加载完毕之后执行
    window.onLoad = function() {
        // 创建地图，container是容器的id
      var map = new AMap.Map("container");
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