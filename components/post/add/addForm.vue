<template>
    <div class="addForm">
        <h2 class="add-form-title">发表新攻略</h2>
        <p class="add-form-desc">分享你的个人游记，让更多人看到哦！</p>

        <!-- 表单 -->
        <el-form ref="form" :model="form">
            <!-- 标题 -->
            <el-form-item>
                <el-input v-model="form.title" placeholder='请输入标题'></el-input>
            </el-form-item>
            <!-- 富文本 -->
            <!-- <el-form-item> -->
            <div>
                <VueEditor :config="config" ref="vueEditor"/>
            </div>
            <!-- </el-form-item> -->
            <!-- 选择城市 -->
            <el-form-item>
                选择城市
                <el-autocomplete
                    v-model="form.city"
                    style='margin-left: 10px;'
                    :fetch-suggestions="querySearchAsync"
                    placeholder="请输入内容"
                    @select="handleSelect"
                ></el-autocomplete>
            </el-form-item>
            <!-- 按钮 -->
            <el-form-item class="add-form-btn">
                <el-button type="primary" size='small' @click='addPostBtn'>发布</el-button>
                或者
                <span @click='addDraftBtn'>保存到草稿</span>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
// 引入 vue-word-editor
let VueEditor

if (process.browser) {
    VueEditor = require('vue-word-editor').default
}
// 引入moment
import moment from 'moment'
export default {
    components: {
        VueEditor
    },
    props:{
        // 草稿箱对应项点击的数据
        data:{
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            // 添加文章的参数
            form:{
                title: '',
                content: '',
                city: ''
            },
            // 配置富文本
            config: {
                modules:{
                    toolbar:[
                        // [{ 'color': [] }, { 'background': [] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'header': 1 }, { 'header': 2 }],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        ['image', 'video'],
                        ['clean', 'code']
                    ]
                },
                // 主题
                theme: 'snow',
                uploadImage: {
                    url: "http://localhost:1337/upload",
                    name: "files",
                    uploadBefore(file){
                    return true
                    },
                    uploadProgress(res){

                    },
                    uploadSuccess(res, insert){
                    insert("http://localhost:1337" + res.data[0].url)
                    },
                    uploadError(){},
                    showProgress: false
                },

                uploadVideo: {
                    url: "http://localhost:1337/upload",
                    name: "files",
                    uploadBefore(file){
                    return true
                    },
                    uploadProgress(res){

                    },
                    uploadSuccess(res, insert){
                    insert("http://localhost:1337" + res.data[0].url)
                    },
                    uploadError(){},
                }
            }
        }
    },
    methods: {
        // 远程文本框 建议
        querySearchAsync(value, cb){
            if(!value){
                cb([])
                return
            }
            // 调用城市菜单接口
            this.$axios({
                url: '/airs/city',
                params: {name: value}
            })
            .then(res => {
                const {data} = res.data
                
                let newData = []
                data.forEach(e => {
                    e.value = e.name
                    newData.push(e)
                });
                
                cb(newData)

                // 默认第一个
                this.form.city = newData[0].value
            })
        },
        handleSelect(item){
            this.form.city = item.value
        },
        // 添加文章
        addPostBtn(){
            // 富文本框对应数据
            this.form.content = this.$refs.vueEditor.editor.root.innerHTML
            // 交互判断
            if(!this.form.title){
                this.$message.warning('请输入文章标题')
                return
            }
            if(!this.form.content){
                this.$message.warning('请输入文章内容')
                return
            }
            if(!this.form.city){
                this.$message.warning('请选择城市')
                return
            }
            // console.log(this.form)
            // 调用接口
            this.$axios({
                url: '/posts',
                method: 'post',
                headers: {Authorization: `Bearer ${this.$store.state.user.userInfo.token}`},
                data: this.form
            })
            .then(res => {
                console.log(res)
                if(res.status === 0){
                    this.$message.success(res.message)
                    this.$confirm('文章添加成功噢！, 是否跳转至攻略的首页?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'success'
                    }).then(() => {
                        this.$router.replace('/post')
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消回到首页...'
                        });          
                        // 清空文本
                        this.form.title = ''
                        this.form.content = ''
                        this.$refs.vueEditor.editor.root.innerHTML = ''
                        this.form.city = ''
                    });
                }
            })
        },
        // 添加到草稿
        addDraftBtn(){
            // 富文本框对应数据
            this.form.content = this.$refs.vueEditor.editor.root.innerHTML
            // 交互判断
            if(!this.form.title){
                this.$message.warning('请输入文章标题')
                return
            }
            if(!this.form.content){
                this.$message.warning('请输入文章内容')
                return
            }
            if(!this.form.city){
                this.$message.warning('请选择城市')
                return
            }
            
            // 添加当前时间
            let data = {
                ...this.form,
                create_time: moment(new Date()).format('YYYY-MM-DD')
            }
            // console.log(data)
            // 将 data 数据 存储到 本地
            // 判断本地是否有数据 
            let draftArr = JSON.parse(localStorage.getItem('draft box')) || []
            // 追加 数据
            draftArr.unshift(data)
            // 设置本地存储
            localStorage.setItem('draft box', JSON.stringify(draftArr))

            // 发射本地存储的数据到草稿
            this.$emit('getLocalStorageDraft', JSON.parse(localStorage.getItem('draft box')) || [])

            // 清空表单
            this.form.title = ''
            this.form.content = ''
            this.$refs.vueEditor.editor.root.innerHTML = ''
            this.form.city = ''
        }
    },
    watch: {
        // 侦听 传过来的 data
        'data' () {
            // console.log(this.data)
            this.form.title = this.data.title
            this.form.content = this.data.content
            this.$refs.vueEditor.editor.root.innerHTML = this.data.content
            this.form.city = this.data.city
        }
    }
}
</script>

<style lang="less" scoped>
.addForm{
    .add-form-title{
        font-weight: 500;
    }
    .add-form-desc{
        margin: 10px 0;
        font-size: 12px;
        color: #666;
    }
    /deep/ #vue-editor-wrapper{
        margin-bottom: 20px;
    }
    /deep/ .ql-editor{
        height: 400px;
    }
    .add-form-btn{
        /deep/ .el-button{
            margin-right: 10px;
        }
        span{
            color:#f60;
            cursor: pointer;
            &:hover{
                text-decoration: underline;
            }
        }
    }
}
</style>