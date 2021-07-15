<template>
  <Layout>
    <!-- Main Content-->
   <Alert :title="alertMess" :type="alertType" ref="alert"></Alert>
   <div class="container">
       <div class="contact-header">
           <h1 class="contact-title">Say hi!</h1>
       </div>
       <form class="contact-form" name="contact" ref="form" :action="actionMessage" method="post">
           <div class="sender-info">
               <div>
                   <label for="name" class="label">Your name</label>
                   <input type="text" name="name" v-model="form.username" required>
               </div>
                <div>
                   <label for="email" class="label">Your email</label>
                   <input type="email" name="email" v-model="form.email" formenctype="email">
               </div>
           </div>
           <div class="message">
               <label for="message">Message</label>
               <textarea name="message" cols="30" rows="10" v-model="form.desc" required></textarea>
           </div>
           <!--  @click.prevent="putMessage" -->
           <button class="submit"> submit form</button>
       </form>
   </div>
  </Layout>
</template>

<script>
import { axios } from '../assets/utils/axios'
import Alert from '@/components/Alerts'
export default {
  metaInfo: {
    title: '反馈'
  },
  data: function(){
      return {
          tab: 'fans',
          form: {
              username: '',
              email: '',
              desc: ''
          },
          alertMess: '',
          alertType: ''
      }
  },
  components: {
      Alert
  },
  methods: {
      changeTab (event) {
          if(event.target.innerHTML === '关注') {
              this.tab = 'follows'
          }else{
              this.tab = 'fans'
          }
      },
    //   反馈消息
    putMessage () {
        const that = this;
        axios({
            method: 'POST',
            url: '/messages',
            data: that.form
        }).then((res) => {
            if(res){
                that.alertMess = '添加成功'
                that.alertType = 'success'
                that.$refs.alert.showDisplay()
                that.$refs.form.reset()
            }
        }).catch(error => {
                that.alertMess = '添加失败'
                that.alertType = 'danger'
                that.$refs.alert.showDisplay()
                that.$refs.form.reset()
        })
    }
  },
  actionMessage(){
      return `${process.env.GRIDSOME_API_URL}/messages?username=${this.user.username}&email=${this.user.email}&desc=${this.user.desc}`
  }
}
</script>
<style>
    .persons .card{
        width: 13rem;
        border: 1px solid #ccc;
        margin: 10px 10px 0 0;
        
    }
    .card-person-img{
        width: 8rem;
        height: 8rem;
        border-radius: 10rem;
        background-color: #666;
        display: block;
        margin: 1rem auto;
    }
</style>
