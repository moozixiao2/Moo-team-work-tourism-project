<template>
    <el-row type='flex' justify='space-between' class="post-detail">
        <!-- 左边内容 -->
        <div>
            <DetailContent :data='detailData' />
            <PostComment />
        </div>
        <!-- 右边相关攻略 -->
        <div class="about-post">
            <h3>相关攻略</h3>
            <AboutPost/>
        </div>
        <div class="goToTop" @click="goToTop"><i class="iconfont icon-tubiao02"></i></div>
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
            detailData: {}
        }
    },
    watch: {
        // 监听地址栏参数
        $route() {
            // 对应文章显示
            this.init()
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
        // 回来顶部
        goToTop(){
            (function smoothscroll(){
                var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
                if (currentScroll > 0) {
                    window.requestAnimationFrame(smoothscroll);
                    window.scrollTo (0,currentScroll - (currentScroll/5));
                }
            })();
        }
    },
    mounted () {
        this.init()
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
    .goToTop{
        position: fixed;
        bottom: 5%;
        right: 3%;
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        background-color: rgba(0,0,0,.5);
        color:#fff;
        cursor: pointer;
    }
}
</style>