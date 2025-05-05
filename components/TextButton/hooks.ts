import { Gesture } from "react-native-gesture-handler";
import { measure, runOnJS, useAnimatedRef, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import { TTextButtonHookProps } from "./type";
import { LayoutChangeEvent } from "react-native";
import { useLayoutEffect } from "react";

export const useTextButtonHook = (props:TTextButtonHookProps)=>{

    const buttonContainerRef = useAnimatedRef();

    const buttonOpacity = useSharedValue(0);
    const buttonScale = useSharedValue(1);
    const textButtonDimensions = useSharedValue<{
        width:number,
        height:number
    } | null>(null);

 
    const textButtonAnimStyle = useAnimatedStyle(()=>({
        borderRadius:textButtonDimensions.value ? textButtonDimensions.value.height/10 : undefined,
    }))
    const buttonOpacityStyle = useAnimatedStyle(()=>{
        return {
            opacity:buttonOpacity.value
        }
    })


    const gesture = Gesture.Pan()
    .enabled(props.isButtonDisabled ? !props.isButtonDisabled : true)
    .shouldCancelWhenOutside(true)
    .onBegin(()=>{
        buttonScale.value = withTiming(0.975,{duration:100})
        buttonOpacity.value = withTiming(1,{duration:100})
    })
    .onFinalize((e)=>{
        buttonScale.value = withTiming(1,{duration:200})
        buttonOpacity.value = withTiming(0,{duration:200})

        if(e.state !== 3){
            if(props.handleOnPress){
                runOnJS(props.handleOnPress)()
            }
        }
    })

    useLayoutEffect(()=>{
        if(buttonContainerRef.current){
            const mes = measure(buttonContainerRef)
            if(mes){
                textButtonDimensions.value = {
                    width:mes.width,
                    height:mes.height
                }
            }
        }
    },[buttonContainerRef])
  
    return {
        gesture,
        buttonContainerRef,
        buttonOpacityStyle,
        textButtonAnimStyle,
    }
}