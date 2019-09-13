<template>
    <div class="comment-content-show">
        <el-row type='flex' justify='center' align='middle' class="comment-content-none">暂无评论，赶紧抢占沙发！</el-row>
        <!-- 不存在follow, 则为父级 -->
        <div v-show='!item.follow' v-for="item in data" :key='item.id' class="comment-content-item">
            {{item.content}} {{item.level}}
            <commentItems :data='item'/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'commentItems',
    props: {
        data: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
        }
    }
}
</script>

<style lang="less" scoped>
    .comment-content-show{
        margin-top: 20px;
        .comment-content-none{
        height: 80px;
        border: dashed 1px #ddd;
        }
        .comment-content-item{
        padding: 20px 10px;
        border: dashed 1px #ddd;
        }
    }
</style>