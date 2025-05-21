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
    Gesture, 
    GestureType
} from "react-native-gesture-handler";
import { PanGestureHandlerEventPayload } from "react-native-screens";

import { workletClamp } from "@/components/helper"

import { useTarotGameSettingsStore } from "@/contexts/tarotGameSettings";
import { useTarotGameGroupStore } from "@/contexts/tarotGameGroup";

import { TTarotGameSettingsOnboardTarotDeckScreenItemHookProps } from "./type";

const staticServerUrl = process.env.EXPO_PUBLIC_STATIC_SERVER_URL

export const useTarotGameSettingsOnboardTarotDeckScreenItemHook = (props:TTarotGameSettingsOnboardTarotDeckScreenItemHookProps)=>{

    const {
        scrollRef,
        item,
        itemSize,
        itemImageViewportSizes,
        screenName
    } = props
    
    const setTarotGameSettingsSelectedItems = useTarotGameGroupStore((state)=>state.setTarotGameSettingsSelectedItems);
    const setTarotGameSettingsItemModal = useTarotGameSettingsStore((state)=>state.setTarotGameSettingsItemModal);

    const previousTranslateX = useSharedValue(0);
    const translateX  = useSharedValue(0);
    const currentItem = useSharedValue(0)

    const isSelected = useTarotGameGroupStore((state)=>state.tarotGameSettingsSelectedItems[screenName] === item.id ? true : false)

    const centerOfItem = useDerivedValue(()=>{
        return -(itemSize.value/2)
    })

    const leftOfItem = useDerivedValue(()=>{
        return centerOfItem.value + itemSize.value/3.5
    })

    const rightOfItem = useDerivedValue(()=>{
        return centerOfItem.value - itemSize.value/3.5
    })

    const pagingIndicatorSize = useDerivedValue(()=>{
        return Number((itemSize.value/8).toFixed(0))
    })

    const itemSelectedIconSize = useDerivedValue(()=>{
        return itemSize.value/5
    })

    const animStyle = useAnimatedStyle(()=>({
        width:itemSize.value
    }))
    
    const translateAnim = useAnimatedStyle(()=>({
        transform:[
            {translateX:translateX.value}
        ]
    }))

    const randomFrontFaceImageViewportSizeSource = itemImageViewportSizes.map((viewPorts)=>{
        const uri = 
            staticServerUrl +
            `${item.randomFrontFace.image.url.split(item.randomFrontFace.image.ext)[0]}` +
            `-` + 
            `${viewPorts.width}` + 
            `x` +
            `${viewPorts.height}` + 
            `${item.randomFrontFace.image.ext}`
        ;
        return {
            uri:uri,
            width:viewPorts.width,
            height:viewPorts.height
        }
    })

    const backFaceImageViewportSizeSource = itemImageViewportSizes.map((viewPorts)=>{
        const uri = 
            staticServerUrl +
            `${item.backFace.image.url.split(item.backFace.image.ext)[0]}` +
            `-` + 
            `${viewPorts.width}` + 
            `x` +
            `${viewPorts.height}` + 
            `${item.backFace.image.ext}`
        ;
        return {
            uri:uri,
            width:viewPorts.width,
            height:viewPorts.height
        }
    })


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
        setTarotGameSettingsSelectedItems(screenName,item.id)
    },[])

    const handleDoubleTapOnItem = useCallback(()=>{
        setTarotGameSettingsItemModal({
            modalVisibility:true,
            screenName:screenName,
            item:item
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
    .simultaneousWithExternalGesture(scrollRef as any)
    .onStart(()=>{
        previousTranslateX.value = translateX.value;
    })
    .onChange((e)=>{
        translateX.value = withSpring(workletClamp((previousTranslateX.value + e.translationX),-itemSize.value,0),config(e))
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
            translateX.value = -(itemSize.value * Math.round(currentItem.value))
        }
    )

    useAnimatedReaction(
        ()=>translateX.value,
        ()=>{
            currentItem.value =  Number((Math.abs(translateX.value)/itemSize.value).toFixed(2)) || 0
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
        pagingIndicatorSize,
        backFaceImageViewportSizeSource,
        randomFrontFaceImageViewportSizeSource,
    }
}

export default {
    useTarotGameSettingsOnboardTarotDeckScreenItemHook
}