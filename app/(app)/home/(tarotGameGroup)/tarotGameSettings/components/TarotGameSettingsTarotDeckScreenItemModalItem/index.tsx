import { 
    Image,
} from "expo-image"

import Animated  from "react-native-reanimated"
import { useTarotGameSettingsTarotDeckScreenItemModalItemHook } from "./hook"
import { TarotGameSettingsTarotDeckScreenItemModalItemStyle } from "./style"
import { TTarotGameSettingsTarotDeckScreenItemModalItemProps } from "./type"

const staticServerUrl = process.env.EXPO_PUBLIC_STATIC_SERVER_URL

export const TarotGameSettingsTarotDeckScreenItemModalItem = (props:TTarotGameSettingsTarotDeckScreenItemModalItemProps)=>{
  

    const {
        data
    } = props

    const {
        containerAnimatedStyle,
    } = useTarotGameSettingsTarotDeckScreenItemModalItemHook({
        isFrontFace:props.isFrontFace,
        rotateX:props.rotateX,
        rotateY:props.rotateY
    })

    const imageUrl = staticServerUrl + data.image.url

    return(
        <Animated.View
            style={[
                TarotGameSettingsTarotDeckScreenItemModalItemStyle.TarotGameSettingsTarotDeckScreenItemModalItemContainer,
                containerAnimatedStyle
            ]} 
        >
            <Image
                cachePolicy={'disk'}
                style={[
                    TarotGameSettingsTarotDeckScreenItemModalItemStyle.TarotGameSettingsTarotDeckScreenItemModalItemImageContainer,
                ]} 
                source={imageUrl}
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

export default {
    TarotGameSettingsTarotDeckScreenItemModalItem
}
