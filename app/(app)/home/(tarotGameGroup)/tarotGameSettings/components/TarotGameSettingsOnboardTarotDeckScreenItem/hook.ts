import { useCallback } from "react";
import {
    useSharedValue,
    useDerivedValue,
    useAnimatedStyle, 
    ReduceMotion, 
    runOnJS, 
    withSpring, 
    useAnimatedReaction 
} from "react-native-reanimated";
import { 
    GestureUpdateEvent, 
    GestureStateChangeEvent, 
    Gesture 
} from "react-native-gesture-handler";
import { PanGestureHandlerEventPayload } from "react-native-screens";

import { workletClamp } from "@/components/helper"

import { useTarotGameSettingsStore } from "@/contexts/tarotGameSettings";
import { useTarotGameGroupStore } from "@/contexts/tarotGameGroup";

import { TTarotGameSettingsOnboardTarotDeckScreenItemHookProps } from "./type";

export const useTarotGameSettingsOnboardTarotDeckScreenItemHook = (props:TTarotGameSettingsOnboardTarotDeckScreenItemHookProps)=>{

    
    const setTarotGameSettingsSelectedItems = useTarotGameGroupStore((state)=>state.setTarotGameSettingsSelectedItems);
    const setTarotGameSettingsItemModal = useTarotGameSettingsStore((state)=>state.setTarotGameSettingsItemModal);

    const previousTranslateX = useSharedValue(0);
    const translateX  = useSharedValue(0);
    const currentItem = useSharedValue(0)

    const isSelected = useTarotGameGroupStore((state)=>state.tarotGameSettingsSelectedItems[props.screenName] === props.item.id ? true : false)

    const centerOfItem = useDerivedValue(()=>{
        return -(props.itemSize.value/2)
    })

    const leftOfItem = useDerivedValue(()=>{
        return centerOfItem.value + props.itemSize.value/3.5
    })

    const rightOfItem = useDerivedValue(()=>{
        return centerOfItem.value - props.itemSize.value/3.5
    })

    const pagingIndicatorSize = useDerivedValue(()=>{
        return Number((props.itemSize.value/8).toFixed(0))
    })

    const itemSelectedIconSize = useDerivedValue(()=>{
        return props.itemSize.value/5
    })

    const animStyle = useAnimatedStyle(()=>({
        width:props.itemSize.value
    }))
    
    const translateAnim = useAnimatedStyle(()=>({
        transform:[
            {translateX:translateX.value}
        ]
    }))


    const config = (e:GestureUpdateEvent<PanGestureHandlerEventPayload> | GestureStateChangeEvent<PanGestureHandlerEventPayload>) => {
        'worklet'
        return {
            mass: 2,
            damping: 100,
            stiffness: 300,
            overshootClamping: false,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 2,
            velocity:e.velocityX/10,
            reduceMotion: ReduceMotion.System,
        }
    }

    const handleTapOnItem = useCallback(()=>{
        setTarotGameSettingsSelectedItems(props.screenName,props.item.id)
    },[])

    const handleDoubleTapOnItem = useCallback(()=>{
        setTarotGameSettingsItemModal({
            modalVisibility:true,
            screenName:props.screenName,
            item:props.item
        })
    },[])

    const tapGesture = Gesture.Tap()
    .onEnd(()=>{
        runOnJS(handleTapOnItem)()
    })
    
    const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(()=>{
        runOnJS(handleDoubleTapOnItem)()
    })

    const exclusiveGesture = Gesture.Exclusive(doubleTapGesture,tapGesture)

    const panGesture = Gesture.Pan()
    .onStart(()=>{
        previousTranslateX.value = translateX.value;
    })
    .onChange((e)=>{
        translateX.value = withSpring(workletClamp((previousTranslateX.value + e.translationX),-props.itemSize.value,0),config(e))
    })
    .onFinalize((e)=>{
        if(previousTranslateX.value !== translateX.value){
            if(previousTranslateX.value > translateX.value){
                if(translateX.value < leftOfItem.value){
                    translateX.value = withSpring(-props.itemSize.value,config(e))
                }
                else{
                    translateX.value = withSpring(0,config(e))
                }
                
            }
            else{
                if(translateX.value > rightOfItem.value){
                    translateX.value = withSpring(0,config(e))
                }
                else{
                    translateX.value = withSpring(-props.itemSize.value,config(e))
                }
            }
        }
        else{
            translateX.value = previousTranslateX.value
        }
    })

    useAnimatedReaction(
        ()=>props.itemSize.value,
        ()=>{
            translateX.value = -(props.itemSize.value * Math.round(currentItem.value))
        }
    )

    useAnimatedReaction(
        ()=>translateX.value,
        ()=>{
            currentItem.value =  Number((Math.abs(translateX.value)/props.itemSize.value).toFixed(2)) || 0
        }
    )


    return{
        animStyle,
        translateAnim,
        panGesture,
        exclusiveGesture,
        isSelected,
        currentItem,
        itemSelectedIconSize,
        pagingIndicatorSize
    }
}