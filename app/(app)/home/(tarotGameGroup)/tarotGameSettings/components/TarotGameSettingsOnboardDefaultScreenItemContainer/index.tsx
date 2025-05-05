import { lazy, memo, Suspense } from "react";
import { 
    ScrollView, 
    View 
} from "react-native";

import { TarotGameSettingsOnboardDefaultScreenItem } from "../TarotGameSettingsOnboardDefaultScreenItem";

import { useTarotGameSettingsOnboardScreenItemContainerHook } from "./hook";
import { TTarotGameSettingsOnboardDefaultScreenItemContainerProps } from "./type";
import { TarotGameSettingsOnboardScreenItemContainerStyle } from "./style";

export default undefined

export const  TarotGameSettingsOnboardDefaultScreenItemContainer = memo((props:TTarotGameSettingsOnboardDefaultScreenItemContainerProps)=>{

    const {
        itemGap,
        itemSize,
        itemSizePercent,
        itemImageViewportSizes,
    } = useTarotGameSettingsOnboardScreenItemContainerHook({
        screenName:props.screenName,
        onboardScreenDimensions:props.onboardScreenDimensions,
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
                            itemSizePercent={itemSizePercent}
                            screenName={props.screenName}
                        />           
                    )
                })}
            </ScrollView>
        </View>
    )
})
 