<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
<div class="router-container">
  <RouterView/>
</div>
</template>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');

  :root{
      --animation-duration: 600ms;
  }
  .router-container {
    width: 100vw;
    height: 100vh;
    position: fixed;
    inset: 0;
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
  .disable-pointers{

    .disabled {
      background-color: rgb(129, 28, 48);
      color: rgb(0, 0, 58);
      pointer-events: none;
    }
  }
</style>
