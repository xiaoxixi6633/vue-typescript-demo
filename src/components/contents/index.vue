<template>
    <div class="wrapper-content">
    	<div class="content">
    		<div class="content-heade"></div>
    	</div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { State, Action, Getter } from "vuex-class";
@Component
export default class contents extends Vue {
  @State login: boolean;
};
</script>

<style scoped lang="scss">
@import './index.scss';

</style>
