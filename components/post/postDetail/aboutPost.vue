<template>
    <div>
        <el-row type="flex" class="aboutPost" v-for="(item,index) in recommendData" :key='index'>
            <nuxt-link :to="'/post/detail?id=' + item.id">
              <el-row type="flex" justify="space-between">
                <img :src="item.images[0]" :title="item.title" />
                <div class="aboutPost-text">
                  <h4 :title="item.title">{{item.title}}</h4>
                  <p>
                    {{item.created_at | createTimeFormat(item.created_at)}}
                    <span v-if='item.like'>阅读({{item.like}})</span>
                    <span v-else>阅读</span>
                  </p>
                </div>
              </el-row>
            </nuxt-link>
        </el-row>
    </div>
</template>
<script>
import { createTimeFormat } from '@/middleware/filters';
export default {
  data() {
    return {
      // 调用接口返回的数据
      recommendData: []
    };
  },
  filters: {
    createTimeFormat
  },
  mounted() {
    this.$axios({
      url: "/posts/recommend",
      params: {id: this.$route.query.id}
    }).then(res => {
      const { data } = res.data;
      this.recommendData = data;
      // console.log(this.recommendData)
    });
  }
};
</script>

<style lang="less" scoped>
.aboutPost {
  width: 280px;
  padding: 15px 0;
  border-bottom: solid 1px #ddd;
  img {
    display: block;
    width: 100px;
    height: 80px;
    margin-right: 15px;
  }
  .aboutPost-text {
    width: 165px;
    h4 {
      height: 70%;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    p {
      height: 30%;
      line-height: 30px;
      font-size: 12px;
      color: #999;
    }
  }
}
</style>