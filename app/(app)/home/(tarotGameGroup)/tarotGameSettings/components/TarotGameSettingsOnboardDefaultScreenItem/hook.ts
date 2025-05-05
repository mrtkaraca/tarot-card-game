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

export const useTarotGameSettingsOnboardDefaultScreenItemHook = (props:TTarotGameSettingsOnboardDefaultScreenItemHookProps)=>{
    
    const setTarotGameSettingsSelectedItems = useTarotGameGroupStore((state)=>state.setTarotGameSettingsSelectedItems);
    const setTarotGameSettingsItemModal = useTarotGameSettingsStore((state)=>state.setTarotGameSettingsItemModal);

    const isSelected = useTarotGameGroupStore((state)=>state.tarotGameSettingsSelectedItems[props.screenName] === props.item.id ? true : false)

    const itemSelectedIconSize = useDerivedValue(()=>{
        return props.itemSize.value/5
    })

    const animStyle = useAnimatedStyle(()=>({
        width:props.itemSize.value,
    }))

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
    }
}
