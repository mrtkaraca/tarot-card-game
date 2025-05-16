import { PixelRatio, StyleSheet } from "react-native"

import { StatusBarHeight } from "@/constants/size"

export const TarotGameHeaderStyle = StyleSheet.create({
    TarotGameHeaderContainer:{
        paddingTop:StatusBarHeight,
    },
    TarotGameHeaderInnerContainer:{
        paddingVertical:8/PixelRatio.get(),
        paddingHorizontal:8/PixelRatio.get(),
        justifyContent:'space-between',
        flexDirection:'row'
    }
})

export default {
    TarotGameHeaderStyle
}