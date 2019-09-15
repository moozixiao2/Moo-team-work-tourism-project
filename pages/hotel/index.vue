<template>
  <div class="contianer">
    <!-- 城市酒店筛选 -->
    <HotelForm @cityHotelList="cityHotelList" />
    <el-row>
      <el-col :span="12">
        <!-- 城市区域信息 -->
        <HotelRegion :name="HotelRegion" />
      </el-col>
      <el-col :span="12">
        <!-- 地图 -->
        <HotelMap />
      </el-col>
    </el-row>
    <!-- 酒店列表 -->
    <HotelList/>
  </div>
</template>

<script>
import HotelForm from "@/components/hotel/hotelForm.vue";
import HotelRegion from "@/components/hotel/hotelRegion.vue";
import HotelMap from "@/components/hotel/hotelMap.vue";
import HotelList from "@/components/hotel/HotelList.vue";
export default {
  components: {
    // 注册组件
    HotelForm,
    HotelRegion,
    HotelMap,
    HotelList
  },
  data() {
    return {
      // 存储数据
      HotelList: [],
      // 返回的城市数据
      HotelRegion: {},
      Hotels: {
        id: "1", //酒店Id
        city: "74", //城市id
        price_in: "99", //酒店价格
        scenic: "3227", //景点id
        name_contains: "", //名字模糊查询
        hoteltype: 1, //酒店类型
        hotelbrand: 1, //酒店品牌
        hotelasset: 1, //酒店设施
        enterTime: "", //入店时间
        leftTime: "",
        person: 2, //人数
        limit: 10, //条数
        start: 1
      }
    };
  },
  mounted() {
    // 调用请求接口
    this.getCityHotel();
  },
  methods: {
    getCityHotel() {
      this.$axios({
        url: "/hotels",
        params: { city: this.$route.query.city }
      }).then(res => {
        console.log(res);
        // 区域详情
        this.HotelList = res.data.data;
        // 获取城市数据
        this.HotelRegion = res.data.data[0].city.name;
      });
    },
    cityHotelList(arr) {
      // // console.log(arr);
      // this.$axios({
      //   url: "/hotels",
      //   params: { city: arr }
      // }).then(res => {
      //   this.cityHotel=res.data.data
      //   console.log(this.cityHotel);
        this.$router.push({
          path:"/hotel",
          query:{city:arr}
        })
      // });
    }
  }
};
</script>

<style lang='less' scoped>
.contianer {
  width: 1000px;
  margin: 20px auto;
}
</style>