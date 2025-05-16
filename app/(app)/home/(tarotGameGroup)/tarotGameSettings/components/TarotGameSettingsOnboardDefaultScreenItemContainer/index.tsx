import { lazy, memo, Suspense } from "react";
import { 
    ScrollView, 
    View 
} from "react-native";

import { TarotGameSettingsOnboardDefaultScreenItem } from "../TarotGameSettingsOnboardDefaultScreenItem";

import { useTarotGameSettingsOnboardScreenItemContainerHook } from "./hook";
import { TTarotGameSettingsOnboardDefaultScreenItemContainerProps } from "./type";
import { TarotGameSettingsOnboardScreenItemContainerStyle } from "./style";

export const  TarotGameSettingsOnboardDefaultScreenItemContainer = memo((props:TTarotGameSettingsOnboardDefaultScreenItemContainerProps)=>{


    const {
        screenName,
        onboardScreenDimensions
    } = props

    const {
        itemGap,
        itemSize,
        itemImageViewportSizes,
    } = useTarotGameSettingsOnboardScreenItemContainerHook({
        screenName,
        onboardScreenDimensions,
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
                        gap:itemGap,
                    }
                ]}
            >
                {props.data.map((item,index)=>{
                    return (
                        <TarotGameSettingsOnboardDefaultScreenItem
                            key={index}
                            item={item}
                            itemImageViewportSizes={itemImageViewportSizes}
                            itemSize={itemSize}
                            screenName={screenName}
                        />             
                    )
                })}
            </ScrollView>
        </View>
    )
})
 
export default {
    TarotGameSettingsOnboardDefaultScreenItemContainer
}