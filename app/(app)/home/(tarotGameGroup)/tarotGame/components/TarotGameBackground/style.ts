import { TarotGameColors } from "@/constants/color"
import { StyleSheet } from "react-native"

export const TarotGameBackgroundStyle = StyleSheet.create({
    TarotGameBackgroundContainer:{
        flex:1,
        backgroundColor:TarotGameColors.tarotGameBackground.backgroundColor
    },
    TarotGameBackground:{
        position:'absolute',
        height:'100%',
        width:'100%',
    }
})

export default {
    TarotGameBackgroundStyle
}