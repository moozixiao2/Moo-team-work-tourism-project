<template>
    <div class="comment-content-show">
        <div class="commentItems">
            <commentItems :obj='obj.parent' v-if="obj.parent"/>
            <el-row type='flex' justify='space-between' class="commentItems-info">
                <div>
                    <span>{{obj.account.nickname}}</span>
                    <span class="commentItems-info-time">{{obj.account.created_at | createTimeFormat}}</span>
                </div>
                <span>{{obj.level}}</span>
            </el-row>
            <div class="commentItems-content">
                <p>{{obj.content}}</p>
                <p v-if="obj.pics" class="comment-pics"><img :src="`${$axios.defaults.baseURL + pic.url}`" alt="" v-for="(pic,index) in obj.pics" :key='index'></p>
                <el-row type='flex' justify='end' style='color:#141f5c;cursor: pointer;'>回复</el-row>
            </div>
        </div>
    </div>
</template>

<script>
import { createTimeFormat } from '@/middleware/filters'
export default {
    name: 'commentItems',
    props: {
        obj: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
        }
    },
    filters: {
        createTimeFormat
    }
}
</script>

<style lang="less" scoped>
    .comment-content-show{
        // margin: 10px 30px;
        .commentItems{
            border: dashed 1px #ccc;
            background: #f1f1f1;
            padding: 5px;
            margin-top: 5px;
            .commentItems-info{
                margin-bottom: 10px;
                .commentItems-info-time{
                    color: #666;
                }
            }
        }
    }
</style>