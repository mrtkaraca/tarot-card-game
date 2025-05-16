import { 
    useCallback, 
    useEffect, 
    useLayoutEffect 
} from "react";
import { 
    useAnimatedRef, 
    useSharedValue, 
    useAnimatedStyle, 
    runOnUI, 
    measure, 
    useAnimatedReaction 
} from "react-native-reanimated";
import { router } from "expo-router";

import { useAlertModalContext } from "@/contexts/alertModal";

import { useTarotGameSettingsStore } from "@/contexts/tarotGameSettings";
import { useTarotGameGroupStore } from "@/contexts/tarotGameGroup";

import { TTarotGameSettingsScreens } from "../type";
import { TTarotGameSettingsHeaderHookProps } from "./type";
import { useTranslation } from "react-i18next";


export const useTarotGameSettingsHeaderHook = (props:TTarotGameSettingsHeaderHookProps) =>{
     const {
        t
    } = useTranslation()

    const { setAlertModalProps } = useAlertModalContext();

    const tarotGameSettingsData = useTarotGameSettingsStore((state)=>state.tarotGameSettingsData)
    const tarotGameSettingsSelectedItems = useTarotGameGroupStore((state)=>state.tarotGameSettingsSelectedItems)
    const isTarotGameSettingsDataReady = useTarotGameSettingsStore((state)=>state.tarotGameSettingsData ? true : false)
    const setTarotGameSettingsSelectedItems = useTarotGameGroupStore((state)=>state.setTarotGameSettingsSelectedItems)


    const tarotGameSettingsAlertModalDescription = {
        tarotBackground:t('tarotGameSettings.tarotGameSettingsHeader.alertModalDescription.tarotBackground'),
        tarotCursor:t('tarotGameSettings.tarotGameSettingsHeader.alertModalDescription.tarotCursor'),
        tarotDeck:t('tarotGameSettings.tarotGameSettingsHeader.alertModalDescription.tarotDeck'),
        descriptionPart:t('tarotGameSettings.tarotGameSettingsHeader.alertModalDescription.descriptionPart'),
    }

    const leftSideRef = useAnimatedRef();
    const rightSideRef = useAnimatedRef();

    const leftSideDim = useSharedValue<{
        width:number,
        height:number
    } | null >(null)

    const rightSideDim = useSharedValue<{
        width:number,
        height:number
    } | null >(null)

    const leftSideAnimStyle = useAnimatedStyle(()=>({
        width:leftSideDim.value?.width
    }))

    const rightSideAnimStyle = useAnimatedStyle(()=>({
        width:rightSideDim.value?.width
    }))

    const handleLeftButton = useCallback(()=>{
        if(router.canGoBack()){
            router.back()
        }
        else{
            router.replace('/home')
        }
    },[])

    const selectRandomlyTarotGameSettingsSelectedItems = useCallback(()=>{

        (Object.keys(tarotGameSettingsSelectedItems) as Array<TTarotGameSettingsScreens>).forEach((screen)=>{
            if(!tarotGameSettingsSelectedItems[screen] && tarotGameSettingsData?.[screen]){

                const arrayLength = tarotGameSettingsData[screen].length;
                const randomIndex = Math.floor(Math.random()*arrayLength)
                const selectedItemId = tarotGameSettingsData[screen][randomIndex].id

                setTarotGameSettingsSelectedItems(screen,selectedItemId)
                
            }
        })

    },[tarotGameSettingsData,tarotGameSettingsSelectedItems])

    const handleAlertModalDescription = useCallback(()=>{
        const strArray = (Object.keys(tarotGameSettingsSelectedItems) as Array<TTarotGameSettingsScreens>).filter((screen)=>!tarotGameSettingsSelectedItems[screen]).map((screen)=>{
            return tarotGameSettingsAlertModalDescription[screen]
        })
        return strArray.join(', ').concat(' ') + tarotGameSettingsAlertModalDescription.descriptionPart
    },[tarotGameSettingsSelectedItems])


    const handleAlertModalLeftButton = useCallback(()=>{
        setAlertModalProps(null)
    },[])

    const handleAlertModalRightButton = useCallback(()=>{
        selectRandomlyTarotGameSettingsSelectedItems();
        setAlertModalProps(null);
        router.push('/home/tarotGame')
    },[tarotGameSettingsData,tarotGameSettingsSelectedItems])

    const handleSkip = useCallback(()=>{
        if(
            tarotGameSettingsSelectedItems.tarotBackground && 
            tarotGameSettingsSelectedItems.tarotCursor && 
            tarotGameSettingsSelectedItems.tarotDeck
        ){
            router.push('/home/tarotGame')
        }
        else{
            const alertModalDescription = handleAlertModalDescription();

            setAlertModalProps({
                isAlertModalVisible:true,
                alertModalTitle:t('tarotGameSettings.tarotGameSettingsHeader.skipAlertModal.alertModalTitle'),
                alertModalDescription:alertModalDescription,
                leftButton:{
                    textButtonTextLabel:t('tarotGameSettings.tarotGameSettingsHeader.skipAlertModal.leftButtonTextLabel'),
                    handleOnPress:handleAlertModalLeftButton,
                },
                rightButton:{
                    textButtonTextLabel:t('tarotGameSettings.tarotGameSettingsHeader.skipAlertModal.rightButtonTextLabel'),
                    handleOnPress:handleAlertModalRightButton
                }
            })
        }
    },[tarotGameSettingsSelectedItems,tarotGameSettingsData])

    const handleOnLayout = useCallback(()=>{
        runOnUI(()=>{
            const leftSideMes = measure(leftSideRef)
            const rightSideMes = measure(rightSideRef)

            if(leftSideMes && rightSideMes){
                if(leftSideMes.width > rightSideMes.width){
                    rightSideDim.value = {
                        width:leftSideMes.width,
                        height:leftSideMes.height
                    }
                }
                else{
                    if(leftSideMes.width < rightSideMes.width){
                        leftSideDim.value = {
                            width:rightSideMes.width,
                            height:rightSideMes.height
                        }
                    }
                }
            }
        })()
    },[])


    useAnimatedReaction(
        ()=>[leftSideDim.value,rightSideDim.value],
        ()=>{
            if(leftSideDim.value && rightSideDim.value){
                if(leftSideDim.value.width > rightSideDim.value.width){
                    rightSideDim.value = {
                        ...rightSideDim.value,
                        width:leftSideDim.value.width
                    }
                }
                else{
                    if(leftSideDim.value.width < rightSideDim.value.width){
                        leftSideDim.value = {
                            ...leftSideDim.value,
                            width:rightSideDim.value.width
                        }
                    }
                }
            }
        }
    )

    return {
        t,
        leftSideRef,
        rightSideRef,
        isTarotGameSettingsDataReady,
        leftSideAnimStyle,
        rightSideAnimStyle,
        handleLeftButton,
        handleSkip,
        handleOnLayout
    }

}

export default {
    useTarotGameSettingsHeaderHook
}
