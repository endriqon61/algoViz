<template lang="">
    <div @click="makeWallNode()" class="node" :class="{wall: props.isWallNode ,start: props.isStartNode, end: props.isEndNode}">
        <div :class="{animation: props.isVisited, road: props.isRoadNode } "></div> 
    </div>
</template>
<script setup lang="ts">
   import { ref,  onMounted } from "vue"
   const emit = defineEmits(['wall'])
   const props = defineProps<{isEndNode: boolean, isWallNode: boolean; isStartNode: boolean, isVisited: boolean, isRoadNode: boolean, row: number, col: number}>() 
    function makeWallNode() {
        emit('wall', props.row, props.col)
    }
    onMounted(() => {
    if(props.isRoadNode) {
    console.log("props ", props) 

    }
   })
   
</script>
<style scoped lang="scss">
    .node {
        box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.75);
        -webkit-box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.75);
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
    } 


    .vis {
        background-color: blue;
    }
    .start {
        background-color: green;
    }

    .end {
        background-color: red;
    }

    .animation {
        width: 5px;
        height: 5px;
        background-color: pink;
        z-index: -99;
        animation: visitedNode 1s forwards ease-in;
    }

    .road {
        background-color: yellow;
        z-index: 100;
        width: 100%;
        height: 100%;
        animation: roadNode 500ms forwards ease-in;
    }
    .wall {
        background-color: black;
    }
    @keyframes visitedNode {
       0% {
        width: 15px;
        height: 15px;
        background-color: darkblue;
        border-radius: 100%;
       }
        50% {
        border-radius: 50%;
        background-color: blue;
        }
        80% {
            background-color: lightgreen;
        }
        100% {
        background-color: lightblue;
        border-radius: 0;
        width: calc(100% + 1px);
        height: calc(100% + 1px);

       }
    }
    @keyframes roadNode {
        0% {
        background-color: yellow;
           transform: scale(0) 
        }
        80% {
        background-color: yellow;
            transform: scale(1.25)

        }
        100% {
        background-color: yellow;
            transform: scale(1)
        }
    }
</style>