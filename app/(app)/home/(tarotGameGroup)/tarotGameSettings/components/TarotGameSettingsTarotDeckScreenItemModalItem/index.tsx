import { 
    Image,
} from "expo-image"

import Animated  from "react-native-reanimated"
import { useTarotGameSettingsTarotDeckScreenItemModalItemHook } from "./hook"
import { TarotGameSettingsTarotDeckScreenItemModalItemStyle } from "./style"
import { TTarotGameSettingsTarotDeckScreenItemModalItemProps } from "./type"

export const TarotGameSettingsTarotDeckScreenItemModalItem = (props:TTarotGameSettingsTarotDeckScreenItemModalItemProps)=>{
  
    const {
        containerAnimatedStyle,
    } = useTarotGameSettingsTarotDeckScreenItemModalItemHook({
        isFrontFace:props.isFrontFace,
        rotateX:props.rotateX,
        rotateY:props.rotateY
    })

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

export default {
    TarotGameSettingsTarotDeckScreenItemModalItem
}
