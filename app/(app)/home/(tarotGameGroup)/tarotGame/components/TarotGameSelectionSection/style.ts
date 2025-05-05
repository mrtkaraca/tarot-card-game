import { PixelRatio, StyleSheet } from "react-native"

export default undefined


export const TarotGameSelectionSectionStyle = StyleSheet.create({
    TarotGameSelectionSectionContainer:{
        
    },
    TarotGameSelectionSectionInnerContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        gap:24/PixelRatio.get(),
        padding:16/PixelRatio.get()
    },
    TarotGameSelectionSectionTextContainer:{
        justifyContent:'center',
    },
    TarotGameSelectionSectionText:{
        fontSize:16/PixelRatio.getFontScale(),
    },
    TarotGameSelectionSectionBoxContainer:{
        width: Math.round(48 / PixelRatio.get()),
        height: Math.round(48 / PixelRatio.get()),
        borderRadius: 4,
        borderWidth: 1,
        justifyContent:'center',
        alignItems:'center',
        borderColor: 'green',
    },
    TarotGameSelectionSectionBox:{
        width: Math.round(36 / PixelRatio.get()),
        height: Math.round(36 / PixelRatio.get()),
        borderRadius: 2,
        backgroundColor: 'green',
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