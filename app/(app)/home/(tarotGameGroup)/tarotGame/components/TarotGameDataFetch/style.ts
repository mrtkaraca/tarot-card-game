import { TarotGameSizes } from "@/constants/size"
import { PixelRatio, StyleSheet } from "react-native"

export default undefined

export const TTarotGameDataFetcStyle = StyleSheet.create({
    TarotGameDataFetchFallbackContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        gap:12/PixelRatio.get()
    },
    TarotGameDataFetchFallbackContainerText:{
        fontSize:TarotGameSizes.TarotGameDataFetch.FallbackContainerText.fontSize,
        textAlign:'center'
    }
})