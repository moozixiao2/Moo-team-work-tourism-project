<template>
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
</template>

<script>
export default {
    data() {
        return {
            cityName: ''
        }
    },
    methods: {
        handleSearchCity(city){
            this.$emit('cityParamsToPost', city)
        }
    }
}
</script>

<style lang="less" scoped>
    
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
</style>