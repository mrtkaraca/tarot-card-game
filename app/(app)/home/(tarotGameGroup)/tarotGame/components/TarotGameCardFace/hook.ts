import { useAnimatedStyle, useDerivedValue } from "react-native-reanimated"

import { TTarotGameCardFaceHookProps } from "./type"

export default undefined

export const useTarotGameCardFaceHook = (props:TTarotGameCardFaceHookProps)=>{

    const cardFaceRotateY = useDerivedValue(()=>{
        return  props.cardRotateY ? props.cardRotateY.value : 0
    })

    const cardFaceAnimatedStyle = useAnimatedStyle(()=>{
        return{
            transform:[
                {rotateY:props.isCardFrontFace ? '180deg' : '0deg'},
                {rotateY:`${cardFaceRotateY.value}deg`}
            ]
        }
    })

    return{
        cardFaceAnimatedStyle
    }
}