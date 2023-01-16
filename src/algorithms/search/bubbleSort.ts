    import type { Ref } from 'vue'
    import sleep from '@/utils/sleep'

    export default async function startSort(elements: Ref<Array<number>>, current: Ref<Array<number>>): Promise<void> {
        const copy = [...elements.value]
        copy.sort((a, b) => a - b)
        for(let i = 0; i < elements.value.length - 1; i++) {
            if(copy.join() === elements.value.join()) {
                current.value = []
                return
            }

            for(let j = 0; j < elements.value.length - i - 1; j++) {
                await sleep(25) 
                current.value[0] = j
                current.value[1] = j + 1
                if(elements.value[j] > elements.value[j + 1]){
                    let temp = elements.value[j]
                    elements.value[j] = elements.value[j+1]
                    elements.value[j+1] = temp

                }
            }
        }
        current.value = [-1, -1]
    }