import { Gesture } from "react-native-gesture-handler"
import { 
    runOnJS, 
    useAnimatedStyle, 
    useDerivedValue, 
    useSharedValue, 
    withTiming 
} from "react-native-reanimated"

import { TTarotGameSelectionSectionHookProps } from "./type"

export const useTarotGameSelectionSectionHook = (props:TTarotGameSelectionSectionHookProps)=>{

    const {
        isSelected,
        handleOnSelect
    } = props

    const isActive = useSharedValue(false)

    const boxOpacity = useDerivedValue(()=>{
        return isSelected ? 1 : 0
    })
    
    const tapGesture = Gesture.Tap()
    .shouldCancelWhenOutside(true)
    .onBegin(()=>{
        isActive.value = true
    })
    .onFinalize((e)=>{
        isActive.value = false
        if(e.state !== 1 && e.state !== 3 ){
            runOnJS(handleOnSelect)()
        }
    })

    const boxAnimatedStyle = useAnimatedStyle(()=>{
        return{
            opacity:boxOpacity.value
        }
    })

    const selectionAnimatedStyle = useAnimatedStyle(()=>{
        return{
            opacity:withTiming(
                isActive.value ? 1 : 0,
                {
                    duration:100
                }
            ),
        }
    })

    
    return{
        tapGesture,
        boxAnimatedStyle,
        selectionAnimatedStyle
    }
}

export default {
    useTarotGameSelectionSectionHook
}