import { AnimatedRef, SharedValue } from "react-native-reanimated";

import { TTarotGameSettingsScreens, TTarotGameSettingsTarotDeckScreenData } from "../type";
import { RefObject } from "react";
import { ScrollView } from "react-native-gesture-handler";

export type TTarotGameSettingsOnboardTarotDeckScreenItemProps = {
    scrollRef: AnimatedRef<ScrollView>
    screenName:Extract<TTarotGameSettingsScreens,'tarotDeck'>;
    item:TTarotGameSettingsTarotDeckScreenData ;
    itemSize: Readonly<SharedValue<number>>
    itemImageViewportSizes: Array<{
        width: number;
        height: number;
    }>
}

export type TTarotGameSettingsOnboardTarotDeckScreenItemHookProps = Pick<TTarotGameSettingsOnboardTarotDeckScreenItemProps,
    'scrollRef' |
    'item' |
    'screenName' |
    'itemSize' |
    'itemImageViewportSizes'
>

export default {
    
}