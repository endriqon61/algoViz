<script setup lang="ts">
</script>

<template>
  <main class="bg-indigo-50 h-full overflow-x-hidden overflow-y-scroll">

  <header class="flex justify-start items-end">
    <div class="absolute inset-0 bg-blue-900 z-10 mix-blend-multiply"></div>
    <img src="/background.jpg" class="absolute h-full w-full object-cover object-center"/>
    <div class="p-4 m-8 z-30">
      <h1 class="text-8xl text-blue-50 mb-8">VisuAL</h1>
      <p class="text-3xl mb-12 text-blue-50">The best algorithm visualizing tool on the web</p>
      <p class="text-md text-blue-100 max-w-3xl">Experience the power of algorithms like never before with our interactive visualization website. Discover complex concepts in a user-friendly and engaging way. Try it now and take your coding skills to the next level!</p>
    </div>
  </header>
  <div class="flex justify-center items-center h-full">
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
  background-color: rgb(28, 28, 137);
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