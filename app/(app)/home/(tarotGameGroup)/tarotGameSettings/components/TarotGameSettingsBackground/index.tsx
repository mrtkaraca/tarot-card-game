import { View } from "react-native"

import { TarotGameSettingsBackgroundStyle } from "./style"
import { TTarotGameSettingsBackgroundProps } from "./type"

export const TarotGameSettingsBackground = (props:TTarotGameSettingsBackgroundProps) =>{
    return(
        <View
            style={TarotGameSettingsBackgroundStyle.TarotGameSettingsBackgroundContainer}
        >
            {props.children}
        </View>
    )
}

export default {
    TarotGameSettingsBackground
}