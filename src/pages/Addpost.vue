<template>
  <Layout>
      <el-form v-model="postData" label-width="80px">
        <el-form-item label="文章标题">
          <el-input type="text" required="required" v-model="postData.title"></el-input>
        </el-form-item>
        <el-form-item label="文章简介">
          <el-input type="textarea" rows="5"  v-model="postData.desc"></el-input>
        </el-form-item>
        <el-form-item label="文章详情">
           <!-- <ckeditor v-model="postData.content" :config="editorConfig"></ckeditor> -->
           <div id="editor"></div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.prevent="handler">提交</el-button>
        </el-form-item>
      </el-form>
  </Layout>
</template>

<script>
import Editor from 'wangeditor/dist/wangEditor'
import {axios} from '../assets/utils/axios'
export default {
  metaInfo:{
        title: '发布博客',
  },
  data: function () {
    return {
      postData: {
        title: '',
        desc: '',
        content: ''
      },
      editorConfig: {
        // The configuration of the editor.
       extraPlugins: 'easyimage',
       removePlugins: 'image'
      },
      messageType: ''
    }
  },
  mounted () {
    // 创建富文本编辑器
    const myEditor = new Editor('#editor')
    myEditor.create()
    let that = this;
    // // 关闭网络图片引入
    // myEditor.config.showLinkImg = false
    // // 重写上传图片方法
    // myEditor.config.customUploadImg = function () {
    //   console.log('上传图片')
    // }
    myEditor.config.onchange = function (html) {
			// 监控变化，同步更新富文本内容到 textarea
			that.postData.content = html
		}
    // ckeditor
  },
  watch: {

  },
  methods: {
    addDyamic(post){
      // 添加动态信息
      axios({
        method: 'POST',
        url:'/dynamics',
        // headers: {
        //   'Content-Type': 'text/plain'
        // },
        data: {
          user: JSON.parse(localStorage.getItem('user')).id,
          post: post.id,
          type: 'add'
        }
      })
    },
    handler () {
      const data = this.postData;
      const that = this
      // 提交文章
      axios({
        method: 'POST',
        url:'/posts',
        data
      }).then((res)=>{
        // 提交文章成功，就会触发添加动态接口
        if(res){
          that.addDyamic(res)
          that.openMessage()
          // 跳转到列表页面
          that.$router.push({
            path: '/posts'
          })
        }
      })
    },
    // 消息提示
    openMessage() {
        this.$message({
          showClose: true,
          message: '消息提示',
          type: this.messageType
        });
    },
  }
}
</script>

<style>

</style>