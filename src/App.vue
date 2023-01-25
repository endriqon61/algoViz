<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import LogRocket from 'logrocket';
LogRocket.init('p3oubp/algoviz');
</script>

<template>
<div class="container">
  <RouterView class="router"/>
</div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');
  .router {
    width: 100vw;
    height: 100vh;
    position: absolute;
  }
  * {
    user-select: none;
  }
  .container {
    width: 100vw;
    height: 100vh;
  }
  #app {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
