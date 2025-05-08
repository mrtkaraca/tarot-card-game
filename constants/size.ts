import  Constants  from "expo-constants";
import { Dimensions, PixelRatio } from "react-native";

export const StatusBarHeight = Constants.statusBarHeight;

export const {height:ScreenHeight,width:ScreenWidth} = Dimensions.get("window");


export const HomeSizes={
    homeTitle:36/PixelRatio.get(),
    startTextButton:{
        borderRadius:9999
    }
}

export const TarotGameSettingsSize = {
    IconButtons:{
        buttonSize:64 / PixelRatio.get(),
    },
    tarotGameSettingsHeader:{
        headerContainer:{
            padding:8/PixelRatio.get()
        },
        headerFontSize:48/PixelRatio.get()
    },
    tarotGameSettingsOnboardScreenContainer:{
        activityIndicator:48/PixelRatio.get(),
        fallBackFontSize:16/PixelRatio.get()
    },
    tarotGameSettingsOnboardScreen:{
        title:16/PixelRatio.getFontScale()
    }
}

export const TarotGameSizes={
    IconButtons:{
        buttonSize:64 / PixelRatio.get(),
    }
}