import { PixelRatio, StyleSheet } from "react-native";

export const InformationPopOverStyle = StyleSheet.create({
    InformationPopOverContainer:{
        position:'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0,
    },
    InformationPopOverInnerContainer:{
        position:'absolute',
    },
    InformationPopOverArrowContainer:{
        zIndex:1
    },
    InformationPopOverArrowCanvasContainer:{
        flex:1,
    },
    InformationPopOverDescriptionContainer:{
        backgroundColor:'white',
        borderColor:'#d4d4d4',
        borderWidth:2/PixelRatio.get(),
        padding:16/PixelRatio.get(),
        borderRadius:12/PixelRatio.get(),
    }
})