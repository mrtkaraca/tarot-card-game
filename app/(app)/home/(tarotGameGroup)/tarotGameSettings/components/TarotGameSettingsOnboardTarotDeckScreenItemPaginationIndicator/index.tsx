import { View } from "react-native"

import { TarotGameSettingsOnboardTarotDeckScreenItemPaginationIndicatorStyle } from "./style"
import { TTarotGameSettingsOnboardTarotDeckScreenItemPaginationIndicatorProps } from "./type"

export const TarotGameSettingsOnboardTarotDeckScreenItemPaginationIndicator = (props:TTarotGameSettingsOnboardTarotDeckScreenItemPaginationIndicatorProps)=>{

    return(
        <View style={TarotGameSettingsOnboardTarotDeckScreenItemPaginationIndicatorStyle.TarotGameSettingsOnboardScreenItemPaginationIndicatorContainer}>
            <View style={TarotGameSettingsOnboardTarotDeckScreenItemPaginationIndicatorStyle.TarotGameSettingsOnboardScreenItemPaginationIndicatorInnerContainer}>
                {props.children}
            </View>
        </View>
    )
}