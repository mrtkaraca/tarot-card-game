import { useEffect, useLayoutEffect, useState } from "react"
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

import { 
    TDataLoadingData, 
    TDataLoadingHookProps 
} from "./type"
import { SkSize } from "@shopify/react-native-skia"

export const useDataLoadingHook = (props:TDataLoadingHookProps)=>{
    
    const [dataLoadingData,setDataLoadingData] = useState<TDataLoadingData | null>(null)

    const dataLoadingContainerRef = useAnimatedRef()

    const animatedDataLoadingContainerBorderRadious = useSharedValue(0)

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

    const animatedDataLoadingContainerStyle = useAnimatedStyle(()=>({
        borderRadius:animatedDataLoadingContainerBorderRadious.value
    }))

    const animDuration = 100

    const workletHandleDataLoadingProgress = ()=>{
        'worklet';
        let dataLoadingDataCurrentProgressPercent = Number(Math.floor(animatedBarWidthMaxPercent * (Number(props.dataLoadingData.value?.dataLoadCurrentProgress)/Number(props.dataLoadingData.value?.dataLoadMaxDataLength))))
        let animatedbarCurrentProgressWidth = Number(animatedBarWidthPerPercent.value * dataLoadingDataCurrentProgressPercent )
        
        let newDataLoadingDataObj:TDataLoadingData = {
            ...props.dataLoadingData.value,
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
        ()=>props.dataLoadingData.value,
        ()=>{
            if(props.dataLoadingData.value){
                workletHandleDataLoadingProgress()
            }
        }
    )

    useLayoutEffect(()=>{
        runOnUI(()=>{
            if(dataLoadingContainerRef.current){
                const mes = measure(dataLoadingContainerRef)
                if(mes){
                    animatedDataLoadingContainerBorderRadious.value = Number(mes.height/10)
                }
            }
        })()
    })


    return{
        animatedBarHeight,
        animatedBarWidth,
        dataLoadingContainerRef,
        dataLoadingData,
        animatedBarCanvasLayout,
        animatedDataLoadingContainerStyle
    }
}