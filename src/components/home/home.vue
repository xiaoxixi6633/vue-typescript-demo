<template>
    <div class="home-wrapper">
      <head-component></head-component>
      <router-view></router-view>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import headComponent from '@/components/headComponent/headComponent.vue';
@Component({
  components: {
    headComponent
  }
})

export default class home extends Vue {
};
</script>

<style lang="scss" scoped>

</style>
