<template>
  <div class="wrapper-citylist-price">
    <table class="table">
      <tr>
        <th>城市</th>
        <th>金额（万）</th>
        <th>时间</th>
      </tr>
      <tr v-for="(item, index) in modules" :key="index">
        <td>{{item.id}}</td>
        <td>{{item.price}}</td>
        <td>{{item.time}}</td>
      </tr>
    </table>
    <div class="bottom-fixed" v-show="bottomFixed">-&nbsp;向前金服&nbsp;.向前向未来&nbsp;-</div>
    <div slot="bottom" class="mint-loadmore-bottom" v-show="bottomLoading">
      <div class="el-loading-spinner">
        <svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg>
        <p class="el-loading-text">加载中......</p>
      </div>
    </div>
    <div v-show="isNomleBottom && !isNoData" class="no-data mint-loadmore-bottom" style="padding-bottom:40px;">
      <span class="line line1"></span>我是有底线的<span class="line line2"></span>
      <div class="bottom-fixed" v-show="true">-&nbsp;向前金服&nbsp;.向前向未来&nbsp;-</div>
    </div>
    <!-- <div class="topBar" :class="true?'iphonex-top-bar':''" id="goTop" v-show="goTopShow">
      <img src="@/assets/images/zhiding.png" alt="" class="goTop"  @click="goTop">
    </div> -->
  </div>
</template>

<script lang="ts">
  //import Vue from 'vue';
  //import Component from 'vue-class-component';
  import {Component, Provide,Vue} from 'vue-property-decorator';
  //import { State } from 'vuex-class';
  //import { Action } from 'vuex-class';
  import { State, Action, Getter } from 'vuex-class';
  import axios from 'axios'
  import { Loading } from 'element-ui';
  @Component
  export default class cityListPrice extends Vue {
    @State modules: StoreState.module[];
    @Provide() bottomLoading:boolean = true;
    @Provide() isNomleBottom:boolean = false;// 判断到底部标识
    @Provide() isNoData:boolean      = false;//暂无数据
    @Provide() goTopShow:boolean     = false;// 返回顶部
    @Provide() isRequested           = false;//请求成功后执行下次请求表示
    @Provide() page:number           = 1;
    @Provide() bottomFixed:boolean   = true;
    @Action initAjax: () => void;
    // created(){
    //   Loading.service({
    //     lock: true,
    //     text: '加载中......',
    //     background: 'none'
    //   })
    // }
    
    mounted(){
      this.$nextTick(()=>{
        window.scrollTo(0, 0);
        this.addListener();
        this.initAjax();
      })
    }

    loadBottom() {// 加载更多数据
      if (this.isNomleBottom) return;
      this.bottomLoading = true;
      setTimeout(()=> {
        //this.getDataList();
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
