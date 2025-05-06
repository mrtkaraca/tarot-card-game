import { router } from "expo-router";
import { useState, useCallback, useEffect,startTransition} from "react";
import { useDerivedValue, runOnUI, useAnimatedReaction, runOnJS } from "react-native-reanimated";

import { useTarotGameGroupStore } from "@/contexts/tarotGameGroup";

import { onboardScreensData } from "../TarotGameSettingsOnboardScreensContainer/helper";

import { TTarotGameSettingsFooterHookProps } from "./type";

import { TTarotGameSettingsScreens } from "../../type";

export const useTarotGameSettingsFooterHook = (props:TTarotGameSettingsFooterHookProps)=>{

    const [currentScreenIndex,setCurrentScreenIndex] = useState(0);
    const [currenScreenName,setCurrentScreenName] = useState<TTarotGameSettingsScreens>('tarotBackground')

    const isCurrentScreenItemSelected = useTarotGameGroupStore((state)=>state.tarotGameSettingsSelectedItems[currenScreenName] ? true : false)
  
    const handleNextScreen = useCallback(()=>{
        runOnUI(()=>{
            props.onboardScreensPagination.value = {
                pre: props.onboardScreensPagination.value.curr,
                curr: props.onboardScreensPagination.value.curr + 1,
            }
        })()
    },[])

    const handlePreviousScreen = useCallback(()=>{
        runOnUI(()=>{
            props.onboardScreensPagination.value = {
                pre : props.onboardScreensPagination.value.curr,
                curr: props.onboardScreensPagination.value.curr - 1,
            }
        })()
    },[])

    const handleNavigateToTarotGame = ()=>{
        router.navigate('/home/tarotGame')
    }

    useAnimatedReaction(
        ()=>props.onboardScreensPagination.value,
        ()=>{
            runOnJS(setCurrentScreenIndex)(props.onboardScreensPagination.value.curr)
            runOnJS(setCurrentScreenName)(onboardScreensData[props.onboardScreensPagination.value.curr].name)
        }
    )

    return{
        currentScreenIndex,
        isCurrentScreenItemSelected,
        handlePreviousScreen,
        handleNextScreen,
        handleNavigateToTarotGame
    }
}