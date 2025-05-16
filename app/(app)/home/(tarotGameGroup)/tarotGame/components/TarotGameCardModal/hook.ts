import { useCallback } from "react"
import { useTarotGameStore } from "@/contexts/tarotGame"

import { TTarotGameCardModalHookProps } from "./type"

export const useTarotGameCardModalHook = (props:TTarotGameCardModalHookProps)=>{

    const tarotGameCardModalData = useTarotGameStore((state)=>state.tarotGameCardModalData)
    const setTarotGameCardModalData = useTarotGameStore((state)=>state.setTarotGameCardModalData)

    const handleCloseModal = useCallback(()=>{
        setTarotGameCardModalData({isModalVisible:false} as any)
    },[])
   

    return{
        tarotGameCardModalData,
        handleCloseModal
    }
}

export default {
    useTarotGameCardModalHook
}