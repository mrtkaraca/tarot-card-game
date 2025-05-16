import { View } from "react-native"
import { ImageBackground } from 'expo-image'

import { TTarotGameBackgroundProps } from "./type"
import { TarotGameBackgroundStyle } from "./style"
import { useTarotGameBackgroundHook } from "./hook"

export const TarotGameBackground = (props:TTarotGameBackgroundProps)=>{

    const {
        children
    } = props

    const {
        tarotBackgroundData
    } = useTarotGameBackgroundHook({

    })

    return(
        <View
            style={TarotGameBackgroundStyle.TarotGameBackgroundContainer}
        >
            <ImageBackground
                source={tarotBackgroundData && tarotBackgroundData.image.url}
                allowDownscaling={false}
                style={TarotGameBackgroundStyle.TarotGameBackground}
                contentFit='cover'
            >
                {children}
            </ImageBackground>
        </View>
    )
}

export default {
    TarotGameBackground
}