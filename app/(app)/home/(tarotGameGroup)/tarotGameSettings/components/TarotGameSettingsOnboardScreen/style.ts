import { PixelRatio, StyleSheet } from "react-native"

export const TarotGameSettingsOnboardScreenStyle = StyleSheet.create({
    TarotGameSettingsOnboardScreenContainer:{
        position:'absolute',
    },
    TarotGameSettingsOnboardScreenTitleContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical:24/PixelRatio.get()
    },
    TarotGameSettingsOnboardScreenTitleLabel:{
        fontSize:16/PixelRatio.getFontScale(),
        fontWeight:'500'
    }
})