import { memo, useRef } from "react";
import { View } from "react-native";

import { GestureDetector, ScrollView } from "react-native-gesture-handler";

import { TarotGameSettingsOnboardTarotDeckScreenItem } from "../TarotGameSettingsOnboardTarotDeckScreenItem";

import { TTarotGameSettingsOnboarTarotDeckScreenItemContainerProps } from "./type";
import { useTarotGameSettingsOnboardScreenItemContainerHook } from "./hook";
import { TarotGameSettingsOnboardScreenItemContainerStyle } from "./style";
import { useAnimatedRef } from "react-native-reanimated";


export const TarotGameSettingsOnboardTarotDeckScreenItemContainer = memo((props:TTarotGameSettingsOnboarTarotDeckScreenItemContainerProps)=>{

    const {
        onboardScreenDimensions,
        screenName
    } = props

    const {
        scrollRef,
        itemGap,
        itemSize,
        itemImageViewportSizes,
    } = useTarotGameSettingsOnboardScreenItemContainerHook({
        onboardScreenDimensions,
        screenName
    });

    return(
        <View
            style={
                TarotGameSettingsOnboardScreenItemContainerStyle.TarotGameSettingsOnboardScreenItemContainerContainer
            }   
        >
            <ScrollView
                ref={scrollRef}
                showsVerticalScrollIndicator={false}
                overScrollMode='never'
                contentContainerStyle={[
                    TarotGameSettingsOnboardScreenItemContainerStyle.TarotGameSettingsOnboardScreenItemContainerContentContainerStyle,
                    {
                        gap:itemGap
                    }
                ]}
            >
                {props.data.map((item,index)=>{
                    return (
                        <TarotGameSettingsOnboardTarotDeckScreenItem
                            key={index}
                            scrollRef={scrollRef}
                            item={item}
                            itemSize={itemSize}
                            itemImageViewportSizes={itemImageViewportSizes}
                            screenName={screenName}
                        />
                    )
                })}
            </ScrollView>
        </View>
    )
})

export default {
    TarotGameSettingsOnboardTarotDeckScreenItemContainer
}
