import { useSpeed } from "@/store/algoStore";

export default function sleep(ms: number): Promise<any> {
    const { speed, setSpeed } = useSpeed()
    console.log("speed in sleep f", speed.value)
    return new Promise(resolve => setTimeout(resolve, ms * speed.value));
}


