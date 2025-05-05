import { 
    useCallback, 
    useLayoutEffect 
} from "react"
import { BackHandler } from "react-native"

import { useTarotGameSettingsStore } from "@/contexts/tarotGameSettings"

import { imageSize } from "./helper"

export const useTarotGameSettingsScreenItemModalContainerHook = ()=>{

    const tarotGameSettingsItemModal = useTarotGameSettingsStore((state)=>state.tarotGameSettingsItemModal)
    const setTarotGameSettingsItemModal = useTarotGameSettingsStore((state)=>state.setTarotGameSettingsItemModal)

    const imageAspectRatio = tarotGameSettingsItemModal.screenName ? imageSize[tarotGameSettingsItemModal.screenName].width/imageSize[`${tarotGameSettingsItemModal.screenName}`].heigth : undefined
    const imageMaxHeigth = tarotGameSettingsItemModal.screenName ? imageSize[tarotGameSettingsItemModal.screenName].heigth : undefined


    const handleModalVisibility = useCallback(()=>{
        setTarotGameSettingsItemModal({modalVisibility:false} as any)
    },[])


    useLayoutEffect(()=>{
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            ()=>{
                if(tarotGameSettingsItemModal.modalVisibility){
                    handleModalVisibility();
                    return true
                }
                return false
            },
        );

        return () => backHandler.remove();

    },[tarotGameSettingsItemModal])

    return{
        imageAspectRatio,
        imageMaxHeigth,
        tarotGameSettingsItemModal,
        handleModalVisibility
    }
}