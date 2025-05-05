import { View } from "react-native"
import { Image, ImageBackground } from 'expo-image'

import { TTarotGameBackgroundProps } from "./type"
import { TarotGameBackgroundStyle } from "./style"
import { useTarotGameBackgroundHook } from "./hook"

export default undefined

export const TarotGameBackground = (props:TTarotGameBackgroundProps)=>{

    const {
        tarotBackgroundData
    } = useTarotGameBackgroundHook({})

    return(
        <View
            style={TarotGameBackgroundStyle.TarotGameBackgroundContainer}
        >
            <ImageBackground
                source={tarotBackgroundData && tarotBackgroundData.image.url}
                allowDownscaling={false}
                style={{
                    position:'absolute',
                    height:'100%',
                    width:'100%',
                }}
                contentFit='cover'
            >
                {props.children}
            </ImageBackground>
        </View>
    )
}