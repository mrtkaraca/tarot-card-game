import { lazy, memo, Suspense } from "react";
import { View, ScrollView } from "react-native";

import { TarotGameSettingsOnboardTarotDeckScreenItem } from "../TarotGameSettingsOnboardTarotDeckScreenItem";

import { TTarotGameSettingsOnboarTarotDeckScreenItemContainerProps } from "./type";
import { useTarotGameSettingsOnboardScreenItemContainerHook } from "./hook";
import { TarotGameSettingsOnboardScreenItemContainerStyle } from "./style";

const LazyTarotGameSettingsOnboardTarotDeckScreenItem= lazy(()=>import('../TarotGameSettingsOnboardTarotDeckScreenItem').then((module)=>({default:module.TarotGameSettingsOnboardTarotDeckScreenItem})))

export const TarotGameSettingsOnboardTarotDeckScreenItemContainer = memo((props:TTarotGameSettingsOnboarTarotDeckScreenItemContainerProps)=>{

    const {
        itemGap,
        itemSize,
        itemSizePercent,
        itemImageViewportSizes,
    } = useTarotGameSettingsOnboardScreenItemContainerHook({
        onboardScreenDimensions:props.onboardScreenDimensions,
        screenName:props.screenName
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
                            itemSizePercent={itemSizePercent}
                            screenName={props.screenName}
                        />
                    )
                })}
            </ScrollView>
        </View>
    )
})
