<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
<div class="container">
  <RouterView />
</div>
</template>

<style >
  #app {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
