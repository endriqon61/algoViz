import { defineStore } from "pinia"
import { ref } from 'vue'
import type { Ref } from 'vue'

export const useAlgoStore = defineStore('user', {
  state: () => {
    return {
        algorithmFinishedGlobal: true as Boolean,
    }
  },
})

const speed: Ref<number> = ref(1)
const setSpeed = (value: number) => {
  speed.value = value;
}

export const useSpeed = () => {
  return  { speed , setSpeed }

}
