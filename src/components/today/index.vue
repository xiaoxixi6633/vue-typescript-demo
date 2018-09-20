<template>
    <div class="today-wrapper">
      <section-hd></section-hd>
      <home-section></home-section>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {State} from 'vuex-class';
import sectionHd from '@/components/sectionHd/index.vue';
import homeSection from '@/components/homeSection/index.vue'
@Component({
  components: {
    sectionHd,
    homeSection
  }
})
export default class today extends Vue {
  @State login: boolean;
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
