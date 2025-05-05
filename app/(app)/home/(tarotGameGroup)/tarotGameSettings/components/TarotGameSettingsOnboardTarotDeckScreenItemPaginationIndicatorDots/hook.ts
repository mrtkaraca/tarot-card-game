import { 
    useDerivedValue, 
    interpolate, 
    Extrapolation, 
    useAnimatedStyle 
} from "react-native-reanimated"
import { 
    rrect, 
    rect 
} from "@shopify/react-native-skia"

import { TTarotGameSettingsOnboardTarotDeckScreenItemPaginationIndicatorDotsHookProps } from "./type"

export const useTarotGameSettingsOnboardTarotDeckScreenItemPaginationIndicatorDotsHook = (props:TTarotGameSettingsOnboardTarotDeckScreenItemPaginationIndicatorDotsHookProps)=>{

    const outsideCircleBorderWidth = 2

    const innerCircleSize = useDerivedValue(()=>{
        return interpolate(
            props.currentImageIndex.value,
            [(props.index-1),(props.index),(props.index + 1)],
            [(props.pagingIndicatorSize.value-(outsideCircleBorderWidth)),0,(props.pagingIndicatorSize.value-(outsideCircleBorderWidth))],
            Extrapolation.CLAMP
        )
    })

    const innerC = useDerivedValue(
        ()=>{
            return rrect(
                rect(
                    (props.pagingIndicatorSize.value/2 - innerCircleSize.value/2), 
                    (props.pagingIndicatorSize.value/2 - innerCircleSize.value/2), 
                    innerCircleSize.value, 
                    innerCircleSize.value
                ), 
                innerCircleSize.value/2, 
                innerCircleSize.value/2
            )
        }
    )
    
    const outerC = useDerivedValue(()=>{
        return rrect(
            rect(
                0,
                0, 
                props.pagingIndicatorSize.value, 
                props.pagingIndicatorSize.value
            ),
            props.pagingIndicatorSize.value/2, 
            props.pagingIndicatorSize.value/2
        )
    })

    const animstyle = useAnimatedStyle(()=>({
        height:props.pagingIndicatorSize.value,
        width:props.pagingIndicatorSize.value
    }))


    return{
        innerC,
        outerC,
        animstyle
    }
}