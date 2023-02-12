<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
<div class="container">
  <RouterView class="router"/>
</div>
</template>

<style lang="scss">
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
  .disable-pointers{
    pointer-events: none;

    .disabled {
      background-color: rgb(129, 28, 48);
      color: rgb(0, 0, 58);
    }
  }
</style>
