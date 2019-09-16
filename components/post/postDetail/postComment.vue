<template>
  <div class="postComment">
    <div>
      <h3 class="comment-title">评论</h3>
      <div class="recommentHide" v-if="isShow">回复@{{nickName}}</div>
      <div class="textarea">
        <textarea placeholder="说点什么吧..." v-model="commentParams.content"></textarea>
        <el-row type="flex" justify="space-between" class="comment-pic-btn">
          <!-- 图片上传 -->
          <el-upload
            :action="`${$axios.defaults.baseURL}/upload`"
            name='files'
            ref='upload'
            list-type="picture-card"
            :on-preview="handlePreview"
            :on-success='handleSuccess'
            :on-remove="handleRemove"
            :before-upload='beforeUpload'
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img :src="imageUrl" alt />
          </el-dialog>
          <!-- 提交按钮 -->
          <el-button type="primary" size="small" @click="handleComment">提交</el-button>
        </el-row>
      </div>
    </div>
    <!-- 评论数据 -->
    <div>
      <el-row type='flex' justify='center' align='middle' class="comment-content-none" v-if='total <= 0'>暂无评论，赶紧抢占沙发！</el-row>
      <!-- 评论item -->
      <div class="comment-content-items" v-else>
        <div v-for="(item,index) in pageData" :key='index' class="comment-content-item">
          <div>
            <div class="comment-content-info">
              <!-- 用户头像之类 -->
              <div class="comment-content-user-info">
                <div>
                  <img :src="`${$axios.defaults.baseURL + item.account.defaultAvatar}`" alt="">
                  <span>{{item.account.nickname}}</span>
                  <span class="comment-created-time">{{item.account.created_at | createTimeFormat}}</span>
                </div>
                <div>{{item.level}}</div>
              </div>
              <div class="comment-content-item-wrap">
                <CommentItems :obj='item.parent' v-if="item.parent" @setCommentInfo="setCommentInfo"/>
                
                <div class="comment-wrap-content">
                    <p>{{item.content}}</p>
                    <p v-if="item.pics" class="comment-pics">
                      <el-image v-for="(pic,index) in item.pics" :key='index'
                        style="width: 100px; height: 100px;margin: 6px 6px 0 0; box-shadow: 0 0 3px #ccc; border-radius: 5px;"
                        :src="`${$axios.defaults.baseURL + pic.url}`" 
                        :preview-src-list="showPic(item.pics)">
                      </el-image>
                    </p>
                    <el-row type='flex' justify='end' style='color:#141f5c;cursor: pointer;' @click.native="handleReComment(item.id, item.account.nickname)">回复</el-row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <el-pagination
        style="margin: 22px auto 0;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import CommentItems from '@/components/post/postDetail/commentItems'
