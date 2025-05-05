import { useCallback, useLayoutEffect } from "react"
import { 
    useAnimatedRef, 
    useSharedValue, 
    useDerivedValue, 
    useAnimatedStyle, 
    useAnimatedReaction, 
    runOnUI, 
    measure 
} from "react-native-reanimated"

import { TTarotGameSettingsTarotDeckScreenItemModalItemHookProps } from "./type"

export const useTarotGameSettingsTarotDeckScreenItemModalItemHook = (props:TTarotGameSettingsTarotDeckScreenItemModalItemHookProps)=>{

    const imageRef = useAnimatedRef()

    const imageSize = useSharedValue< {
        width:number,
        height:number
    }| null>(null)

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

    const imageAnimatedStyle = useAnimatedStyle(()=>({
        borderRadius:imageSize.value ? imageSize.value.width/20 : undefined
    }))

    const handleImageOnLayout = useCallback(()=>{
        runOnUI(()=>{
            const imageMes = measure(imageRef)
            console.log(imageMes,'wew')
            if(imageMes){
                imageSize.value = {
                    width:imageMes.width,
                    height:imageMes.height
                }
            }
        })()
    },[])

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

    useLayoutEffect(()=>{
        runOnUI(()=>{
            const imageMes = measure(imageRef)
            if(imageMes){
                imageSize.value = {
                    width:imageMes.width,
                    height:imageMes.height
                }
            }
        })()
    },[])

    return{
        imageRef,
        containerAnimatedStyle,
        imageAnimatedStyle,
        handleImageOnLayout
    }
}