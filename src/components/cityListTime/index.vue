<template>
  <div class="wrapper-citylist-price">
    <table class="table">
      <tr>
        <th>时间</th>
        <th>城市</th>
        <th>金额（万）</th>
      </tr>
      <tr v-for="(item,index) in listData" :key="index">
        <td>{{item.sendTime}}</td>
        <td>{{item.id}}</td>
        <td>{{item.title}}</td>
      </tr>
    </table>
    <div class="bottom-fixed" v-show="bottomFixed">-&nbsp;向前金服&nbsp;.向前向未来&nbsp;-</div>
    <div slot="bottom" class="mint-loadmore-bottom" v-show="bottomLoading">
      <div class="icon"><mt-spinner type="fading-circle" color='#4E97FF'></mt-spinner></div>
      <span>正在加载...</span>
    </div>
    <div v-show="isNomle_bottom && !isNoData" class="no-data mint-loadmore-bottom" style="padding-bottom:40px;">
      <span class="line line1"></span>我是有底线的<span class="line line2"></span>
      <div class="bottom-fixed" v-show="true">-&nbsp;向前金服&nbsp;.向前向未来&nbsp;-</div>
    </div>
    <div class="topBar" :class="isIphoneX?'iphonex-top-bar':''" id="goTop">
      <img src="@/assets/images/zhiding.png" alt="" class="goTop" v-show="goTopShow" @click="goTop">
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';
  export default {
    data() {
      return {
        listData: [],
        bottomLoading: false,
        isNomle_bottom: false,// 判断到底部标识
        isNoData: false,//暂无数据
        goTopShow: false,// 返回顶部
        isRequested: false,//请求成功后执行下次请求表示
        page: 1,
        bottomFixed: true,
      }
    },
    components: {
    },
    computed: {
      ...mapGetters(['userid','isIphoneX']),
    },
    created(){
      this.getDataList();
      this.listData = [
        {id:'上海',title:'44',sendTime:'2018.03.19 14:40:24'},
        {id:'上海',title:'44',sendTime:'2018.03.19 14:40:24'},
        {id:'上海',title:'44',sendTime:'2018.03.19 14:40:24'},
        {id:'上海',title:'44',sendTime:'2018.03.19 14:40:24'},
        {id:'上海',title:'44',sendTime:'2018.03.19 14:40:24'},
        {id:'上海',title:'44',sendTime:'2018.03.19 14:40:24'},
        {id:'上海',title:'44',sendTime:'2018.03.19 14:40:24'},
        {id:'上海',title:'44',sendTime:'2018.03.19 14:40:24'},
        {id:'上海',title:'44',sendTime:'2018.03.19 14:40:24'},
        {id:'上海',title:'44',sendTime:'2018.03.19 14:40:24'},
        {id:'上海',title:'44',sendTime:'2018.03.19 14:40:24'},
        {id:'上海',title:'44',sendTime:'2018.03.19 14:40:24'},
        {id:'上海',title:'44',sendTime:'2018.03.19 14:40:24'},
        {id:'上海',title:'44',sendTime:'2018.03.19 14:40:24'},
        {id:'上海',title:'44',sendTime:'2018.03.19 14:40:24'},
        {id:'上海',title:'44',sendTime:'2018.03.19 14:40:24'},
      ];
    },
    mounted(){
      this.$nextTick(()=>{
        window.scrollTo(0, 0);
        this.addListener();
      })
    },
    methods:{
      ...mapActions(['saveLoadingShow']),
      goTop(){
        let timer = null,
            _that = this;
        cancelAnimationFrame(timer);
        timer = requestAnimationFrame(function fn(){
          if (_that.scrollTop > 0){
            _that.scrollTop -= 50;
            document.body.scrollTop = document.documentElement.scrollTop = _that.scrollTop;
            timer = requestAnimationFrame(fn);
          } else {
            cancelAnimationFrame(timer);
            _that.goTopShow = false;
          }
        })
      },
      getDataList(){
        if (this.isRequested) {
          return false;
        }
        this.isRequested = true;
        this.saveLoadingShow(true);
        let token = this.userid;
        this.$ajax({
          method: 'post',
          url: '/mc-message/message/notice/list',
          dataType: 'json', 
          headers: {'Content-Type': 'application/json;charset=UTF-8'},
          data:JSON.stringify({
            token: this.userid,
            currentPage:this.page,
          }),
        }).then(res=>{  // 请求成功
          if (res.data.code!=500){
            this.saveLoadingShow(false);
          }
          if (res.data.code == 200){
            // 判断没有任何数据的时候显示的是无数据提示
            if(res.data.data && res.data.data.length<1 && this.page===1){
              this.isNoData = true;
               return;
            }
            // 加载到最后一页没有数据的情况
            else if(res.data.data.length<1 && this.page !==1){
              this.isNomle_bottom = true;
              this.bottomLoading = false;
              this.bottomFixed = true;
              return;

              // 返回有数据就把 原dataPlanLists和返回数据合并数组
            } else {
              this.listData = this.listData.concat(res.data.data);
              this.page++;
            }

          }else if(res.data.code == 407){ //被踢出登录，返回登录页
            this.$logOut();
          }
          else if(res.data.code == 301){//7天自动退出登录
            this.$logOut({
              rememberpwd:'1' 
            }); //退出记住密码
          } else {
            this.$toast(res.data.msg);
          }
          setTimeout(()=>{
            this.isRequested = false;
          },500);
            
        }).catch(function(err){// 请求失败
          console.log(err);
          this.isRequested = false;
        })
      },
      loadBottom() {// 加载更多数据
        if(this.isNomle_bottom) return;
        this.bottomLoading = true;
        setTimeout(()=>{
          this.getDataList();
        },500);
      },
      addListener(){
        window.addEventListener('scroll', this.handleScroll);
      },
      removeListener(){
        window.removeEventListener('scroll', this.handleScroll);
      },
      handleScroll () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        const scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
        const windowHeight = document.body.clientHeight || document.documentElement.clientHeight;
        //滚动加载更多
        if(scrollTop + windowHeight >= scrollHeight-100){
         this.loadBottom(); 
         this.bottomFixed = false;
        }
        //回到顶部
        if(scrollTop > 400){
          this.goTopShow = false;
          this.scrollTop = scrollTop;
        }
        else{
          this.goTopShow = false;
        }
      },
    },
    watch:{
    },
  };
</script>

<!-- <style lang="stylus" rel="stylesheet/stylus" scoped>
  //@import './index.styl';
</style> -->
