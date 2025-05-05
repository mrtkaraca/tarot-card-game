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
        borderColor:'black',
        padding:16/PixelRatio.get(),
        gap:12/PixelRatio.get()
    },
    DataLoadingTitleContainer:{

    },
    DataLoadingTitleContainerText:{
        fontWeight:'500',
        fontSize:24/PixelRatio.getFontScale()
    },
    DataLoadingProgressContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    DataLoadingProgressBarContainer:{
        flex:.9,
        borderRadius:9999,
        borderBlockColor:'black',
        borderWidth:1,
        marginRight:8/PixelRatio.get(),
        overflow:'hidden'
    },
    DataLoadingProgressBarCanvasContainer:{
        flex:1
    },
    DataLoadingProgressBar:{
        flex:1,
        backgroundColor:'blue'
    },
    DataLoadingProgressBarPercentContainer:{
        flex:.1
    },
    DataLoadingProgressBarPercent:{
        fontSize:16/PixelRatio.getFontScale(),
        textAlign:'center'
    },
    DataLoadingCurrentItemContainer:{

    },
    DataLoadingCurrentItemText:{
        fontWeight:'500',
        fontSize:16/PixelRatio.getFontScale()
    }


})