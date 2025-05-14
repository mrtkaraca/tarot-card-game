import { ErrorViewSizes } from "@/constants/size"
import { PixelRatio, StyleSheet } from "react-native"

export const ErrorViewStyle = StyleSheet.create(({
    ErrorViewContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:8/PixelRatio.get(),
        gap:12/PixelRatio.get()
    },
    ErrorViewTitleContainer:{
        
    },
    ErrorViewTitle:{
        fontSize:ErrorViewSizes.errowViewTitleFontSize,
        fontWeight:'500'
    },
    ErrorViewCode:{

    },
    ErrorViewDescriptionContainer:{
        
    },
    ErrorViewDescription:{
        fontSize:ErrorViewSizes.errorViewDescriptionFontSize
    },
    ErrorViewButtonContainer:{
        
    },
}))

export default {
    ErrorViewStyle
}