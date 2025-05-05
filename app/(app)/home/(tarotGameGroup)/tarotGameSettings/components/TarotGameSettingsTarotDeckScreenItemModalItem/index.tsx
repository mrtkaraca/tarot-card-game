import { 
    Image,
} from "expo-image"

import Animated  from "react-native-reanimated"
import { useTarotGameSettingsTarotDeckScreenItemModalItemHook } from "./hook"
import { TarotGameSettingsTarotDeckScreenItemModalItemStyle } from "./style"
import { TTarotGameSettingsTarotDeckScreenItemModalItemProps } from "./type"

export const TarotGameSettingsTarotDeckScreenItemModalItem = (props:TTarotGameSettingsTarotDeckScreenItemModalItemProps)=>{
  
    const {
        imageRef,
        containerAnimatedStyle,
        imageAnimatedStyle,
        handleImageOnLayout
    } = useTarotGameSettingsTarotDeckScreenItemModalItemHook({
        isFrontFace:props.isFrontFace,
        rotateX:props.rotateX,
        rotateY:props.rotateY
    })

    const AnimatedImage = Animated.createAnimatedComponent(Image)

    return(
        <Animated.View
            style={[
                TarotGameSettingsTarotDeckScreenItemModalItemStyle.TarotGameSettingsTarotDeckScreenItemModalItemContainer,
                containerAnimatedStyle,
                imageAnimatedStyle,
            ]} 
        >
            <AnimatedImage
                ref={imageRef}
                onLayout={handleImageOnLayout}
                cachePolicy={'disk'}
                style={[
                    TarotGameSettingsTarotDeckScreenItemModalItemStyle.TarotGameSettingsTarotDeckScreenItemModalItemImageContainer,
                ]} 
                source={props.data.image.url}
                placeholder={{blurhash:props.data.image.blurhash}}
                allowDownscaling={false}
                transition={{
                    duration:1000,
                    timing:'linear'
                }}
            />
        </Animated.View>
    )
}