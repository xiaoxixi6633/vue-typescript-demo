<template>
    <div class="home-section-wrapper">
      <div class="home-section">
        <div class="home-section-hd">实际赎回金额 (元)</div>
        <div class="home-section-content">
          <div>565,566</div>
          <div>233,355</div>
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

<style scoped lang="scss">
@import './index.scss';

</style>
