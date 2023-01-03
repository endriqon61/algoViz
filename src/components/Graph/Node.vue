<template lang="">
    <div class="node" :class="{start: props.isStartNode, end: props.isEndNode}">
        
    </div>
</template>
<script setup lang="ts">
   import { onMounted } from "vue"
   const props = defineProps<{isEndNode: boolean, isStartNode: boolean, isVisited: boolean}>() 

   onMounted(() => {
    if(props.isEndNode) {
    console.log("props ", props) 

    }
   })
   
</script>
<style scoped lang="scss">
    .node {
        border: 1px solid black;
    } 

    .start {
        background-color: green;
    }

    .end {
        background-color: red;
    }
</style>