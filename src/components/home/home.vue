<template>
    <div class="home-wrapper">
      <head-component></head-component>
      <section-hd></section-hd>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import headComponent from '@/components/headComponent/headComponent.vue';
import sectionHd from '@/components/sectionHd/index.vue';
@Component({
  components: {
    headComponent,
    sectionHd
  }
})

export default class home extends Vue {
};
</script>

<style lang="scss" scoped>

</style>
