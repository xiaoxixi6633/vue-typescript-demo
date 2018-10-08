<template>
  <div class="xq_header_contents">
    <div class="jinfu_title">
      <div class="jt_left" v-if="arrShow" @click="goBack">
        <img src="./images/backnew.png" alt="">
      </div>
      <div class="jt_center" @click="chooseArea">
        <span>{{this.orgCodeName}}</span>
        <img src="./images/zhankai@2x.png" alt="">
      </div>

      <div class="jt_right" v-show="messageIconShow">
        <div class="right" @click="news()">
          <img class="msg_right" src="./images/mesage.png"/>
          <div class="dian"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Bus from '../../components/bus.js'
  import {mapActions,mapGetters} from 'vuex'
  export default {
    data(){
      return{

      }
    },
    mounted(){

    },
    props:{
      arrShow:Boolean,
      messageIconShow:{
        type:Boolean,
        default:true,
      }
    },
    computed:{
      ...mapGetters(['isIphoneX','orgCodeName'])
    },
    components:{

    },
    methods: {
      ...mapActions(['saveFooterCurrent']),
      news(){//进入消息列表
        this.$router.push('/news/newList')
      },
      handleTopChange(status) {
        this.topStatus = status;
      },
      chooseArea(){
        Bus.$emit('msg','打开选择机构弹框')
      },
      goBack(){//返回
        this.$router.back(-1)
      },
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .box_content
    position:absolute
    overflow:hidden
    top: 60px
    z-index:1
  .jinfu_title
    z-index:11
    position:fixed
    width 100%
    height 40px
    line-height 40px
    padding-top 20px
    text-align center
    background-image url("../assets/images/zhanbaotitle.png")
    background-repeat no-repeat
    background-size 100% 100%
  .jt_right
    position:absolute
    right:0px
    top:20px
    .right
      .msg_right
        width 17px
        height 18px
        float right
        margin-right 20px
        margin-top 10px
      .dian
        width 4px
        height 4px
        background-color red
        border-radius 50px
        position absolute
        right 22px
        top 12px
  .jt_center
    text-align:center
    font-size: 20px
    color: #FFFFFF
    line-height:35px
    height:35px
    img
      width:20px
      vertical-align: text-top
  .jt_left
    position:absolute
    left:21px
  .jt_left img
    width:25px
</style>

