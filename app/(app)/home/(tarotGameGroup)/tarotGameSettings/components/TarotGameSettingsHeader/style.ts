import { PixelRatio, StyleSheet } from "react-native"

import { StatusBarHeight, TarotGameSettingsSize } from "@/constants/size"

export const TarotGameSettingsHeaderStyle = StyleSheet.create({
    TarotGameSettingsHeaderContainer:{
        flexDirection:'row',
        paddingTop:StatusBarHeight,
        padding:TarotGameSettingsSize.tarotGameSettingsHeader.headerContainer.padding,
        justifyContent:'space-between',
    },
    TarotGameSettingsHeaderLeftButtonContainer:{
        maxWidth:'33%',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    TarotGameSettingsHeaderTextContainer:{
        flexShrink:1,
        justifyContent:'center',
    },
    TarotGameSettingsHeaderTextLabel:{
        textAlign:'center',
        fontSize:TarotGameSettingsSize.tarotGameSettingsHeader.headerFontSize,
        fontWeight:'500'
    },
    TarotGameSettingsHeaderRightButtonContainer:{
        maxWidth:'33%',
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center'
    }
})