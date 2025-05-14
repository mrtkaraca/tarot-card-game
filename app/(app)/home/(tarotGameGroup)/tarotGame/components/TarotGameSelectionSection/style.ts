import { TarotGameColors } from "@/constants/color"
import { TarotGameSizes } from "@/constants/size"
import { PixelRatio, StyleSheet } from "react-native"

export default undefined


export const TarotGameSelectionSectionStyle = StyleSheet.create({
    TarotGameSelectionSectionContainer:{
        
    },
    TarotGameSelectionSectionInnerContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        gap:24/PixelRatio.get(),
        padding:16/PixelRatio.get()
    },
    TarotGameSelectionSectionTextContainer:{
        flexShrink:1
    },
    TarotGameSelectionSectionText:{
        fontSize:TarotGameSizes.TarotGameSelectionSection.textFontSize,
    },
    TarotGameSelectionSectionBoxContainer:{
        width: TarotGameSizes.TarotGameSelectionSection.tarotGameSelectionSectionBoxContainer.width,
        height: TarotGameSizes.TarotGameSelectionSection.tarotGameSelectionSectionBoxContainer.height,
        borderRadius: 4,
        borderWidth: 1,
        justifyContent:'center',
        alignItems:'center',
        borderColor: TarotGameColors.TarotGameSelectionSection.tarotGameSelectionSectionBoxContainer.borderColor,
    },
    TarotGameSelectionSectionBox:{
        width: TarotGameSizes.TarotGameSelectionSection.TarotGameSelectionSectionBox.width,
        height: TarotGameSizes.TarotGameSelectionSection.TarotGameSelectionSectionBox.height,
        borderRadius: 2,
        backgroundColor: TarotGameColors.TarotGameSelectionSection.tarotGameSelectionSectionBox.backgroundColor,
    },
    TarotGameSelectionSectionOpacityContainer:{
        position:'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0,
        zIndex:1
    }
}) 