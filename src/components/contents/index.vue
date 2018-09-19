<template>
    <div class="wrapper-content">
      <div class="content">
    	<div class="content-heade">
    	  <div class="content-heade-hd">
	    	<div>今日出借 (元)</div>
	    	<div>213,355</div>
    	  </div>
    	  <div class="content-font"><span class="i_price">¥</span>12,330,987</div>
		  <p class="time-icon">最近刷新时间 10:32:50</p>
    	</div>
      </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
// import { State, Action, Getter } from 'vuex-class';
import {State} from 'vuex-class';
@Component
export default class contents extends Vue {
  @State login: boolean;
};
</script>

<style scoped lang="scss">
@import './index.scss';

</style>
