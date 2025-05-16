import { useTarotGameStore } from "@/contexts/tarotGame"
import { TTarotGameBackgroundHookProps } from "./type"

export const useTarotGameBackgroundHook = (props:TTarotGameBackgroundHookProps)=>{

    const tarotBackgroundData = useTarotGameStore((state)=>state.tarotGameData?.tarotBackground)

    return{
        tarotBackgroundData
    }
}

export default {
    useTarotGameBackgroundHook
}