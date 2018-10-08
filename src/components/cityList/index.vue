<template>
  <div class="wrapper">
    <div class="fixed-top">
      <!-- <xqheader :arrShow="true" :messageIconShow="false"></xqheader> -->
      <div class="nav">
        <div class="nav-conent">
          <router-link to="/cityList/price" @click="toggleTabs('price');" class="nav-a"><span>金额</span></router-link>
          <router-link to="/cityList/time" @click="toggleTabs('time');" class="nav-a"><span>时间</span></router-link>
        </div>
      </div>
    </div>
    <!-- <choose-area></choose-area> -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    
  </div>
</template>

<script lang="ts">
  //import {mapActions, mapGetters} from 'vuex';
  // import chooseArea from '@/components/chooseArea';
  // import xqheader from '@/components/xqHeaderSelectCity/xqHeaderSelectCity.vue';
  export default {
    data(){
      return {
        selected:'price',
      }
    },
    components:{
      //chooseArea,
      //xqheader
    },
    computed:{
      //...mapGetters(['isIphoneX','orgCodeName'])
    },
    created(){
      if (this.$route.path == '/cityList/price'){
        this.selected = 'price';
      }
      else if (this.$route.path == '/cityList/time'){
        this.selected = 'time';
      } else{
        this.selected = 'price';
      }

    },
    watch: {
      selected(){
        this.toggleTabs(this.selected);
      }

    },
    methods: {
      // ...mapActions(['saveFooterCurrent']),
      //今日
      toggleTabs(tabText) {
        window.scrollTo(0, 0);
        this.selected = tabText;
        this.$router.push('/cityList/'+tabText);
      },
      // chooseArea(){
      //   Bus.$emit('msg','打开选择机构弹框');
      // }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import './index.scss';
</style>
