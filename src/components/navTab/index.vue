<template>
    <div class="nav">
      <router-link to="/today">今日</router-link>
      <router-link to="thisMounth">本月</router-link>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
@Component
export default class navTab extends Vue {

};
</script>

<style scoped lang="scss">
.nav{
  width:110px;
}

</style>
