<template>
  <div class="hotelFilter">
    <div class="hotelFilter-item">
      <div class="hotelFilter-title">
        <span>价格</span>
        <span>0-{{newPrice}}</span>
      </div>
      <div class="hotelFilter-select">
        <el-slider v-model="price" :format-tooltip="formatTooltip"></el-slider>
      </div>
    </div>
    <div class="hotelFilter-item">
      <div class="hotelFilter-title">
        <span>住宿等级</span>
      </div>
      <div class="hotelFilter-select">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{hetelLevels}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(item,index) in levels"
              :key="index"
              :command="`${item.name}`"
            >{{item.name}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="hotelFilter-item">
      <div class="hotelFilter-title">
        <span>住宿类型</span>
      </div>
      <div class="hotelFilter-select">
        <el-dropdown @command="handleTypes">
          <span class="el-dropdown-link">
            {{hetelTypes}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(item,index) in types"
              :key="index"
              :command="`${item.name}`"
            >{{item.name}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="hotelFilter-item">
      <div class="hotelFilter-title">
        <span>酒店设施</span>
      </div>
      <div class="hotelFilter-select">
        <el-dropdown @command="handleAssets">
          <span class="el-dropdown-link">
            {{hetelAssets}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(item,index) in assets"
              :key="index"
              :command="`${item.name}`"
            >{{item.name}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="hotelFilter-item">
      <div class="hotelFilter-title">
        <span>酒店品牌</span>
      </div>
      <div class="hotelFilter-select">
        <el-dropdown @command="handleBrands">
          <span class="el-dropdown-link">
            {{hetelBrands}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(item,index) in brands"
              :key="index"
              :command="`${item.name}`"
            >{{item.name}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      price: 4000,
      newPrice: 4000,
      levels: [], // 住宿等级
      types: [], // 住宿类型
      assets: [], // 酒店设施
      brands: [], // 酒店品牌
      hetelLevels: "不限", //住宿等级数据绑定
      hetelTypes: "不限",
      hetelAssets: "不限",
      hetelBrands: "不限"
    };
  },
  methods: {
    handleCommand(command) {
      this.hetelLevels = command;

      this.$axios({
        url: "/hotels",
        params: { hotellevel:command }
      }).then(res => {
        console.log(res);

        // this.$router.push({
        //   path: "/hotels",
        //   query: {city: this.$route.query.city,hotellevel:1}
        // });
      });
    },
    handleTypes(command) {
      // console.log(command)
      this.hetelTypes = command;
    },
    handleAssets(command) {
      this.hetelAssets = command;
    },
    handleBrands(command) {
      this.hetelBrands = command;
    },
    // 滑块
    formatTooltip(val){
        this.newPrice = val * 40
        return val * 40;
    }
  },
  mounted() {
    this.$axios({
      url: "/hotels/options"
    }).then(res => {
      console.log(res);
      this.levels = res.data.data.levels;
      this.types = res.data.data.types;
      this.assets = res.data.data.assets;
      this.brands = res.data.data.brands;
    });
  }
};
</script>

<style lang="less" scoped>
.hotelFilter {
  display: flex;
  margin: 30px 0 0px;
  border: solid 1px #ccc;
  .hotelFilter-item {
    flex: 1;
    margin: 10px 0;
    padding: 0 15px;
    border-right: solid 1px #ccc;
    .hotelFilter-title {
      display: flex;
      justify-content: space-between;
      color: #666;
    }
    .hotelFilter-select {
      width: 100%;
      margin-top: 10px;
      /deep/ .el-dropdown {
        width: 100%;
        > span {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        ul,
        li {
          width: 100%;
        }
        /deep/ .el-dropdown-menu,
        .el-dropdown-item,
        .el-popper {
          width: 100%;
        }
      }
    }
    &:nth-child(1) {
      flex: 1.4;
    }
    &:nth-child(5) {
      border-right: none;
    }
  }
}
</style>