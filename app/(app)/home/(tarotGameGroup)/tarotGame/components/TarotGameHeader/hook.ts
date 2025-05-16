import { router } from "expo-router"

import { TTarotGameHeaderHookProps } from "./type"

export const useTarotGameHeaderHook = (props:TTarotGameHeaderHookProps)=>{
    const handleOnPress = ()=>{
        if(router.canGoBack()){
            router.back()
        }
        else{
            router.replace('/home/tarotGameSettings')
        }
    }

    return{
        handleOnPress
    }
}

export default {
    useTarotGameHeaderHook
}