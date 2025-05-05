import { Image } from "expo-image"
import Animated from "react-native-reanimated"

import { TTarotGameCardFaceProps } from "./type"
import { TarotGameCardFaceStyle } from "./style"
import { useTarotGameCardFaceHook } from "./hook"

export default undefined

export const TarotGameCardFace = (props:TTarotGameCardFaceProps)=>{

    const {
        cardFace,
        isCardFrontFace,
        cardRotateY
    } = props
    

    const {
        cardFaceAnimatedStyle
    } = useTarotGameCardFaceHook({
        isCardFrontFace,
        cardRotateY
    })

    return(
        <Animated.View
            style={[
                TarotGameCardFaceStyle.TarotGameCardFaceContainer,
                cardFaceAnimatedStyle
            ]}
        >
            <Image
                source={cardFace.image.url}
                allowDownscaling={false}
                contentFit="cover"
                style={TarotGameCardFaceStyle.TarotGameCardFaceImage}
            />
        </Animated.View>
    )
}