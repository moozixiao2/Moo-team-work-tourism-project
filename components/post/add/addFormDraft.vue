<template>
    <div class="addFormDraft">
        <div v-if="$store.state.user.userInfo.token">
            <h4>草稿箱（{{total || 0}}）</h4>
            <div class="add-form-draft-item" v-for="(item,index) in draftData" :key="index">
                <div @click="addInfoToForm(item.id)" :title="item.title">{{item.title}} <i class="el-icon-edit"></i></div>
                <p>{{item.create_time}}</p>
            </div>
        </div>
        <div v-else>
            <h4>草稿箱</h4>
        </div>
    </div>
</template>

<script>
export default {
    // 从 添加表单 传过来的数据
    props: {
        data: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            // 本地草稿数据
            draftData: {},
            total: 0
        }
    },
    methods: {
        // 点击 获得对应索引的数据  也可以通过查找id来获得
        addInfoToForm(id){
            let index = 0
            for(let i = 0; i < this.draftData.length; i++){
                if(this.draftData[i].id == id){
                    index = i
                }
            }
            this.$emit('addDraftToForm', this.draftData[index])
        }
    },
    watch: {
        'data' () {
            this.draftData = this.data
            this.total = Object.keys(this.data).length
        }
    },
    mounted () {
        // 获得本地 数据
        this.draftData = JSON.parse(localStorage.getItem('draft box')) || []
        this.total = this.draftData.length
    }
}
</script>

<style lang="less" scoped>
.addFormDraft{
    padding: 10px;
    border: solid 1px #ccc;
    h4{
        font-weight: 500;
        color: #666;
    }
    .add-form-draft-item{
        padding: 10px 0;
        >div{
            color: #f60;
            cursor: pointer;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            &:hover{
                text-decoration: underline;
            }
        }
        p{
            font-size: 14px;
            color:#666;
        }
    }
}    
</style>