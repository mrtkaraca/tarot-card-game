import { PixelRatio, StyleSheet } from "react-native"

export const TarotGameSettingsScreenItemModalContainerStyle = StyleSheet.create({
    TarotGameSettingsScreenItemModalContainer:{
        top:0,
        left:0,
        right:0,
        bottom:0,
        position:'absolute',
        backgroundColor:'#000000cc',
    },
    TarotGameSettingsScreenItemModalInnerContainer:{
        height:'100%',
        width:'100%'
    },
    TarotGameSettingsScreenItemModalHeaderContainer:{
        flexDirection:'row',
        alignSelf:'flex-end'
    },
    TarotGameSettingsScreenItemModalItemContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    TarotGameSettingsScreenItemModalItemInnerContainer:{
        flex:.75,
    },
    TarotGameSettingsScreenItemModalItemInnerContaierTextContainer:{
        justifyContent:'center',
        padding:24
    },
    TarotGameSettingsScreenItemModalItemInnerContaierText:{
        color:'white',
        fontSize:16/PixelRatio.getFontScale(),
        fontWeight:'500',
        textAlign:'center'
    }
})