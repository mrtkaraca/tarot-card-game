import { PixelRatio, StyleSheet } from "react-native"

import { StatusBarHeight } from "@/constants/size"

export const TarotGameSettingsHeaderStyle = StyleSheet.create({
    TarotGameSettingsHeaderContainer:{
        flexDirection:'row',
        paddingTop:StatusBarHeight,
        padding:8,
        justifyContent:'space-between',
    },
    TarotGameSettingsHeaderLeftButtonContainer:{
        maxWidth:'33%',
        flexDirection:'row',
    },
    TarotGameSettingsHeaderTextContainer:{
        flexShrink:1,
        justifyContent:'center',
    },
    TarotGameSettingsHeaderTextLabel:{
        textAlign:'center',
        fontSize:24/PixelRatio.getFontScale(),
        fontWeight:'500'
    },
    TarotGameSettingsHeaderRightButtonContainer:{
        maxWidth:'33%',
        flexDirection:'row',
        justifyContent:'flex-end',
    }
})