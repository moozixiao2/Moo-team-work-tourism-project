<template>
  <div class="postIndex">
      <el-row type="flex" justify="space-between" class="postContent">
        <!-- 左边 -->
        <PostIndexLeft @setCityName='setCityName'/>
        <!-- 右边 -->
        <el-row class="rightContent">
          <!-- 搜索部分 -->
          <div class="postSearch">
              <!-- 搜索 -->
              <el-row type='flex' justify='space-between' class="search-input">
                  <input type="text" placeholder="请输入想去的地方，比如：'广州'" v-model="cityName" @change='handleSearchCity(cityName)'>
                  <i class="el-icon-search"></i>
              </el-row>
              <!-- 推荐 -->
              <el-row type="flex" justify="" class="recommend">
                  推荐： <span v-for="(item,index) in ['广州', '上海', '北京']" :key='index' @click='cityName=item;handleSearchCity(cityName)'>{{item}}</span>
              </el-row>
          </div>

          <!-- 文章 -->
          <div>
            <!-- 推荐攻略头部 -->
            <el-row type="flex" justify="space-between" align='middle' class="post-title">
                <h3>推荐攻略</h3>
                <el-button type="primary" icon="el-icon-edit" @click="$router.push('/post/add')">写游记</el-button>
            </el-row>
            <!-- 推荐攻略对应项 -->
            <PostShow v-for="(item, index) in postData" :key='index' :data='item'/>

            <!-- 分页 -->
            <el-pagination
                style='margin: 20px 0;'
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageIndex"
                :page-sizes="[1, 2, 3, 4]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
          </div>
        </el-row>
      </el-row>
  </div>
</template>

<script>
// 点击 左边 并把城市名赋给input
import PostIndexLeft from '@/components/post/postIndexLeft';
import PostShow from '@/components/post/postShow';
export default {
  components: {
    PostIndexLeft, PostShow
  },
  data(){
    return{
      pageIndex: 1,
      pageSize: 2,
      // 分页总数
      total: 0,
      // 文章数据
      postData: [],
      // 搜索绑定的变量
      cityName: ''
    }
  },
  methods: {
    // 左边菜单点击，搜索框变化
    setCityName(cityName){
      this.cityName = cityName
    },
    // 查询
    handleSearchCity(cityName){
      // console.log(city)
      if(!this.$route.query.city){
        this.postAboutCityInit(0, this.pageSize, cityName)
      }
    },
    // 分页
    handleSizeChange(val) {
      console.log(val)
      // start 从0开始
      this.pageIndex = 0

      this.pageSize = val
      // 存在地址参数时
      if(this.$route.query.city){
        this.postAboutCityInit(this.pageIndex, this.pageSize, this.$route.query.city)
        return
      }
      
      // console.log(this.cityName)
      // 存在cityName
      if(this.cityName){
        this.postAboutCityInit(this.pageIndex, this.pageSize, this.cityName)
        return
      }

      this.postInit(this.pageIndex, this.pageSize)
    },
    handleCurrentChange(val) {
      this.pageIndex = val

      // 存在地址参数时
      if(this.$route.query.city){
        // 分页显示
        this.postAboutCityInit((this.pageIndex-1)*this.pageSize, this.pageSize, this.$route.query.city)
        return
      }
      // 存在cityName
      if(this.cityName){
        this.postAboutCityInit((this.pageIndex-1)*this.pageSize, this.pageSize, this.cityName)
        return
      }
      
      this.postInit((this.pageIndex-1)*this.pageSize, this.pageSize)
    },
    // 传入城市参数接口
    postAboutCityInit(s,l,city){
      this.$axios({
        url: '/posts',
        params: {_start: s, _limit: l, city}
      })
      .then(res => {
        // console.log(res.data)
        const {data, total} = res.data
        this.postData = data

        this.total = total
        // 点击分页条数会显示所有数据
      })
    },
    // 封装调用接口函数
    postInit(e,v){
      this.$axios({
        url: '/posts',
        params:{_start: e, _limit: v}
      })
      .then(res => {
        // console.log(res)
        const {data, total} = res.data
        this.postData = data
        this.total = total
        // console.log(data,total)
      })
    }
  },
  watch: {
    $route(){
      this.postAboutCityInit(0, this.pageSize, this.$route.query.city)
    }
  },
  mounted() {
    if(this.$route.query.city){
      this.postAboutCityInit(0, this.pageSize, this.$route.query.city)
      return
    }

    if(this.cityName){
      this.postAboutCityInit(0, this.pageSize, this.cityName)
      return
    }

    this.postInit(0, this.pageSize)
  }
}
</script>

<style lang="less" scoped>
.postIndex{
  min-width: 1000px;
  margin-top: 20px;
  .postSearch{
    width: 100%;
    .search-input{
        border: solid 2px #f60;
        height: 40px;
        line-height: 40px;
        input{
        flex: 1;
        outline: none;
        border: 0;
        padding: 0 20px;
        background:none;
        box-sizing: border-box;
        }
        i{
        width: 24px;
        height: 24px;
        margin-top: 6px;
        margin-right: 10px;
        font-size: 22px;
        font-weight: 600;
        color:#f60;
        }
    }
    .recommend{
        margin: 10px 0;
        font-size: 12px;
        color: #666;
        span{
        margin: 0 4px;
        cursor: pointer;
        }
    }
  }
  .postContent {
    width: 1000px;
    margin: 0 auto;
    .rightContent{
      width:700px;
      .post-title{
        padding-bottom: 10px;
        border-bottom: solid 1px #ddd;
        h3{
            font-weight: 500;
            color:#f60;
            position: relative;
            &::after{
                content: '';
                position: absolute;
                left:0;
                bottom:-17px;
                width:100%;
                border-bottom: solid 2px #f60;
            }
        }
    }
    }
  }
}
</style>