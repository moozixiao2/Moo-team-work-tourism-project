<template>
    <div class="hotel-item-wrap">
      <el-row type='flex' justify='space-between' class="hotel-item" v-for="(item, index) in pageData" :key="index">
        <div class="hotel-item-image">
          <nuxt-link :to="'hotel/detail?id=' + item.id">
            <img :src="item.photos" alt="">
          </nuxt-link>
        </div>
        <div class="hotel-item-info">
          <h4><nuxt-link :to="'hotel/detail?id=' + item.id">{{item.name}}</nuxt-link></h4>
          <div class="hotel-item-huanguan">
            {{item.alias}}
            <span v-if='item.hotellevel' :title="item.hotellevel.level + '星级'"><i v-for="(item, index) in item.hotellevel.level" :key="index" class="iconfont icon-huangguan"></i></span>
            {{item.hoteltype.name}}
          </div>
          <el-row type='flex' class="hotel-item-score">
            <el-rate
              v-model="item.stars"
              disabled
              show-score
              text-color="#ff9900"
              :score-template="item.stars + '分'">
            </el-rate>
            <div>条评价</div>
            <div>篇游记</div>
          </el-row>
          <div class="hotel-item-address">
            <span><i class="iconfont icon-lunkuodasan-1"></i>{{item.address}}</span>
          </div>
        </div>
        <div class="hotel-item-price-wrap">
          <nuxt-link to="#">
            <el-row type='flex' justify='space-between' class="hotel-item-price" v-for="(item2, index2) in item.products" :key='index2'>
                <div class="hotel-item-price-title">
                  {{item2.name}}
                </div>
                <div class="hotel-item-price-info">
                  <span>￥{{item2.price}}</span>起 <i class="el-icon-arrow-right"></i>
                </div>
            </el-row>
          </nuxt-link>
        </div>
      </el-row>
      <!-- 分页 -->
        <el-row type="flex" justify="end" >
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pageIndex"
            :page-size="pageSize"
            layout="total, prev, pager, next"
            :total="total">
          </el-pagination>
        </el-row>
    </div>
</template>

<script>
export default {
  data(){
    return{
      hotelData: [],
      // 分页
      pageIndex: 1,
      pageSize: 4,
      total: 0,
      // 分页数据
      pageData: []
    }
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      this.pageSize = val
      // 重新获得数据
      this.pageData = this.hotelData.slice(0, val)
    },
    handleCurrentChange(val) {
      this.pageIndex = val
      // 重新获得数据
      this.pageData = this.hotelData.slice((this.pageIndex -1 ) * this.pageSize, this.pageIndex * this.pageSize)
    },
    // 封装调用接口的方法
    hotelInit(){
        this.$axios({
          url: '/hotels',
          params: {city: this.$route.query.city}
        })
        .then(res => {
          const {data, total} = res.data
          this.hotelData = [...data]
          this.total = total
          // 分页数据
          this.pageData = this.hotelData.slice(0, this.pageSize)
        })
    }
  },
  mounted () {
    this.hotelInit()
  }
}
</script>

<style lang="less" scoped>
.hotel-item-wrap{
    .hotel-item{
      padding: 30px 0;
      border-bottom: solid 1px #ccc;
      .hotel-item-image{
        width: 320px;
        height: 210px;
        img{
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .hotel-item-info{
        width: 425px;
        h4{
          font-weight: 500;
          font-size: 22px;
        }
        .hotel-item-huanguan{
          color:#666;
          span{
            i{
              color:#f60;
            }
          }
        }
        .hotel-item-score{
          margin: 12px 30px 10px 0;
          font-size: 14px;
          div{
            margin-right: 10px;
          }
        }
      }
      .hotel-item-price-wrap{
        width: 234px;
        margin-top: 20px;
        color:#666;
        .hotel-item-price{
          padding: 12px 8px;
          border-bottom: solid 1px #ccc;
          .hotel-item-price-title{
            
          }
          .hotel-item-price-info{
            span{
              color: #f60;
            }
            i{
              vertical-align: middle;
            }
          }
          &:hover{
            background: #f1f1f1;
          }
        }
      }
    }
}
</style>