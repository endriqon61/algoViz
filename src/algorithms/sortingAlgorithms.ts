    import type { Ref } from 'vue'
    import sleep from '@/utils/sleep'
    import { Howler, Howl } from 'howler'

    Howler.volume(0.1);
    export async function bubbleSort(elements: Ref<number[]>, current: Ref<number[]>): Promise<void> {
        const successSound = new Howl({
            src: ['../../public/short_retro.mp3']
        })
        const copy = [...elements.value]
        copy.sort((a, b) => a - b)
        for(let i = 0; i < elements.value.length - 1; i++) {
            if(copy.join() === elements.value.join()) {
                current.value = []
                return
            }

            for(let j = 0; j < elements.value.length - i - 1; j++) {
                await sleep(5) 
                current.value[0] = j
                current.value[1] = j + 1
                if(elements.value[j] > elements.value[j + 1]){
                    let temp = elements.value[j]
                    elements.value[j] = elements.value[j+1]
                    elements.value[j+1] = temp
                    successSound.play();
                }
            }
        }
        current.value = [-1, -1]
    }

    export async function selectionSort(elements: Ref<number[]>, currentOne: Ref<number>, currentDouble: Ref<number[]>): Promise<void> {
        const copy = [...elements.value]
        copy.sort((a, b) => a - b)
        const successSound = new Howl({
            src: ['short_retro2.mp3']
        })

        const searchingSound = new Howl({
            src: ['short_retro3.mp3']
        })

        for(let i = 0; i < elements.value.length - 1; i++) {

            let currentMin = i;
            for(let j = i; j < elements.value.length; j++) {
                await sleep(30)
                searchingSound.play()
                currentOne.value = j
                if(elements.value[j] < elements.value[currentMin]) {
                    currentMin = j
                }
            }
            currentOne.value = -1
            currentDouble.value = [i, currentMin]
            await sleep(50)
            successSound.play()
            const temp = elements.value[i] 
            elements.value[i] = elements.value[currentMin] 
            elements.value[currentMin] = temp
            currentDouble.value = []
        }
    }