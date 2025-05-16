import { BackHandler } from "react-native"
import { useCallback, useLayoutEffect } from "react"

import { useTarotGameStore } from "@/contexts/tarotGame"

import { TTarotGameCardModalHookProps } from "./type"

export const useTarotGameCardModalHook = (props:TTarotGameCardModalHookProps)=>{

    const tarotGameCardModalData = useTarotGameStore((state)=>state.tarotGameCardModalData)
    const setTarotGameCardModalData = useTarotGameStore((state)=>state.setTarotGameCardModalData)

    const handleCloseModal = useCallback(()=>{
        setTarotGameCardModalData({isModalVisible:false} as any)
    },[])
   

    useLayoutEffect(()=>{
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            ()=>{
                if(tarotGameCardModalData.isModalVisible){
                    handleCloseModal();
                    return true
                }
                return false
            },
        );

        return () => backHandler.remove();

    },[tarotGameCardModalData])

    return{
        tarotGameCardModalData,
        handleCloseModal
    }
}

export default {
    useTarotGameCardModalHook
}