<template>
    <div class="nav">
      <router-link tag="li" to="/today"><a class="nav-a">今日</a></router-link>
      <router-link tag="li" to="/thisMounth"><a class="nav-a">本月</a></router-link>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class navTab extends Vue {
  isActive: Boolean = true;
  hasError: Boolean = false;
  initAjax() {
  };
  mounted() {
    this.initAjax();
  };
};
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
