import { useCallback, useEffect, useLayoutEffect, useState } from "react"
import {
    Easing,
    measure,
    runOnJS, 
    runOnUI, 
    useAnimatedReaction, 
    useAnimatedRef, 
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withTiming
} from "react-native-reanimated"

import { SkSize } from "@shopify/react-native-skia"

import { 
    TDataLoadingData, 
    TDataLoadingHookProps 
} from "./type"

export const useDataLoadingHook = (props:TDataLoadingHookProps)=>{

    const {
        dataLoadingDataSV
    } = props
    
    const [dataLoadingData,setDataLoadingData] = useState<TDataLoadingData | null>(null)

    const dataLoadingContainerRef = useAnimatedRef()

    const animatedBarCanvasLayout = useSharedValue<SkSize>({
        height:0,
        width:0
    })

    const animatedBarHeight = useDerivedValue(()=>{
        return animatedBarCanvasLayout.value.height
    })
    const animatedBarWidth = useSharedValue(0)

    const animatedBarWidthMaxPercent = 100
    const animatedBarWidthPerPercent = useDerivedValue(()=>{
        return Number(animatedBarCanvasLayout.value.width/animatedBarWidthMaxPercent)
    })

    const animDuration = 100

    const workletHandleDataLoadingProgress = ()=>{
        'worklet';
        let dataLoadingDataCurrentProgressPercent = Number(Math.floor(animatedBarWidthMaxPercent * (Number(dataLoadingDataSV.value?.dataLoadCurrentProgress)/Number(dataLoadingDataSV.value?.dataLoadMaxDataLength))))
        let animatedbarCurrentProgressWidth = Number(animatedBarWidthPerPercent.value * dataLoadingDataCurrentProgressPercent )
        
        let newDataLoadingDataObj:TDataLoadingData = {
            ...dataLoadingDataSV.value,
            dataLoadCurrentProgress:dataLoadingDataCurrentProgressPercent,
            dataLoadMaxDataLength:animatedBarWidthMaxPercent
        }

        runOnJS(setDataLoadingData)(newDataLoadingDataObj)
        animatedBarWidth.value = withTiming(
            animatedbarCurrentProgressWidth,
            {
                duration:animDuration,
                easing:Easing.bezier(0.47, 0, 0.47, 1),
            }
        )
    }


    useAnimatedReaction(
        ()=>dataLoadingDataSV.value,
        ()=>{
            if(dataLoadingDataSV.value){
                workletHandleDataLoadingProgress()
            }
        }
    )

   
    return{
        animatedBarHeight,
        animatedBarWidth,
        dataLoadingContainerRef,
        dataLoadingData,
        animatedBarCanvasLayout
    }
}