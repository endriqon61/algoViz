import { defineStore } from "pinia"

export const useAlgoStore = defineStore('user', {
  state: () => {
    return {
        algorithmFinishedGlobal: true as Boolean,
    }
  },
})
