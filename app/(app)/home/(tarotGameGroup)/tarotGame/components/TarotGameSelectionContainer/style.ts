import { 
    PixelRatio, 
    StyleSheet 
} from "react-native"

import { TarotGameSizes } from "@/constants/size"

export default {}

export const TarotGameSelectionContainerStyle = StyleSheet.create({
    TarotGameSelectionContainerContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    TarotGameSelectionContainerTextHeaderContainer:{
        padding:8/PixelRatio.get()
    },
    TarotGameSelectionContainerTextHeader:{
        textAlign:'center',
        fontSize:TarotGameSizes.TarotGameSelectionContainer.textHeaderFontSize,
        fontWeight:'500'
    }
})