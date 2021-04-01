<template>
  <div class="home">
    <el-button type="primary" @click="postHome">点击</el-button>
  </div>
</template>

<script>
import * as API from '@/api/pageRequest/home';   //引入API

export default {
  name: "Home",
  data(){
    return {
      producerSn: '',
      blocCode: 'FXFT_0591591000',
      userids: '775'
    }
  },
  methods: {
    getHome(){
      let data = new URLSearchParams()
      if(this.producerSn){
        data.append('producerSn',this.producerSn)
      }
      API.getHome(data).then(res => {
        if(res.data.code == 200){
          console.log(res);
        }else{
          console.log(res.msg);
        }
      }).catch(err => {
        console.log(err.msg);
      })
    },
    postHome(){
      let data = new URLSearchParams()
      data.append('blocCode',this.blocCode)
      data.append('userids',this.userids)
      if(this.producerSn){
        data.append('producerSn',this.producerSn)
      }
      API.postHome(data).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    }
  },
  created(){
    this.getHome()
  }
};
</script>
