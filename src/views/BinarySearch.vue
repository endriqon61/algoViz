<template>
    <div>
        <Row v-if="showRow" :find="find" :elements="elements"/>
        <button @click="()=>{showRow = !showRow}">Start</button>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref} from "vue";
import  Row  from "../components/BinarySearch/Row.vue";
const elements = reactive([1, 2, 3])
const showRow = ref(false)
const find = ref(2)
</script>

<style lang="scss" scoped>

</style>