import { StyleSheet } from "react-native"

import { StatusBarHeight } from "@/constants/size"

export default undefined

export const TarotGameHeaderStyle = StyleSheet.create({
    TarotGameHeaderContainer:{
        paddingTop:StatusBarHeight,
    },
    TarotGameHeaderInnerContainer:{
        paddingVertical:8,
        paddingHorizontal:8,
        justifyContent:'space-between',
        flexDirection:'row'
    }
})