import { StyleSheet } from "react-native"

import { TarotGameSettingsColors } from "@/constants/color"

export const TarotGameSettingsOnboardScreenItemContainerStyle = StyleSheet.create({
    TarotGameSettingsOnboardScreenItemContainerContainer:{
        flex:1,
        overflow:'hidden',
        backgroundColor:TarotGameSettingsColors.TarotGameSettingsOnboardScreenItemContainer.backgroundColor
    },
    TarotGameSettingsOnboardScreenItemContainerContentContainerStyle:{
        flexDirection:'row',
        flexWrap:'wrap',
    }
})

export default {
    TarotGameSettingsOnboardScreenItemContainerStyle
}