import { PixelRatio, StyleSheet } from "react-native"

export default undefined

export const ErrorViewStyle = StyleSheet.create(({
    ErrorViewContainer:{
        height:'100%',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        padding:8/PixelRatio.get(),
        gap:12/PixelRatio.get()
    },
    ErrorViewTitleContainer:{
        
    },
    ErrorViewTitle:{
        fontSize:24/PixelRatio.getFontScale(),
        fontWeight:'500'
    },
    ErrorViewCode:{

    },
    ErrorViewDescriptionContainer:{
        
    },
    ErrorViewDescription:{
        fontSize:16/PixelRatio.getFontScale()
    },
    ErrorViewButtonContainer:{
        
    },
}))