import { createTimeFormat } from '@/middleware/filters'
export default {
  components:{
    CommentItems
  },
  data() {
    return {
      // 提交所需要的参数
      commentParams: {
        content: '',
        post: '',
        pics: []
      },
      // 分页数据
      pageData: [],
      // 分页
      pageIndex: 1,
      pageSize: 5,
      // 图片数据
      imageUrl: "",
      dialogVisible: false,
      // 大数据
      commentData: [],
      // 数据总数
      total: 0,
      // 回复的用户
      nickName: '',
      followId: '',
      // 显示隐藏
      isShow: false
    }
  },
  methods: {
    // 评论回复
    setCommentInfo(data){
      console.log(data)
      
      // 显示回复的用户昵称
      this.isShow = true
      // 赋值
      this.nickName = data.nickname
      this.followId = data.id
    },
    // 回复
    handleReComment(id, nickName){
      // 显示回复的用户昵称
      this.isShow = true
      // 赋值
      this.nickName = nickName
      this.followId = id
    },
    // 图片
    showPic(pics){
      // console.log(pics, 334)
      let arr = pics.map(v => {
        return v = 'http://localhost:1337' + v.url
      })
      return arr
    },
    // 评论提交
    handleComment(){
      // 交互判断
      if(!this.commentParams.content){
        this.$message.warning('请输入评论内容...')
        return
      }
      // 回复情况
      if(this.nickName){
        // console.log(111)
        // return
        this.commentParams.post = this.$route.query.id

        this.commentParams.follow = this.followId
        console.log(this.commentParams)
        // return
        const {token} = this.$store.state.user.userInfo
        // 调用接口
        this.$axios({
          url: '/comments',
          headers: {Authorization: `Bearer ${token}`, 'Content-Type': '	application/json'},
          method: 'post',
          data: this.commentParams
        })
        .then(res => {
          // console.log(res)
          this.$message.success('回复成功噢')
          this.commentInit()
          // 清空
          this.commentParams.content = ''
          this.commentParams.post = ''
          this.commentParams.pics = []
          // 清除图片预览
          this.$refs.upload.clearFiles();

          this.nickName = ''
          this.followId = ''
          this.isShow = false
        })
      }else{
        this.commentParams.post = this.$route.query.id
        console.log(this.commentParams)
        // return
        const {token} = this.$store.state.user.userInfo
        // 调用接口
        this.$axios({
          url: '/comments',
          headers: {Authorization: `Bearer ${token}`, 'Content-Type': '	application/json'},
          method: 'post',
          data: this.commentParams
        })
        .then(res => {
          // console.log(res)
          this.$message.success('评论成功噢')
          this.commentInit()
          // 清空
          this.commentParams.content = ''
          this.commentParams.post = ''
          this.commentParams.pics = []
          // 清除图片预览
          this.$refs.upload.clearFiles();
        })
      }
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val
      this.pageData = this.commentData.slice(0, this.pageSize)
    },
    handleCurrentChange(val) {
      this.pageIndex = val
      this.pageData = this.commentData.slice((this.pageIndex-1)*this.pageSize, this.pageIndex*this.pageSize)
    },
    // 文件上传
    // 上传前
    beforeUpload(file){
      // console.log(file)
      if(file.type.indexOf('image/') === -1){
        this.$message.warning('请选择上传的图片...')
        return
      }
    },
    // 成功钩子
    handleSuccess(response, file, fileList){
      this.commentParams.pics.push({...response[0]})
    },
    // 移除
    handleRemove(file, fileList) {
      // console.log(file, fileList);
      let obj = {...file.response[0]}
      // 找出对应的索引
      let index = this.commentParams.pics.findIndex(v => {
        return v.id === obj.id
      })
      // 根据索引删除
      this.commentParams.pics.splice(index, 1)
    },
    // 文件已上传钩子
    handlePreview(file) {
      this.imageUrl = file.url;
      this.dialogVisible = true;
    },

    // 调用评论接口
    commentInit(){
        this.$axios({
            url: '/posts/comments',
            params: {
              post: this.$route.query.id
            }
        })
        .then( res => {
            const {data, total} = res.data
            this.commentData = [...data]

            // 分页
            this.total = this.commentData.length
            this.pageData = this.commentData.slice(0, this.pageSize)
            console.log(data,total, 124)
        })
    }
  },
  watch: {
    // 监听地址栏参数
    $route() {
      // 对应评论显示
      this.commentInit()
    }
  },
  filters: {
    createTimeFormat
  },
  mounted () {
    this.commentInit()
  }
};
</script>

<style lang="less" scoped>
.postComment {
  width: 100%;
  .comment-title {
    width: 100%;
    margin: 10px 0 20px;
    font-weight: 500;
  }
  .recommentHide{
    
  }
  .textarea {
    textarea {
      width: 100%;
      height: 87px;
      padding: 10px;
      font-size: 16px;
      resize: none;
      outline: none;
      border-radius: 5px;
      box-sizing: border-box;
      border: solid 1px #ddd;
    }
  }
  .comment-pic-btn {
    margin-top: 5px;
    /deep/ .el-upload--picture-card {
      width: 100px;
      height: 100px;
      line-height: 105px;
    }
    /deep/.el-upload-list__item {
      width: 100px;
      height: 100px;
    }
    /deep/ button {
      width: 100px;
      height: 36px;
    }
  }
  .comment-content-none{
    margin-top: 30px;
    height: 80px;
    border: dashed 1px #ddd;
  }
  .comment-content-items{
    margin-top: 20px;
    font-size: 14px;
    .comment-content-item{
      padding: 20px;
      border: dashed 1px #ccc;
      .comment-content-info{
        img{
          width: 30px;
          height: 30px;
        }
        .comment-content-user-info{
          display: flex;
          justify-content: space-between;
          img,span{
            vertical-align: middle
          }
          .comment-created-time{
            color:#666;
          }
        }
        .comment-content-item-wrap{
          margin: 10px 25px;
          .comment-wrap-content{
            margin-top: 8px;
            font-size: 16px;
            .comment-pics{
              
            }
          }
        }
      }
    }
  }
}
</style>