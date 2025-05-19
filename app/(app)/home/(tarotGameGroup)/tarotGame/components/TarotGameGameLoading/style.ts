import { StyleSheet } from "react-native"

import { TarotGameColors } from "@/constants/color"
import { TarotGameSizes } from "@/constants/size"

export const TarotGameGameLoadingStyle = StyleSheet.create({
    TarotGameGameLoadingContainer:{
        top:0,
        left:0,
        right:0,
        bottom:0,
        backgroundColor:TarotGameColors.tarotGameGameLoading.backgroundColor,
        position:'absolute',
        zIndex:1,
    },
    TarotGameGameLoadingInnerContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    TarotGameGameLoadingText:{
        fontSize:TarotGameSizes.TarotGameGameLoading.textFontSize
    }
})

export default {
    
}