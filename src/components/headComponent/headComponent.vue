<template>
    <div class="wrapper-head">
      <div class="head-title"></div>
      <nav-tab></nav-tab>
      <contents></contents>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import navTab from '@/components/navTab/index.vue';
import contents from '@/components/contents/index.vue';
@Component({
  components: {
    navTab,
    contents
  }
})
export default class headComponent extends Vue {

};
</script>

<style scoped lang="scss">
@import './index.scss';

</style>
