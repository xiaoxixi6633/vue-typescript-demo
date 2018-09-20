<template>
    <div class="home-section-wrapper">
      <div class="home-section">
        <div class="line"></div>
        <div class="home-section-content">
          <div class="home-section-hd">实际赎回金额 (元)
            <div class="expansion-btn"></div>
          </div>
          <div class="home-section-article">
            <div class="font-left">565,566</div>
            <div class="font-right">233,355</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {State} from 'vuex-class';
@Component
export default class homeSection extends Vue {
  @State login: boolean;
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
