import { DataLoadingColors } from "@/constants/color";
import { DataLoadingSizes } from "@/constants/size";
import { 
    PixelRatio, 
    StyleSheet 
} from "react-native";

export const DataLoadingStyle = StyleSheet.create({
    DataLoadingContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    DataLoadingInnerContainer:{
        width:'75%',
        borderWidth:1,
        borderColor:DataLoadingColors.dataLoadingInnerContainerBorderColor,
        borderRadius:8/PixelRatio.get(),
        padding:16/PixelRatio.get(),
        gap:12/PixelRatio.get()
    },
    DataLoadingTitleContainer:{

    },
    DataLoadingTitleContainerText:{
        fontWeight:'500',
        fontSize:DataLoadingSizes.dataLoadingTitleTextFontSize
    },
    DataLoadingProgressContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    DataLoadingProgressBarContainer:{
        flex:.9,
        borderRadius:9999,
        borderBlockColor:DataLoadingColors.dataLoadingProgressBarContainerBorderColor,
        borderWidth:1,
        marginRight:8/PixelRatio.get(),
        overflow:'hidden'
    },
    DataLoadingProgressBarCanvasContainer:{
        flex:1
    },
    DataLoadingProgressBarPercentContainer:{
        flex:.1
    },
    DataLoadingProgressBarPercent:{
        fontSize:DataLoadingSizes.dataLoadingProgressBarPercentTextFontsize,
        textAlign:'center'
    },
    DataLoadingCurrentItemContainer:{

    },
    DataLoadingCurrentItemText:{
        fontWeight:'500',
        fontSize:DataLoadingSizes.dataLoadingCurrentItemTextFontSize
    }


})