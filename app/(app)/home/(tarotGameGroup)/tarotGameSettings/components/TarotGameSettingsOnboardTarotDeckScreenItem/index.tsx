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

export const  TarotGameSettingsOnboardTarotDeckScreenItem = (props:TTarotGameSettingsOnboardTarotDeckScreenItemProps)=>{

    const {
        animStyle,
        translateAnim,
        isSelected,
        exclusiveGesture,
        itemSelectedIconSize,
        panGesture,
        currentItem,
        pagingIndicatorSize
    } = useTarotGameSettingsOnboardTarotDeckScreenItemHook({
        item:props.item,
        itemSize:props.itemSize,
        itemSizePercent:props.itemSizePercent,
        screenName:props.screenName,
    });
    

    const randomFrontFaceImageViewportSizeSource = props.itemImageViewportSizes.map((viewPorts)=>{
        const uri = 
            `${props.item.randomFrontFace.image.url.split(props.item.randomFrontFace.image.ext)[0]}` +
            `-` + 
            `${viewPorts.width}` + 
            `x` +
            `${viewPorts.height}` + 
            `${props.item.randomFrontFace.image.ext}`
        ;
        return {
            uri:uri,
            width:viewPorts.width,
            height:viewPorts.height
        }
    })

    const backFaceImageViewportSizeSource = props.itemImageViewportSizes.map((viewPorts)=>{
        const uri = 
            `${props.item.backFace.image.url.split(props.item.backFace.image.ext)[0]}` +
            `-` + 
            `${viewPorts.width}` + 
            `x` +
            `${viewPorts.height}` + 
            `${props.item.backFace.image.ext}`
        ;
        return {
            uri:uri,
            width:viewPorts.width,
            height:viewPorts.height
        }
    })

    return(
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
                                placeholder={{blurhash:props.item.backFace.image.blurhash}}
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
                                placeholder={{blurhash:props.item.randomFrontFace.image.blurhash}}
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
    )
}