import { 
    StyleSheet,
    PixelRatio 
} from "react-native";

import { TextButtonSizes } from "@/constants/size";
import { TextButtonColors } from "@/constants/color";

export const TextButtonStyle = StyleSheet.create({
    TextButtonStyleContainer:{
        alignSelf:'center',
        alignItems:'center',
    },
    TextButtonStyleInnerContainer:{
        justifyContent:'center',
        alignItems:'center',
        overflow:'hidden',
    },
    TextButtonStyleInnerContainerDefaultText:{
        color:TextButtonColors.textButtonInnerContainerDefaultTextStyle.color,
        textAlign:'center',
        alignSelf:'center',
        fontSize:TextButtonSizes.textButtonInnerContainerDefaultTextStyle.fontSize,
        paddingHorizontal:24/PixelRatio.get(),
        paddingVertical:16/PixelRatio.get()
    },
    TextButtonStyleInnerContainerOpacity:{
        top:0,
        left:0,
        right:0,
        bottom:0,
        position:'absolute',
        zIndex:-1
    }

})
