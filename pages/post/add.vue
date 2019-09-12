<template>
    <el-row type="flex" justify="space-between" class="postAdd">
        <div class="add-form-wrap">
            <AddForm :data='draftData' @getLocalStorageDraft='getLocalStorageDraft'/>
        </div>
        <div class="draft">
            <AddFormDraft @addDraftToForm='addDraftToForm' :data='allDraftData'/>
        </div>
    </el-row>
</template>

<script>
import AddForm from '@/components/post/add/addForm';
import AddFormDraft from '@/components/post/add/addFormDraft';
export default {
    components: {
        AddForm, AddFormDraft
    },
    data(){
        return{
            // 本地的数据 
            draftData: {},
            // 本地草稿所有数据
            allDraftData: {}
        }
    },
    methods: {
        // 草稿箱传过来的方法
        addDraftToForm(data){
            this.draftData = data
        },
        getLocalStorageDraft(draft){
            this.allDraftData = {...draft}
        }
    },
}
</script>

<style lang="less" scoped>
.postAdd{
    width: 1000px;
    min-width: 1000px;
    margin: 20px auto 0;
    .add-form-wrap{
        width: 750px;
    }
    .draft{
        width: 200px;
    }
}
</style>