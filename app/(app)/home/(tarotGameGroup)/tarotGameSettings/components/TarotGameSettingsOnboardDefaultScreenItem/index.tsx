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
        animStyle,
        isSelected,
        exclusiveGesture,
        itemSelectedIconSize,
    } = useTarotGameSettingsOnboardDefaultScreenItemHook({
        item:props.item,
        itemSize:props.itemSize,
        itemSizePercent:props.itemSizePercent,
        screenName:props.screenName
    });

  
    const itemImageViewportSizeSource:ImageSource[] = props.itemImageViewportSizes.map((viewPorts)=>{
        const uri = 
            `${props.item.image.url.split(props.item.image.ext)[0]}` +
            `-` + 
            `${viewPorts.width}` + 
            `x` +
            `${viewPorts.height}` + 
            `${props.item.image.ext}`
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
                    <Suspense
                        fallback={
                            <Image
                                placeholder={{
                                    blurhash:props.item.image.blurhash
                                }}
                            />
                        }
                    >
                        <Image
                            source={itemImageViewportSizeSource}
                            allowDownscaling={false}
                            style={TarotGameSettingsOnboardScreenItemStyle.TarotGameSettingsOnboardScreenItemImage}
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