import type { Ref } from "vue"
import { Howl } from "howler"

export function sounds(volume: Ref<number>) {

    const healSound = new Howl({
        src: 'retro_heal.wav',
    })
    const retroJump = new Howl({
        src: 'retro_jump.wav',
        rate: 0.5
    })

    const retroSearch = new Howl({
        src: 'short_retro3.mp3',
        rate: 0.5
    })

    const retroSwap = new Howl({
        src: 'short_retro2.mp3',
    })


    return { healSound , retroJump, retroSearch, retroSwap }

}