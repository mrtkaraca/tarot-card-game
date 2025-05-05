import Animated from "react-native-reanimated"
import { 
    GestureDetector
} from "react-native-gesture-handler"

import { TTarotGameCursorGestureProps } from "./type"
import { TarotGameCursorGestureStyle } from "./style"
import { useTarotGameCursorGestureHook } from "./hook"

export default undefined

export const TarotGameCursorGesture = (props:TTarotGameCursorGestureProps)=>{

    const {
        cursorGestureMeasure,
        handleTarotGameCursorGesture,
    } = props

    const {
        tapGesture,
        cursorGestureAnimatedRef,
        handleOnLayout
    } = useTarotGameCursorGestureHook({
        cursorGestureMeasure,
        handleTarotGameCursorGesture
    })

    return(

        <Animated.View
            ref={cursorGestureAnimatedRef}
            onLayout={handleOnLayout}
            style={TarotGameCursorGestureStyle.TarotGameCursorGestureContainer}
        >
            <GestureDetector gesture={tapGesture} >
                {props.children}
            </GestureDetector>
        </Animated.View>
 
    )
}