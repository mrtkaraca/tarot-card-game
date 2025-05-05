import { Gesture } from "react-native-gesture-handler"
import { 
    runOnJS, 
    useAnimatedStyle, 
    useDerivedValue, 
    useSharedValue, 
    withTiming 
} from "react-native-reanimated"

import { TTarotGameSelectionSectionHookProps } from "./type"

export default undefined

export const useTarotGameSelectionSectionHook = (props:TTarotGameSelectionSectionHookProps)=>{

    const {
        isSelected,
        handleOnSelect
    } = props

    const selectionOpacity = useSharedValue(0);

    const boxOpacity = useDerivedValue(()=>{
        return isSelected ? 1 : 0
    })
    
    const panGesture = Gesture.Pan()
    .shouldCancelWhenOutside(true)
    .onBegin(()=>{
        selectionOpacity.value = withTiming(1,{duration:100})
    })
    .onFinalize((e)=>{
        selectionOpacity.value = withTiming(0,{duration:100})
        if(e.state !== 3){
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
            opacity:selectionOpacity.value,
        }
    })

    
    return{
        panGesture,
        boxAnimatedStyle,
        selectionAnimatedStyle
    }
}