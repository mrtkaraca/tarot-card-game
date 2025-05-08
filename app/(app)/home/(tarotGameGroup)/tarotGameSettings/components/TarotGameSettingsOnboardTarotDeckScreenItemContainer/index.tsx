import { lazy, memo, Suspense } from "react";
import { View, ScrollView } from "react-native";

import { TarotGameSettingsOnboardTarotDeckScreenItem } from "../TarotGameSettingsOnboardTarotDeckScreenItem";

import { TTarotGameSettingsOnboarTarotDeckScreenItemContainerProps } from "./type";
import { useTarotGameSettingsOnboardScreenItemContainerHook } from "./hook";
import { TarotGameSettingsOnboardScreenItemContainerStyle } from "./style";

export const TarotGameSettingsOnboardTarotDeckScreenItemContainer = memo((props:TTarotGameSettingsOnboarTarotDeckScreenItemContainerProps)=>{

    const {
        onboardScreenDimensions,
        screenName
    } = props

    const {
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
