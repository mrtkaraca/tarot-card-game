import { Image } from "expo-image"

import { TTarotGameSettingsDefaultScreenItemModalItemContainerProps } from "./type"
import { TarotGameSettingsDefaultScreenItemModalStyle } from "./style"

const staticServerUrl = process.env.EXPO_PUBLIC_STATIC_SERVER_URL

export const TarotGameSettingsDefaultScreenItemModalItemContainer = (props:TTarotGameSettingsDefaultScreenItemModalItemContainerProps)=>{
    

    const {
        data
    } = props

    const imageUrl = staticServerUrl + data.image.url

    return(
        <Image
            allowDownscaling={false}
            source={imageUrl}
            placeholder={{blurhash:data.image.blurhash}}
            contentFit="cover"
            cachePolicy={'disk'}
            transition={{
                duration:1000,
                timing:'linear'
            }}
            style={TarotGameSettingsDefaultScreenItemModalStyle.TarotGameSettingsDefaultScreenItemModalImage}
        />
    )
}

export default {
    TarotGameSettingsDefaultScreenItemModalItemContainer
}