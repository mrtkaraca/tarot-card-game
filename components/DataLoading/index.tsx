import { Fragment, useEffect } from "react";
import { 
    View,
    Text
} from "react-native";
import Animated, { useAnimatedReaction, useDerivedValue, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import { 
    Canvas,
    Rect, 
    SkSize
} from "@shopify/react-native-skia";

import { useDataLoadingHook } from "./hook";
import { TDataLoadingProps } from "./type";
import { DataLoadingStyle } from "./style";
import { DataLoadingColors } from "@/constants/color";


export const DataLoading = (props:TDataLoadingProps)=>{

    const {
        dataLoadingDataSV
    } = props

    const {
        animatedBarHeight,
        animatedBarWidth,
        dataLoadingContainerRef,
        dataLoadingData,
        animatedBarCanvasLayout,
    } = useDataLoadingHook({
        dataLoadingDataSV
    })

    return(
        <Fragment>
            {dataLoadingData &&
                <View 
                    style={DataLoadingStyle.DataLoadingContainer}
                >
                    <Animated.View
                        ref={dataLoadingContainerRef}
                        style={[
                            DataLoadingStyle.DataLoadingInnerContainer
                        ]}
                    >
                        <View
                            style={DataLoadingStyle.DataLoadingTitleContainer}
                        >
                            <Text
                                numberOfLines={1}
                                style={DataLoadingStyle.DataLoadingTitleContainerText}
                            >
                                {dataLoadingData.dataLoadCurrentDataTitle}
                            </Text>
                        </View>
                        <View
                            style={DataLoadingStyle.DataLoadingProgressContainer}
                        >
                            <View
                                style={DataLoadingStyle.DataLoadingProgressBarContainer}
                            >
                                <Canvas style={DataLoadingStyle.DataLoadingProgressBarCanvasContainer} onSize={animatedBarCanvasLayout}>
                                    <Rect height={animatedBarHeight} width={animatedBarWidth} color={DataLoadingColors.dataLoadingProgressBarCanvasContainerColor} />
                                </Canvas>
                            </View>
                            <View style={DataLoadingStyle.DataLoadingProgressBarPercentContainer} >
                                <Text
                                    numberOfLines={1}
                                    style={DataLoadingStyle.DataLoadingProgressBarPercent}
                                >
                                    {dataLoadingData.dataLoadCurrentProgress}{'%'}
                                </Text>
                            </View>
                        </View>
                        <View
                            style={DataLoadingStyle.DataLoadingCurrentItemContainer}
                        >
                            <Text
                                numberOfLines={1}
                                style={DataLoadingStyle.DataLoadingCurrentItemText}
                            >
                                {dataLoadingData.dataLoadCurrentDataName}
                            </Text>
                        </View>
                    </Animated.View>
                </View>
            }
        </Fragment>
    )
    
}