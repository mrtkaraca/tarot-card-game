import { PixelRatio, StyleSheet } from "react-native"

export default undefined

export const TarotGameCardModalStyle = StyleSheet.create({
    TarotGameCardModalTextContainer:{
        justifyContent:'center',
        padding:24/PixelRatio.get()
    },
    TarotGameCardModalText:{
        color:'white',
        fontSize:PixelRatio.roundToNearestPixel(12),
        fontWeight:'500',
        textAlign:'center'
    }
})