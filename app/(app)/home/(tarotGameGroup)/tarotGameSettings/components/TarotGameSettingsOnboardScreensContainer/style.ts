import { TarotGameSettingsSize } from "@/constants/size"
import { StyleSheet } from "react-native"

export const TarotGameSettingsOnboardScreensContainerStyle = StyleSheet.create({
    TarotGameSettingsOnboardScreensContainerContainer:{
        flex:1,
    },
    TarotGameSettingsOnboardScreensContainerInnerContainer:{
        flex: 1, 
        marginHorizontal:'5%',
        flexDirection:'row'
    },
    TarotGameSettingsOnboardScreensContainerFallbackInnerContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    TarotGameSettingsOnboardScreensContainerFallbackInnerContainerText:{
        fontSize:TarotGameSettingsSize.tarotGameSettingsOnboardScreenContainer.fallBackFontSize
    }
})

export default {
    TarotGameSettingsOnboardScreensContainerStyle
}