import { TarotGameSettingsColors } from "@/constants/color"
import { TarotGameSettingsSize } from "@/constants/size"
import { PixelRatio, StyleSheet } from "react-native"

export const TarotGameSettingsScreenItemModalContainerStyle = StyleSheet.create({
    TarotGameSettingsScreenItemModalContainer:{
        top:0,
        left:0,
        right:0,
        bottom:0,
        position:'absolute',
        backgroundColor:TarotGameSettingsColors.tarotGameSettingsScreenItemModalContainer.backgroundColor
    },
    TarotGameSettingsScreenItemModalInnerContainer:{
        height:'100%',
        width:'100%'
    },
    TarotGameSettingsScreenItemModalHeaderContainer:{
        flexDirection:'row',
        alignSelf:'flex-end'
    },
    TarotGameSettingsScreenItemModalItemContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    TarotGameSettingsScreenItemModalItemInnerContainer:{
        flex:0.75,
    },
    TarotGameSettingsScreenItemModalItemInnerContaierTextContainer:{
        justifyContent:'center',
        padding:24/PixelRatio.get()
    },
    TarotGameSettingsScreenItemModalItemInnerContaierText:{
        color:TarotGameSettingsColors.tarotGameSettingsScreenItemModalContainer.textColor,
        fontSize:TarotGameSettingsSize.tarotGameSettingsScreenItemModalContainer.textFontSize,
        fontWeight:'500',
        textAlign:'center'
    }
})

export default {
    TarotGameSettingsScreenItemModalContainerStyle
}
