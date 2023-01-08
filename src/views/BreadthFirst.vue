<template lang="">
    <div class="container">
       <p>press "w" to toggle wall drawing mode</p>
       <Grid /> 
    </div>
</template>
<script setup lang="ts">
    import Grid from "../components/Graph/Grid.vue"
</script>
<style scoped lang="scss">
   .container {
    display: flex;
    justify-content: center;
    align-items: center;
   } 
</style>