<template>
<a
  class="relative m-2 hover:bg-indigo-200 flex bg-indigo-100 items-start justify-between rounded-xl border border-indigo-900 p-4 shadow-lg sm:p-6 lg:p-8"
  href="#"
>
  <div class="pt-4 text-gray-500">
    <div
      class="h-8 w-8 sm:h-10 sm:w-10"
    >
    <img :src="`${icon}.png`"/>
    </div>

    <h3 class="mt-4 text-lg font-bold text-indigo-900 sm:text-xl">
     {{ icon == 'sort' ? "Sorting Algorithms" : icon == 'destination' ? "Pathfinding Algorithms": "" }}
    </h3>

  </div>


</a>

</template>


<script setup lang="ts">

const { icon } = defineProps<{icon: string}>()


</script>

<style scoped lang="scss">


</style>