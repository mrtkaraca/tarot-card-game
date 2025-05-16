import { 
    useSharedValue, 
    useDerivedValue, 
    useAnimatedStyle, 
    useAnimatedReaction,
} from "react-native-reanimated"

import { TTarotGameSettingsTarotDeckScreenItemModalItemHookProps } from "./type"

export const useTarotGameSettingsTarotDeckScreenItemModalItemHook = (props:TTarotGameSettingsTarotDeckScreenItemModalItemHookProps)=>{

    const rotateX = useSharedValue(0)
    const rotateY = useSharedValue(0)

    const rotateXDegree = useDerivedValue(()=>{
        return props.isFrontFace ? `${rotateX.value}deg` : `${-rotateX.value}deg`
    })

    const rotateYDegree = useDerivedValue(()=>{
        return `${rotateY.value}deg`

    })

    const containerAnimatedStyle = useAnimatedStyle(()=>{
        return{
            transform:[
                {rotateY:props.isFrontFace ? '180deg' : '0deg'},
                {rotateX:rotateXDegree.value},
                {rotateY:rotateYDegree.value},
            ]
        }
    })


    useAnimatedReaction(
        ()=>[props.rotateX?.value,props.rotateY?.value],
        ()=>{
            if(props.rotateX?.value){
                rotateX.value += props.rotateX.value
            }
            if(props.rotateY?.value){
                rotateY.value += (Math.abs(rotateX.value) > 90 && Math.abs(rotateX.value) < 270) ?
                    -props.rotateY.value
                    :
                    props.rotateY.value
            }
            
        }
    )



    return{
        containerAnimatedStyle
    }
}

export default {
    useTarotGameSettingsTarotDeckScreenItemModalItemHook
}
