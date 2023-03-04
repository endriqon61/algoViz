<script setup lang="ts">
</script>

<template>
  <main class="bg-gray-300 h-full">
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

.router-link {
  &:hover {
    background-color: transparent;
  }
}

</style>