<script setup lang="ts">
</script>

<template>
  <main class="bg-indigo-50 h-full overflow-x-hidden overflow-y-scroll">
  <div class="fixed text-indigo-50  z-50 top-0 w-full flex justify-end pr-8">
    <span class="m-2">afewafew</span>
    <span class="m-2">dsafds</span>
    <span class="m-2">dsafsdfasdf</span>
  </div>
  <header class="flex justify-start items-center">
    <img src="background.jpg" class="absolute h-full w-full object-cover object-center"/>
    <div class="p-4 m-8">
      <h1 class="text-8xl text-blue-100 mb-8">Algo Viz</h1>
      <p class="text-xl mb-12 text-blue-300">Algorithm learning tool</p>
      <p class="text-base text-blue-400">Learn how algorithms work in an immersive and interactive feel</p>
    </div>
  </header>
  <div class="flex justify-around items-center h-full">
    <router-link class="router-link" to="/bubbleSort">
      <AlgorithmCard icon="sort" />
    </router-link>
    <router-link class="router-link" to="/pathfinding">
      <AlgorithmCard icon="destination"/>
    </router-link>
  </div>
  </main>


</template>

<script setup>
import AlgorithmCard from '@/components/AlgorithmCard.vue'
</script>
<style scoped lang="scss">

header {
  background-color: purple;
  height: 100%;
  min-height: 100dvh;
  width: 100vw;
  min-width: 100dvw;

}

.router-link {
  &:hover {
    background-color: transparent;
  }
}

</style>