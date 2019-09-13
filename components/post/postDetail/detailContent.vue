<template>
    <div class="detail-info">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-caret-right">
            <el-breadcrumb-item :to="{path: '/post'}">旅游攻略</el-breadcrumb-item>
            <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 详情 -->
        <div>
            <!-- 标题 -->
            <h4 class="detail-title" v-html="data.title"></h4>
            <!-- 阅读量 -->
            <el-row type='flex' justify='end' class="detail-watch">
                <span>攻略：{{data.created_at | createTimeFormat(data.created_at)}}</span>
                <span>阅读：{{data.watch}}</span>
            </el-row>
            <!-- 内容 -->
            <el-row>
                <div class="post-detail-content" v-html='data.content'></div>
                <el-row type="flex" justify='center' class="post-detail-others">
                    <div>
                        <i style="" class="el-icon-edit-outline"></i>
                        <p v-if='data.comments'>评论({{ 0 || data.comments.length}})</p>
                        <p v-else>评论</p>
                    </div>
                    <div @click="handleCollect">
                        <i class="el-icon-star-off"></i>
                        <p>收藏</p>
                    </div>
                    <div>
                        <i class="el-icon-share"></i>
                        <p>分享</p>
                    </div>
                    <div @click="handleGood">
                        <i class="el-icon-thumb"></i>
                        <p v-if='$store.state.post.starPost'>点赞({{ 0 || $store.state.post.starPost.length}})</p>
                        <p v-else>点赞(0)</p>
                    </div>
                </el-row>
            </el-row>
        </div>
    </div>
</template>

<script>
import { createTimeFormat } from '@/middleware/filters';
export default {
    props: {
        data:{
            type: Object,
            default: {}
        }
    },
    methods: {
        // 收藏 
        handleCollect(){
            this.commentInit('/posts/star', '收藏成功！')
        },
        // 点赞
        handleGood(){
            this.commentInit('/posts/like', '点赞成功！')
        },
        // 封装调用接口
        commentInit(url, msg){
            const {token} = this.$store.state.user.userInfo
            // 调用接口
            this.$axios({
                url,
                headers: {Authorization: `Bearer ${token}`},
                params: {id: this.$route.query.id}
            })
            .then(res => {
                this.$message.success(msg)
            })
        }
    },
    filters: {
        createTimeFormat
    }
}
</script>

<style lang="less" scoped>
 .detail-info{
    width: 700px;
    .detail-title{
        font-size: 32px;
        padding: 20px 0 20px;
        border-bottom: solid 1px #ddd;
    }
    .detail-watch{
        margin: 12px 0;
        span{
            display: block;
            font-size: 16px;
            color: #999;
            &:first-child{
                margin-right: 20px
            }
        }
    }
    .post-detail-content{
        width: 100%;
        /deep/ img{
            max-width: 700px;
        }
    }
    .post-detail-others{
        padding: 20px 0;
        text-align:center;
        cursor: pointer;
        i{
            display:block;
            padding: 0 20px;
            font-size:46px;
            color: #f60
        }
    }
 } 
</style>