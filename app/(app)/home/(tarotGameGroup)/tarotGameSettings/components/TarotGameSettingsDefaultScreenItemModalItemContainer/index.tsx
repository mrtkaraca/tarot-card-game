import { Image } from "expo-image"

import { TTarotGameSettingsDefaultScreenItemModalItemContainerProps } from "./type"
import { TarotGameSettingsDefaultScreenItemModalStyle } from "./style"


export const TarotGameSettingsDefaultScreenItemModalItemContainer = (props:TTarotGameSettingsDefaultScreenItemModalItemContainerProps)=>{
    
    return(
        <Image
            allowDownscaling={false}
            source={props.data.image.url}
            placeholder={{blurhash:props.data.image.blurhash}}
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