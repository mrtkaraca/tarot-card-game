import { router } from "expo-router";
import { useState, useCallback, useEffect,startTransition} from "react";
import { useDerivedValue, runOnUI, useAnimatedReaction, runOnJS } from "react-native-reanimated";

import { useTarotGameGroupStore } from "@/contexts/tarotGameGroup";


import { TTarotGameSettingsFooterHookProps } from "./type";

import { TTarotGameSettingsScreens } from "../type";
import { useTranslation } from "react-i18next";

export const useTarotGameSettingsFooterHook = (props:TTarotGameSettingsFooterHookProps)=>{

    const {
        onboardScreensData,
        onboardScreensPagination
    } = props

    const {
        t
    } = useTranslation()

    const [currentScreenIndex,setCurrentScreenIndex] = useState(0);
    const [currenScreenName,setCurrentScreenName] = useState<TTarotGameSettingsScreens>('tarotBackground')

    const isCurrentScreenItemSelected = useTarotGameGroupStore((state)=>state.tarotGameSettingsSelectedItems[currenScreenName] ? true : false)
  
    const handleNextScreen = useCallback(()=>{
        runOnUI(()=>{
            onboardScreensPagination.value = {
                pre: onboardScreensPagination.value.curr,
                curr: onboardScreensPagination.value.curr + 1,
            }
        })()
    },[])

    const handlePreviousScreen = useCallback(()=>{
        runOnUI(()=>{
            onboardScreensPagination.value = {
                pre : onboardScreensPagination.value.curr,
                curr: onboardScreensPagination.value.curr - 1,
            }
        })()
    },[])

    const handleNavigateToTarotGame = ()=>{
        router.navigate('/home/tarotGame')
    }

    useAnimatedReaction(
        ()=>onboardScreensPagination.value,
        ()=>{
            runOnJS(setCurrentScreenIndex)(onboardScreensPagination.value.curr)
            runOnJS(setCurrentScreenName)(onboardScreensData[props.onboardScreensPagination.value.curr].name)
        }
    )

    return{
        t,
        currentScreenIndex,
        isCurrentScreenItemSelected,
        handlePreviousScreen,
        handleNextScreen,
        handleNavigateToTarotGame
    }
}

export default {
    useTarotGameSettingsFooterHook
}