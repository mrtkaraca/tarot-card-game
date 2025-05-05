import { Fragment } from "react"
import {
    TouchableWithoutFeedback,
    View,
    Text
} from "react-native"
import { Image } from 'expo-image'
import Animated from "react-native-reanimated"

import { TarotGameCardModalCardProps } from "./type"
import { useTarotGameCardModalCardHook } from "./hook"


export default undefined

export const TarotGameCardModalCard = (props:TarotGameCardModalCardProps)=>{
    const {
        isFrontFace,
        data,
        rotateX,
        rotateY
    } = props

    const {
        imageRef,
        containerAnimatedStyle,
        handleOnLayout
    } = useTarotGameCardModalCardHook({
        isFrontFace,
        rotateX,
        rotateY
    })

    return(
        <Animated.View
            ref={imageRef} 
            onLayout={handleOnLayout}
            style={[
                {
                    backfaceVisibility: "hidden",
                    height: "100%",
                    width: "100%",
                    position: "absolute",
                    overflow: "hidden",
                },
                containerAnimatedStyle
            ]} 
        >
            <Image
                cachePolicy={'disk'}
                style={{
                    height: "100%",
                    width: "100%",
                }} 
                source={data.image.url}
                placeholder={{blurhash:data.image.blurhash}}
                allowDownscaling={false}
                transition={{
                    duration:1000,
                    timing:'linear'
                }}
            />
        </Animated.View>

    )
}