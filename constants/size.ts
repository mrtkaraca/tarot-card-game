import  Constants  from "expo-constants";
import { PixelRatio } from "react-native";

export const StatusBarHeight = Constants.statusBarHeight;


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
        fallBackFontSize:24/PixelRatio.get()
    },
    tarotGameSettingsOnboardScreen:{
        title:24/PixelRatio.get()
    },
    tarotGameSettingsScreenItemModalContainer:{
        textFontSize:36/PixelRatio.get()
    }
}

export const TarotGameSizes={
    TarotGameSelectionContainer:{
        textHeaderFontSize:48/PixelRatio.get(),
    },
     TarotGameSelectionSection:{
        textFontSize:36/PixelRatio.get(),
        tarotGameSelectionSectionBoxContainer:{
            width: Math.round(48 / PixelRatio.get()),
            height: Math.round(48 / PixelRatio.get()),
        },
        TarotGameSelectionSectionBox:{
            width: Math.round(36 / PixelRatio.get()),
            height: Math.round(36 / PixelRatio.get()),
        }
    },
    TarotGameDataFetch:{
        FallbackContainerText:{
            fontSize:24/PixelRatio.get()
        }
    },
    TarotGameGameLoading:{
        textFontSize:48/PixelRatio.get(),
        activityIndicator:36/PixelRatio.get()
    },
    TarotGameCardModal:{
        tarotGameCardModalTextFontSize:24/PixelRatio.get()
    },
    IconButtons:{
        buttonSize:64 / PixelRatio.get(),
    }
}

export const DataLoadingSizes={
    dataLoadingTitleTextFontSize:36/PixelRatio.get(),
    dataLoadingProgressBarPercentTextFontsize:24/PixelRatio.get(),
    dataLoadingCurrentItemTextFontSize:24/PixelRatio.get()
}

export const ErrorViewSizes={
    errowViewTitleFontSize:48/PixelRatio.get(),
    errorViewDescriptionFontSize:24/PixelRatio.get()
}

export const TextButtonSizes = {
    textButtonInnerContainerDefaultTextStyle:{
        fontSize:32/PixelRatio.get()
    }
}

export const InformationPopoverButtonSizes={
    IconButton:{
        buttonSize:48/PixelRatio.get()
    }
}