import {
    MeasuredDimensions, 
    SharedValue 
} from "react-native-reanimated";

export default undefined

export type TTarotGameCursorGestureProps = {
    children:React.ReactNode;
    cursorGestureMeasure: SharedValue<MeasuredDimensions | null>
    handleTarotGameCursorGesture:()=>void
}

export type TTarotGameCursorGestureHookProps = Pick<TTarotGameCursorGestureProps,
    'cursorGestureMeasure' |
    'handleTarotGameCursorGesture'
>