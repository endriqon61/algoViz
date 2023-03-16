<template lang="">
    <div @click="log()"  @dragstart="(e) => {dragStart(e)}" :ondragover="(e) => {e.preventDefault()}" :data-isEndNode="props.isEndNode" :data-row="props.row" :data-isStartNode="props.isStartNode" :data-col="props.col" draggable="false" @dragend="(e) => { dragEndHandler(e) }" @dragover="(e) => { dragHandler(e) }" @mouseover="makeWallNode()" id="nodeId" ref="nodeElement" class="node" :class="{wall: props.isWallNode ,start: props.isStartNode, end: props.isEndNode}">
        <span v-if="props.weight > 1" class="weight bg-sky-50 border-2 border-indigo-500 border-solid text-indigo-500">{{props.weight}}</span>       
         <div :class="{'animation-visited': props.isVisited, road: props.isRoadNode } "></div> 
         <img v-if="props.isStartNode" :class="{'dragging-node': dragging}" src="/in-love.svg"/>
         <img v-if="props.isEndNode" :class="{'dragging-node': dragging}" src="/cool.svg"/>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue"
const emit = defineEmits(['dragStartCustom', 'dragCustom', 'wall', 'dragendCustom'])
const dragging = ref(false)
const nodeElement: any = ref(null)
const newStartNode: any = ref()
const nodeElementWithId: any = document.getElementById("nodeId")
const props = defineProps<{
    speed: string | number,
    heuristic: number,
    distance: number,
    isEndNode: boolean, isWallNode: boolean; isStartNode: boolean, isVisited: boolean, isRoadNode: boolean, weight: number, row: number, col: number
}>()

onMounted(() => {
    const node: HTMLElement|null = document.querySelector<HTMLElement>('.node')
    node?.style.setProperty('--animation-duration', `${Number(props.speed) * 30}ms`)
    console.log("speed", props.speed)
})
function log() {
    console.log("heurstic")
    console.log(props.heuristic)
    console.log('cords')
    console.log(props.row, props.col)
}
function dragEndHandler(e: Event) {
    dragging.value = false
    emit('dragendCustom', e.currentTarget)
}
function dragHandler(e: Event) {
    emit("dragCustom", e.currentTarget)
}

function dragStart(e: any) {
    dragging.value = true
    emit("dragStartCustom", e.currentTarget.dataset)
}
function makeWallNode() {
    // dragging.value = false
    emit('wall', props.row, props.col)
}

onMounted(() => {
    if (props.isStartNode || props.isEndNode) nodeElement.value.draggable = true

})

</script>
<style scoped lang="scss">
* {
    user-select: none;
}

.dragging-node {
    opacity: 0;
}
.node {
    box-shadow: 0px 0px 1px 0px #60a5fa;
    webkit-box-shadow: 0px 0px 1px 0px #60a5fa;
    moz-box-shadow: 0px 0px 1px 0px #60a5fa;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
}
.start, .end {
    cursor: grab;
}

.start:active, .end:active{
    cursor: grabbing !important;
}


.weight {
    position: absolute;
    font-family: 'Varela Round', sans-serif;
    font-weight: bold;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    // background-color: rgb(154, 225, 255);
    // color: black;
    text-align: center;
    animation: wallAnimation 600ms ease-in;
    // border: 1px solid black;
}

img {
    width: 100%;
    height: 100%;
}


.start {}

.end {}

.animation-visited {
    width: 100%;
    height: 100%;
    background-color: pink;
    animation: visitedNode forwards ease-in;
    animation-duration: var(--animation-duration);
}
.visited {

    width: 100%;
    height: 100%;
    background-color: pink;
}

.road {
    background-color: rgb(207, 207, 207);

    z-index: 100;
    width: 100%;
    height: 100%;
    animation: roadNode 500ms forwards ease-in;
}

.wall {
    background-color: #312e81;
    animation: wallAnimation  600ms ease-in;

}

@keyframes wallAnimation {
    0% {
        transform: scale(0.5);
    }

    50% {
        transform: scale(1.3);
    }

    100% {
        transform: scale(1);
    }
}

@keyframes visitedNode {
    0% {
        transform: scale(0.2);
        background-color: #d9f99d;
        border-radius: 100%;
    }

    50% {
        border-radius: 50%;
        background-color: #38bdf8;
    }

    80% {
        background-color: #22d3ee;
        transform: scale(1.2);
    }

    100% {
        background-color: #6366f1;
        border-radius: 0;
        transform: scale(1);
    }
}

@keyframes roadNode {
    0% {
        transform: scale(0)
    }

    80% {
        transform: scale(1.25)
    }

    100% {
        transform: scale(1)
    }
}
</style>