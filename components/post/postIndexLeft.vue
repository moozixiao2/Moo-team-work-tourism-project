<template>
  <div class="postIndexLeft">
    <!-- 菜单 -->
    <div class="menus-wrap">
      <div class="menus" @mouseleave="current = 5">
          <!-- menus-nav -->
          <el-row type="flex" v-for="(item, index) in cityList" :key='index' :class="{menusNav: true, active: current === index}" @mouseenter.native="current = index; menus.item = item.children; menus.index=index">
            {{item.type}}
            <!-- menus-item -->
          </el-row>
          <el-row v-if='current === menus.index'  justify="" class="menus-item-wrap">
            <div v-for="(subitem, subindex) in menus.item" :key='subindex' class="menus-item">
              <span class='menus-item-rank'>{{subindex+1}}</span>
              <nuxt-link :to="'/post?city=' + subitem.city"><span class='menus-item-city' @click="handleClick(subitem.city)">{{subitem.city}}</span></nuxt-link>
              <nuxt-link :to="'/post?city=' + subitem.city"><span class='menus-item-desc' @click="handleClick(subitem.city)">{{subitem.desc}}</span></nuxt-link>
            </div>
          </el-row>
      </div>
    </div>
    <!-- <div class="menus"> -->
      <!-- tabs-nav -->
      <!-- <el-row
        type="flex"
        v-for="(item, index) in cityList"
        :key="index"
        :class='{active: current === index, "menus-wrap": true}'
        @mouseenter.native="current = index"
        @mouseleave.native="current = 5"
      >
        <el-row type="flex" justify="space-between" class="menus-nav">
          <span>{{item.type}}</span>
          <i class="el-icon-arrow-right"></i>
        </el-row> -->
        <!-- tabs-content -->
        <!-- <el-row class="menus-item" v-if="current === index">
          <div class="menus-item-text" v-for="(subitem,subindex) in item.children" :key="subindex">
            <i>{{subindex+1}}</i>
            <em>{{subitem.city}}</em>
            <span>{{subitem.desc}}</span>
          </div>
        </el-row>
      </el-row>
    </div> -->
    <!-- 推荐城市 -->
    <div class="recommendCity">
      <h4>推荐城市</h4>
      <nuxt-link to='#'><img src="http://157.122.54.189:9093/images/pic_sea.jpeg" alt=""></nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //
      postData: [],
      // menus item
      menus: {
        index: 0,
        item: []
      },
      // 城市列表
      cityList: [],
      current: 5
    }
  },
  methods: {
    handleClick(val){
      // console.log(val)
      // 发射 val 的函数
      this.$emit('setCityName', val)
      // 调用接口
      this.$axios({
        url: '/posts',
        params: {city: val}
      })
      .then(res => {
        this.postData = res.data
        // console.log(res.data)
      })
    }
  },
  mounted() {
    this.$axios({
      url: "posts/cities"
    }).then(res => {
      const { data } = res.data;
      this.cityList = data;
      // console.log(data);
    });
  }
};
</script>

<style lang="less" scoped>
.postIndexLeft {
  width: 260px;
  .menus-wrap{
    width:100%;
    .menus{
      border-bottom: solid 1px #ddd;
      position: relative;
      box-sizing: border-box;
      z-index: 3;
    }
    .menusNav{
        position: relative;
        width:100%;
        height: 41px;
        padding: 0 20px;
        font-size: 14px;
        line-height: 41px;
        border: solid 1px #ddd;
        border-bottom: solid 1px transparent;
        box-sizing: border-box;
        background-color: #fff;
      z-index: 3;
      &::before,&::after{
        content: '';
        display: block;
        position: absolute;
        top:14px;
        right:10px;
        border-left: solid 8px #666;
        border-right: solid 8px transparent;
        border-top: solid 8px transparent;
        border-bottom: solid 8px transparent;
      }
      &::after{
        right:11px;
        border-left: solid 8px #fff;
      }
    }
    // 激活
    .active{
      color:#f60;
      border-right: solid 1px #fff;
      &::after{
        right: 10px;
        border-left-color: #f60;
      }
    }
    .menus-item-wrap{
      position: absolute;
      top: 0;
      left: 259.5px;
      width:360px;
      box-sizing: border-box;
      padding: 10px 10px 0px;
      background:#fff;
      border: solid 1px #ddd;
      z-index: -1;
      .menus-item{
        width:100%;
        height:40px;
        span{
          display: inline-block;
          font-size: 14px;
          color:#f60;
          &:hover {
            text-decoration: underline;
          }
        }
        .menus-item-rank{
          margin-left: 15px;
          font-size: 22px;
        }
        .menus-item-city{
          font-size: 14px;
          padding-top: 6px;
          margin: 0 8px;
          vertical-align: top;
        }
        .menus-item-desc{
          padding-top: 6px;
          vertical-align: top;
          color: #666;
        }
      }
    }
  }

  .recommendCity{
    h4{
      padding: 20px 0 10px;
      font-weight: 500;
      border-bottom: solid 1px #ddd;
    }
    a{
      display: block;
      margin-top: 10px;
      img{
        width:100%;
      }
    }
  }
}
</style>