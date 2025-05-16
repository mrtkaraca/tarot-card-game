import { useCallback } from "react"
import { router } from "expo-router"

import { THomeHookProps } from "./type"

export const useHomeHook = (props:THomeHookProps)=>{

    const handleNavigateToTarotGameSettings = useCallback(()=>{
        router.navigate('/home/tarotGameSettings')
    },[])

    return{
        handleNavigateToTarotGameSettings
    }
}

export default {
    useHomeHook
}