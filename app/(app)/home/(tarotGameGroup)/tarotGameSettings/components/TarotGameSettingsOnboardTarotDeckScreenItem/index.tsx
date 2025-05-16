import { View } from "react-native";
import Animated from "react-native-reanimated";
import { 
    GestureDetector
} from "react-native-gesture-handler";
import { Image } from "expo-image";

import { TarotGameSettingsOnboardScreenSelectedItemIcon } from "../TarotGameSettingsOnboardScreenSelectedItemIcon";
import { TarotGameSettingsOnboardTarotDeckScreenItemPaginationIndicator } from "../TarotGameSettingsOnboardTarotDeckScreenItemPaginationIndicator";
import { TarotGameSettingsOnboardTarotDeckScreenItemPaginationIndicatorDots } from "../TarotGameSettingsOnboardTarotDeckScreenItemPaginationIndicatorDots";

import { useTarotGameSettingsOnboardTarotDeckScreenItemHook } from "./hook";
import { TTarotGameSettingsOnboardTarotDeckScreenItemProps } from "./type";
import { TarotGameSettingsOnboardScreenItemStyle } from "./style";
import { Suspense } from "react";

export const  TarotGameSettingsOnboardTarotDeckScreenItem = (props:TTarotGameSettingsOnboardTarotDeckScreenItemProps)=>{

    const {
        item,
        itemImageViewportSizes,
        itemSize,
        screenName
    } = props

    const {
        animStyle,
        translateAnim,
        isSelected,
        exclusiveGesture,
        itemSelectedIconSize,
        panGesture,
        currentItem,
        pagingIndicatorSize,
        backFaceImageViewportSizeSource,
        randomFrontFaceImageViewportSizeSource
    } = useTarotGameSettingsOnboardTarotDeckScreenItemHook({
        item,
        itemSize,
        screenName,
        itemImageViewportSizes
    });
    

    return(
        <Suspense>
            <Animated.View 
                style={[
                    animStyle,TarotGameSettingsOnboardScreenItemStyle.TarotGameSettingsOnboardScreenItemContainer
                ]}
            >
                <GestureDetector gesture={exclusiveGesture}>
                    <View style={TarotGameSettingsOnboardScreenItemStyle.TarotGameSettingsOnboardScreenItemInnerContainer}>
                        <GestureDetector gesture={panGesture}>
                            <Animated.View
                                style={[translateAnim,TarotGameSettingsOnboardScreenItemStyle.TarotGameSettingsOnboardScreenItemMultiImageContainer]}
                            >
                                <Image
                                    source={backFaceImageViewportSizeSource}
                                    allowDownscaling={false}
                                    placeholder={{blurhash:item.backFace.image.blurhash}}
                                    style={[TarotGameSettingsOnboardScreenItemStyle.TarotGameSettingsOnboardScreenItemImage]}
                                    contentFit='cover'
                                    placeholderContentFit="cover"
                                    transition={{
                                        duration:1000,
                                        timing:'linear'
                                    }}
                                    cachePolicy={'disk'}
                                />
                                <Image
                                    source={randomFrontFaceImageViewportSizeSource}
                                    allowDownscaling={false}
                                    placeholder={{blurhash:item.randomFrontFace.image.blurhash}}
                                    style={[TarotGameSettingsOnboardScreenItemStyle.TarotGameSettingsOnboardScreenItemImage]}
                                    contentFit='cover'
                                    placeholderContentFit="cover"
                                    transition={{
                                        duration:1000,
                                        timing:'linear'
                                    }}
                                    cachePolicy={'disk'}
                                />
                            </Animated.View>
                        </GestureDetector>
                        <TarotGameSettingsOnboardScreenSelectedItemIcon
                            itemSelectedIconSize={itemSelectedIconSize}
                            isSelected={isSelected}
                        />
                        <TarotGameSettingsOnboardTarotDeckScreenItemPaginationIndicator>
                            <TarotGameSettingsOnboardTarotDeckScreenItemPaginationIndicatorDots
                                index={0}
                                currentImageIndex={currentItem}
                                pagingIndicatorSize={pagingIndicatorSize}
                            />
                            <TarotGameSettingsOnboardTarotDeckScreenItemPaginationIndicatorDots
                                index={1}
                                currentImageIndex={currentItem}
                                pagingIndicatorSize={pagingIndicatorSize}
                            />
                        </TarotGameSettingsOnboardTarotDeckScreenItemPaginationIndicator>
                    </View>
                </GestureDetector>
            </Animated.View>
        </Suspense>
    )
}

export default {
    TarotGameSettingsOnboardTarotDeckScreenItem
}