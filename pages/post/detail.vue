<template>
    <el-row type='flex' justify='space-between' class="post-detail">
        <!-- 左边内容 -->
        <div>
            <DetailContent :data='detailData' />
            <PostComment />
            <CommentItems :data='commentData'  v-if='total <= 0'/>
        </div>
        <!-- 右边相关攻略 -->
        <div class="about-post">
            <h3>相关攻略</h3>
            <AboutPost/>
        </div>
    </el-row>
</template>

<script>
import DetailContent from '@/components/post/postDetail/detailContent';
import AboutPost from '@/components/post/postDetail/aboutPost';
import PostComment from '@/components/post/postDetail/postComment'
import CommentItems from '@/components/post/postDetail/commentItems'
export default {
    components: {
        DetailContent, AboutPost, PostComment, CommentItems
    },
    data() {
        return {
            // 文章详情数据
            detailData: {},
            
            // 评论
            commentData: {},
            total: 0
        }
    },
    watch: {
        // 监听地址栏参数
        $route() {
            // 对应文章显示
            this.init()
            // 对应评论显示
            this.commentInit()
        }
    },
    methods: {
        // 封装调用接口的方法
        init(){
            this.$axios({
                url: '/posts',
                params: {id: this.$route.query.id}
            })
            .then(res => {
                const {data} = res.data
                this.detailData = {...data[0]}
                this.$store.commit('post/setStarPost',  {...data[0]}.likeIds)
            })
        },
        commentInit(){
            this.$axios({
                url: '/posts/comments',
                params: {
                    post: this.$route.query.id,
                    _limit: 2,
                    _start: 1
                }
            })
            .then( res => {
                const {data, total} = res.data
                this.commentData = {...data}
                this.total = total
                // console.log(data)
            })
        }
    },
    mounted () {
        this.init()
        this.commentInit()
    }
}
</script>

<style lang="less" scoped>
.post-detail{
    width: 1000px;
    margin: 20px auto;
    min-width:1000px;

    .about-post{
        width: 280px;
        h3{
            padding-bottom:15px;
            font-weight: 400;
            border-bottom: solid 1px #ddd;
        }
    }
}
</style>