<template>
  <div class="wrapper-citylist-price">
    <table class="table">
      <tr>
        <th>城市</th>
        <th>金额（万）</th>
        <th>时间</th>
      </tr>
      <tr v-for="(item, index) in listData" :key="index">
        <td>{{item.id}}</td>
        <td>{{item.title}}</td>
        <td>{{item.sendTime}}</td>
      </tr>
    </table>
    <div class="bottom-fixed" v-show="bottomFixed">-&nbsp;向前金服&nbsp;.向前向未来&nbsp;-</div>
    <div slot="bottom" class="mint-loadmore-bottom" v-show="bottomLoading">
      <div class="icon"><!-- <cube-loading :size="28" color='#4E97FF'></cube-loading> --></div>
      <span>正在加载...</span>
    </div>
    <div v-show="isNomle_bottom && !isNoData" class="no-data mint-loadmore-bottom" style="padding-bottom:40px;">
      <span class="line line1"></span>我是有底线的<span class="line line2"></span>
      <div class="bottom-fixed" v-show="true">-&nbsp;向前金服&nbsp;.向前向未来&nbsp;-</div>
    </div>
    <div class="topBar" :class="true?'iphonex-top-bar':''" id="goTop" v-show="goTopShow">
      <img src="@/assets/images/zhiding.png" alt="" class="goTop"  @click="goTop">
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import { Action } from "vuex-class";
  import axios from 'axios'
  @Component
  export default class cityListPrice extends Vue {
    listData:number[]      = [];
    bottomLoading:boolean  = false;
    isNomle_bottom:boolean = false;// 判断到底部标识
    isNoData:boolean       = false;//暂无数据
    goTopShow:boolean      = false;// 返回顶部
    //isRequested:false,//请求成功后执行下次请求表示
    page:number            = 1;
    bottomFixed:boolean    = true;
    created(){
      this.getDataList();
      // this.listData = [
      //   {id:'上海',title:'44',sendTime:'2018.03.19 14:40:24'},
      //   {id:'上海',title:'44',sendTime:'2018.03.19 14:40:24'},
      //   {id:'上海',title:'44',sendTime:'2018.03.19 14:40:24'},
      //   {id:'上海',title:'44',sendTime:'2018.03.19 14:40:24'},
      //   {id:'上海',title:'44',sendTime:'2018.03.19 14:40:24'},
      //   {id:'上海',title:'44',sendTime:'2018.03.19 14:40:24'},
      //   {id:'上海',title:'44',sendTime:'2018.03.19 14:40:24'},
      //   {id:'上海',title:'44',sendTime:'2018.03.19 14:40:24'},
      //   {id:'上海',title:'44',sendTime:'2018.03.19 14:40:24'},
      //   {id:'上海',title:'44',sendTime:'2018.03.19 14:40:24'},
      //   {id:'上海',title:'44',sendTime:'2018.03.19 14:40:24'},
      //   {id:'上海',title:'44',sendTime:'2018.03.19 14:40:24'},
      //   {id:'上海',title:'44',sendTime:'2018.03.19 14:40:24'},
      //   {id:'上海',title:'44',sendTime:'2018.03.19 14:40:24'},
      //   {id:'上海',title:'44',sendTime:'2018.03.19 14:40:24'},
      //   {id:'上海',title:'44',sendTime:'2018.03.19 14:40:24'}
      // ];
    }

    mounted(){
      this.$nextTick(()=>{
        window.scrollTo(0, 0);
        this.addListener();
      })
    }

      getDataList(){
        // if(this.isRequested) {
        //   return false;
        // }
        // this.isRequested = true;
        //let token = this.userid;
      //   axios.post({
      //     method: 'post',
      //     url: '/mc-message/message/notice/list',
      //     dataType: 'json', 
      //     headers: {'Content-Type': 'application/json;charset=UTF-8'},
      //     data:JSON.stringify({
      //       token: this.userid,
      //       currentPage: this.page
      //     })
      //   }).then(res=>{  // 请求成功
      //     if(res.data.code!=500){
      //       //this.saveLoadingShow(false);
      //     }
      //     if(res.data.code == 200){
      //       // 判断没有任何数据的时候显示的是无数据提示
      //       if(res.data.data && res.data.data.length<1 && this.page===1){
      //         this.isNoData = true;
      //          return;
      //       }
      //       // 加载到最后一页没有数据的情况
      //       else if(res.data.data.length<1 && this.page !==1){
      //         this.isNomle_bottom = true;
      //         this.bottomLoading = false;
      //         this.bottomFixed = true;
      //         console.log(this.bottomFixed);
      //         return false;

      //         // 返回有数据就把 原dataPlanLists和返回数据合并数组
      //       } else {
      //         this.listData = this.listData.concat(res.data.data);
      //         this.page++;
      //       }

      //     } else if(res.data.code == 407){ //被踢出登录，返回登录页
      //       this.$logOut();
      //     } else if(res.data.code == 301){//7天自动退出登录
      //       this.$logOut({
      //         rememberpwd:'1' 
      //       }); //退出记住密码
      //     } else {
      //       this.$toast(res.data.msg);
      //     }
      //     setTimeout(()=>{
      //       //this.isRequested = false;
      //     },500);
            
      //   }).catch(function(err){// 请求失败
      //     console.log(err);
      //     //this.isRequested = false;
      //   })
      }

      loadBottom() {// 加载更多数据
        if (this.isNomle_bottom) return;
        this.bottomLoading = true;
        setTimeout(()=> {
          this.getDataList();
        },500);
      }

      addListener(){
        window.addEventListener('scroll', this.handleScroll);
      }

      removeListener(){
        window.removeEventListener('scroll', this.handleScroll);
      }

      handleScroll () {
        const scrollTop:number = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight:number = document.body.scrollHeight || document.documentElement.scrollHeight;
        const windowHeight:number = document.body.clientHeight || document.documentElement.clientHeight;
        //滚动加载更多
        if(scrollTop + windowHeight >= scrollHeight-100){ 
          this.bottomFixed = false;
          this.loadBottom();
        }
        //回到顶部
        if(scrollTop > 400){
          this.goTopShow = true;
          //this.scrollTop = scrollTop;
        } else{
          this.goTopShow = false;
        }
      }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import './index.scss';
</style>
