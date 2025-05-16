import { Gesture } from "react-native-gesture-handler";
import { 
    runOnJS, 
    useAnimatedStyle, 
    useSharedValue, 
    withTiming 
} from "react-native-reanimated";

import { TTextButtonHookProps } from "./type";

export const useTextButtonHook = (props:TTextButtonHookProps)=>{

    const isButtonActive = useSharedValue(false)

    const buttonOpacityStyle = useAnimatedStyle(()=>{
        return {
            opacity:withTiming(
                isButtonActive.value === true ? 1 : 0,
                {
                    duration:100
                }
            )
        }
    })

    const gesture = Gesture.Pan()
    .enabled(props.isButtonDisabled ? !props.isButtonDisabled : true)
    .shouldCancelWhenOutside(true)
    .onBegin(()=>{
        isButtonActive.value = true
    })
    .onFinalize((e)=>{
        isButtonActive.value = false
        if(e.state !== 3){
            if(props.handleOnPress){
                runOnJS(props.handleOnPress)()
            }
        }
    })

    return {
        gesture,
        buttonOpacityStyle
    }
}