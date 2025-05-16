import { StyleSheet } from "react-native"

export const TarotGameSettingsOnboardScreenItemStyle = StyleSheet.create({
    TarotGameSettingsOnboardScreenItemContainer:{
        aspectRatio:1,
        justifyContent:'center',
    },
    TarotGameSettingsOnboardScreenItemInnerContainer:{
        height:'100%',
        width:'100%',
        justifyContent:'center',
        alignSelf:'center',
    },
    TarotGameSettingsOnboardScreenItemMultiImageContainer:{
        height:'100%',
        width:'100%',
        flexDirection:'row',
        overflow:'hidden'
    },
    TarotGameSettingsOnboardScreenItemImage:{
        width:'100%',
        height:'100%'
    }
})

export default {
    TarotGameSettingsOnboardScreenItemStyle
}