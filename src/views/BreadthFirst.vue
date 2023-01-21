<template lang="">
    <div class="container">
        <AlgorithmPickerMenu :options="options"/>
        <p @click="testFunc">press "w" to draw walls</p>
        <Grid :fn="testFunc"/> 
    </div>
</template>
<script setup lang="ts">
    import Grid from "../components/Graph/Grid.vue"
    import AlgorithmPickerMenu from "@/components/Navigation/algorithmPickerMenu.vue";

    function testFunc() {

    }

    const options =  ["Bfs", "dijkstras", "aStar"]
</script>
<style scoped lang="scss">

    
   .container {
    display: flex;
    justify-content: center;
    align-items: center;
   } 
</style>