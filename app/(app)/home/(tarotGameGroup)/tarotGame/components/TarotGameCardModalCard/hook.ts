import { useCallback, useLayoutEffect } from "react"
import { TarotGameCardModalCardHookProps } from "./type"
import { measure, runOnUI, useAnimatedReaction, useAnimatedRef, useAnimatedStyle, useDerivedValue, useSharedValue } from "react-native-reanimated"



export default undefined

export const useTarotGameCardModalCardHook = (props:TarotGameCardModalCardHookProps)=>{

    const {
        isFrontFace,
        rotateX:rX,
        rotateY:rY
    } = props

    const imageRef = useAnimatedRef()

    const imageSize = useSharedValue<{
        width:number,
        height:number
    }| null>(null)

    const rotateX = useSharedValue(0)
    const rotateY = useSharedValue(0)

    const rotateXDegree = useDerivedValue(()=>{
        return isFrontFace ? `${rotateX.value}deg` : `${-rotateX.value}deg`
    })

    const rotateYDegree = useDerivedValue(()=>{
        return `${rotateY.value}deg`

    })

    const containerAnimatedStyle = useAnimatedStyle(()=>{
        return{
            borderRadius:imageSize.value ? imageSize.value.width/20 : undefined,
            transform:[
                {rotateY:isFrontFace ? '180deg' : '0deg'},
                {rotateX:rotateXDegree.value},
                {rotateY:rotateYDegree.value},
            ]
        }
    })

    const handleOnLayout = useCallback(()=>{
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

    useAnimatedReaction(
        ()=>[
            rX.value,
            rY.value
        ],
        ()=>{
            rotateX.value += rX.value
            rotateY.value += (Math.abs(rX.value) > 90 && Math.abs(rX.value) < 270) ? (
                -rY.value
            )
            :
            (
                rY.value
            ) 
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
        handleOnLayout
    }
}