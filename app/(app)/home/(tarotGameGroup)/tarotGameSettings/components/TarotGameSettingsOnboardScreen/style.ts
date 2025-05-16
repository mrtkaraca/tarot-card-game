import { PixelRatio, StyleSheet } from "react-native"

import { TarotGameSettingsSize } from "@/constants/size"

export const TarotGameSettingsOnboardScreenStyle = StyleSheet.create({
    TarotGameSettingsOnboardScreenContainer:{
        position:'absolute',
    },
    TarotGameSettingsOnboardScreenHeaderContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical:24/PixelRatio.get()
    },
    TarotGameSettingsOnboardScreenTitleContainer:{
        flexShrink:1,
    },
    TarotGameSettingsOnboardScreenTitleLabel:{
        fontSize:TarotGameSettingsSize.tarotGameSettingsOnboardScreen.title,
        fontWeight:'500'
    }
})

export default {
    TarotGameSettingsOnboardScreenStyle
}