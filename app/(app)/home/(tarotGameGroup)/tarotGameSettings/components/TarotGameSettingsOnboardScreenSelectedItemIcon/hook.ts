import { 
    useAnimatedStyle 
} from "react-native-reanimated"

import { TTarotGameSettingsOnboardScreenSelectedItemIconHookProps } from "./type"


export const useTarotGameSettingsOnboardScreenSelectedItemIconHook = (props:TTarotGameSettingsOnboardScreenSelectedItemIconHookProps)=>{
    
    const animStyle = useAnimatedStyle(()=>({
        width:props.itemSelectedIconSize.value,
        height:props.itemSelectedIconSize.value,
    }))


    return {
        animStyle,
    }
}

export default {
    useTarotGameSettingsOnboardScreenSelectedItemIconHook
}