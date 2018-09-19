<template>
    <div class="wrapper-section-hd">
      <section class="section-hd-content">
        <div class="flex left">
          <div class="title">昨日出借 (元)</div>
          <p class="font">65,565,566,888</p>
        </div>
        <div class="right">
          <div class="chart-icon"></div>
          <p class="font">查看近七日</p>
        </div>
      </section>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
// import { State, Action, Getter } from 'vuex-class';
import {State} from 'vuex-class';
@Component
export default class sectionHd extends Vue {
  @State login: boolean;
};
</script>

<style scoped lang="scss">
@import './index.scss';

</style>
