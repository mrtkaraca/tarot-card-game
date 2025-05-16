import { TarotGameColors } from "@/constants/color"
import { TarotGameSizes } from "@/constants/size"
import { PixelRatio, StyleSheet } from "react-native"

export const TarotGameCardModalStyle = StyleSheet.create({
    TarotGameCardModalContainer:{
        top:0,
        left:0,
        bottom:0,
        right:0,
        position:'absolute',
        backgroundColor:TarotGameColors.tarotGameCardModal.tarotGameCardModalContainerBackgroundColor,
        justifyContent:'center'
    },
    TarotGameCardModalInnerContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    TarotGameCardModalTextContainer:{
        justifyContent:'center',
        padding:24/PixelRatio.get()
    },
    TarotGameCardModalText:{
        color:TarotGameColors.tarotGameCardModal.TarotGameCardModalTextColor,
        fontSize:TarotGameSizes.TarotGameCardModal.tarotGameCardModalTextFontSize,
        fontWeight:'500',
        textAlign:'center'
    }
})

export default {
    TarotGameCardModalStyle
}