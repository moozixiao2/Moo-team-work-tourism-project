<template>
  <div class="postComment">
    <div class>
      <h3 class="comment-title">评论</h3>
      <div class="textarea">
        <textarea name id placeholder="说点什么吧..."></textarea>
        <el-row type="flex" justify="space-between" class="comment-pic-btn">
          <!-- 图片上传 -->
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img :src="dialogImageUrl" alt />
          </el-dialog>
          <!-- 提交按钮 -->
          <el-button type="primary" size="small">提交</el-button>
        </el-row>
      </div>
    </div>
    <!-- <CommentItems :data='commentData'/> -->
  </div>
</template>

<script>
// import CommentItems from '@/components/post/postDetail/commentItems'
export default {
  components:{
    // CommentItems
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
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
  // .comment-content-show{
  //   margin-top: 20px;
  //   .comment-content-none{
  //     height: 80px;
  //     border: dashed 1px #ddd;
  //   }
  //   .comment-content-item{
  //     padding: 20px 10px;
  //     border: dashed 1px #ddd;
  //   }
  // }
}
</style>