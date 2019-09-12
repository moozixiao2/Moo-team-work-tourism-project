<template>
    <div class="postShow">
        <!-- <div type="flex" class="recommed-item" v-for="(item, index) in data" :key="index"> -->
        <div type="flex" class="recommed-item">
            <!-- 图片长度大于2，对应布局的显示 -->
            <div class="recommed-item-1" v-if='data.images.length > 2'>
                <!-- 标题 -->
                <h3><nuxt-link  :to='"post/detail?id="+data.id' v-html='data.title'></nuxt-link></h3>
                <!-- 内容 -->
                <p><nuxt-link :to='"post/detail?id="+data.id' v-html="data.summary"></nuxt-link></p>
                <!-- 图片 -->
                <el-row class="item-img" type='flex' justify='space-between'>
                    <nuxt-link :to='"post/detail?id="+data.id' v-for="(img,index) in data.images" :key='index'>
                        <img :src="img" v-if='index < 3' alt="">
                    </nuxt-link>
                </el-row>
                <!-- 用户发表的相关信息 -->
                <el-row type='flex' align='middle' justify='space-between' class="other-info">
                    <el-row type="flex">
                        <span><i class="el-icon-location-outline"></i>{{data.cityName}}</span>
                        <el-row type='flex' align='middle'>by <nuxt-link to='#'>
                            <img :src="$axios.defaults.baseURL + data.account.defaultAvatar" alt=""><span>{{data.account.nickname}}</span></nuxt-link>
                        </el-row>
                        <div><i class="el-icon-view"></i>{{data.watch}}</div>
                    </el-row>
                    <div style="color:#f60;font-size: 16px;">
                        {{data.like || 0}} 赞
                    </div>
                </el-row>
            </div>
            <div class="recommed-item-2" v-else>
                <el-row type="flex" justify="" >
                    <el-col :span="8">
                        <nuxt-link :to='"post/detail?id="+data.id' v-show="data.images.length">
                            <img :src="data.images[0]" alt="">
                        </nuxt-link>
                    </el-col>
                    <el-col :span="16">
                        <h3><nuxt-link :to='"post/detail?id="+data.id' v-html='data.title'></nuxt-link></h3> 
                        <p><nuxt-link :to='"post/detail?id="+data.id' v-html="data.summary"></nuxt-link></p>
                        <el-row type='flex' align='middle' justify='space-between' class="other-info">
                            <el-row type="flex">
                                <span><i class="el-icon-location-outline"></i>{{data.cityName}}</span>
                                <el-row type='flex' align='middle'>by <nuxt-link to='#'><img :src="$axios.defaults.baseURL + data.account.defaultAvatar" alt=""><span>{{data.account.nickname}}</span></nuxt-link></el-row>
                                <div><i class="el-icon-view"></i>{{data.watch}}</div>
                            </el-row>
                            
                            <div style="color:#f60;font-size: 16px;">
                                {{data.like || 0}} 赞
                            </div>
                        </el-row>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        data: {
            type: Object,
            default: []
        }
    },
    data() {
        return {
        }
    },
    mounted () {
        // console.log(this.data)
    }
}
</script>

<style lang="less" scoped>
.postShow{
    .recommed-item{
        padding: 20px 0;
        border-bottom: solid 1px #ddd;
        .recommed-item-1{
            >h3{
                font-weight: 500;
                a:hover{
                    color: #f60;
                }
            }
            
            >p{
                height:63px;
                overflow:hidden;
                margin: 12px 0 15px;
                font-size: 14px;
                line-height: 1.5;
                color:#666;
            }
            >.item-img{
                img{
                    display: block;
                    width:220px;
                    height:150px;
                }
            }
        }
        .other-info{
            margin-top: 20px;
            font-size: 12px;
            color:#666;
            i{
                margin-right: 3px;
            }
            .el-row{
                margin: 0 8px;
                a{
                    color: #f60;
                    box-sizing: border-box;
                    img{
                        width: 16px;
                        height: 16px;
                        margin: 0 5px 0;
                        vertical-align: middle;
                    }
                }
                span{
                    vertical-align: middle
                }
            }
        }
        .recommed-item-2{
            .el-col h3{
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-weight: 500;
                a:hover{
                    color: #f60;
                }
            }
            .el-col {
                > p{
                    overflow: hidden;
                    height: 63px;
                    margin: 12px 0 15px;
                    line-height: 1.5;
                    font-size: 14px;
                    color:#666;
                }
            }
            >.el-row{
                img{
                    width:220px;
                    height:150px;
                }
            }
        }
    }
}
</style>