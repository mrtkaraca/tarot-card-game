import { 
    useCallback, 
    useLayoutEffect 
} from "react"
import { 
    measure, 
    runOnJS, 
    runOnUI, 
    useAnimatedRef 
} from "react-native-reanimated"
import { Gesture } from "react-native-gesture-handler"

import { TTarotGameCursorGestureHookProps } from "./type"

export const useTarotGameCursorGestureHook = (props:TTarotGameCursorGestureHookProps)=>{

    const {
        cursorGestureMeasure,
        handleTarotGameCursorGesture
    } = props

    const cursorGestureAnimatedRef = useAnimatedRef()

    const handleOnLayout = useCallback(()=>{
        runOnUI(()=>{
            if(cursorGestureAnimatedRef){
                const mes = measure(cursorGestureAnimatedRef)
                if(mes){
                    cursorGestureMeasure.value = mes
                }
            }
        })()
    },[])

    const tapGesture = Gesture.Tap()
    .onEnd(()=>{
        runOnJS(handleTarotGameCursorGesture)()
    })

    useLayoutEffect(()=>{
        handleOnLayout()
    },[])

    return{
        tapGesture,
        cursorGestureAnimatedRef,
        handleOnLayout
    }
}

export default {
    useTarotGameCursorGestureHook
}