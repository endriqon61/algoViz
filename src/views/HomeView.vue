<script setup lang="ts">
</script>

<template>
  <main>
  <h1>Hello</h1>
  <div class="router-links">
    <router-link to="/binarySearch">binarySearch</router-link>
    <router-link to="/bubbleSort">bubbleSort</router-link>
    <router-link to="/breadthFirstSearch">BreadthFirst</router-link>
  </div>
  </main>


</template>

<style scoped lang="scss">

.router-links {
    display: flex;

    * {
      margin: 15px;
    }
}

</style>