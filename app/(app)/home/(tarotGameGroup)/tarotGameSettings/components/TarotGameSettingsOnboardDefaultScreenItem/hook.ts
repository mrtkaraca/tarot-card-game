import { useCallback } from "react";
import { Gesture } from "react-native-gesture-handler";
import { 
    useDerivedValue, 
    useAnimatedStyle, 
    runOnJS 
} from "react-native-reanimated";

import { useTarotGameSettingsStore } from "@/contexts/tarotGameSettings";
import { useTarotGameGroupStore } from "@/contexts/tarotGameGroup";

import { TTarotGameSettingsOnboardDefaultScreenItemHookProps } from "./type";
import { ImageSource } from "expo-image";

export const useTarotGameSettingsOnboardDefaultScreenItemHook = (props:TTarotGameSettingsOnboardDefaultScreenItemHookProps)=>{

    const {
        item,
        itemSize,
        itemImageViewportSizes,
        screenName
    } = props
    
    const setTarotGameSettingsSelectedItems = useTarotGameGroupStore((state)=>state.setTarotGameSettingsSelectedItems);
    const setTarotGameSettingsItemModal = useTarotGameSettingsStore((state)=>state.setTarotGameSettingsItemModal);

    const isSelected = useTarotGameGroupStore((state)=>state.tarotGameSettingsSelectedItems[props.screenName] === item.id ? true : false)

    const itemSelectedIconSize = useDerivedValue(()=>{
        return itemSize.value/5
    })

    const animStyle = useAnimatedStyle(()=>({
        width:itemSize.value,
    }))

    const itemImageViewportSizeSource:ImageSource[] = itemImageViewportSizes.map((viewPorts)=>{
        const uri = 
            `${item.image.url.split(item.image.ext)[0]}` +
            `-` + 
            `${viewPorts.width}` + 
            `x` +
            `${viewPorts.height}` + 
            `${item.image.ext}`
        ;
        return {
            uri:uri,
            width:viewPorts.width,
            height:viewPorts.height
        }
    })

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

    const tap = Gesture.Tap()
    .onStart(()=>{
        runOnJS(handleTapOnItem)()
    })
    
    const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(()=>{
        runOnJS(handleDoubleTapOnItem)()
    })
    
    const exclusiveGesture = Gesture.Exclusive(doubleTap,tap)


    return{
        isSelected,
        exclusiveGesture,
        itemSelectedIconSize,
        animStyle,
        itemImageViewportSizeSource
    }
}
