import { 
    PixelRatio, 
    StyleSheet 
} from "react-native"

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
        fontSize:24/PixelRatio.getFontScale(),
        fontWeight:'500'
    }
})