import { View } from "react-native";
import Animated from "react-native-reanimated";
import { 
    GestureDetector 
} from "react-native-gesture-handler";
import {
    Image, 
    ImageSource 
} from "expo-image";

import { TarotGameSettingsOnboardScreenSelectedItemIcon } from "../TarotGameSettingsOnboardScreenSelectedItemIcon";

import { useTarotGameSettingsOnboardDefaultScreenItemHook } from "./hook";
import { TarotGameSettingsOnboardScreenItemStyle } from "./style";
import { TTarotGameSettingsOnboardDefaultScreenItemProps } from "./type";
import { Suspense } from "react";


export const  TarotGameSettingsOnboardDefaultScreenItem = (props:TTarotGameSettingsOnboardDefaultScreenItemProps)=>{

    const {
        item,
        itemSize,
        screenName,
        itemImageViewportSizes
    } = props

    const {
        animStyle,
        isSelected,
        exclusiveGesture,
        itemSelectedIconSize,
        itemImageViewportSizeSource
    } = useTarotGameSettingsOnboardDefaultScreenItemHook({
        item,
        itemSize,
        screenName,
        itemImageViewportSizes
    });


    return(
        <Animated.View 
            style={[
                animStyle,TarotGameSettingsOnboardScreenItemStyle.TarotGameSettingsOnboardScreenItemContainer
            ]}
        >   
            <GestureDetector gesture={exclusiveGesture}>
                <View style={TarotGameSettingsOnboardScreenItemStyle.TarotGameSettingsOnboardScreenItemInnerContainer}>
                    <Suspense
                        fallback={
                            <Image
                                placeholder={{
                                    blurhash:item.image.blurhash
                                }}
                            />
                        }
                    >
                        <Image
                            source={itemImageViewportSizeSource}
                            allowDownscaling={false}
                            style={TarotGameSettingsOnboardScreenItemStyle.TarotGameSettingsOnboardScreenItemImage}
                            placeholder={{
                                blurhash:item.image.blurhash
                            }}
                            contentFit='cover'
                            transition={{
                                duration:1000,
                                timing:'linear'
                            }}
                            cachePolicy={'disk'}
                        />
                    </Suspense>
                    <TarotGameSettingsOnboardScreenSelectedItemIcon
                        isSelected={isSelected}
                        itemSelectedIconSize={itemSelectedIconSize}
                    />
                </View>
            </GestureDetector>
        </Animated.View>
    )
}

export default {
    TarotGameSettingsOnboardDefaultScreenItem
}