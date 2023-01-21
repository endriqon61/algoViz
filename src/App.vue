<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
<div class="container">
  <RouterView />
</div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');

  * {
    user-select: none;
  }
  #app {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
