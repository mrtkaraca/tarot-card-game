import { SharedValue } from "react-native-reanimated";

import { TTarotGameSettingsScreens, TTarotGameSettingsTarotDeckScreenData } from "../type";

export type TTarotGameSettingsOnboardTarotDeckScreenItemProps = {
    screenName:Extract<TTarotGameSettingsScreens,'tarotDeck'>;
    item:TTarotGameSettingsTarotDeckScreenData ;
    itemSize: Readonly<SharedValue<number>>
    itemImageViewportSizes: Array<{
        width: number;
        height: number;
    }>
}

export type TTarotGameSettingsOnboardTarotDeckScreenItemHookProps = Pick<TTarotGameSettingsOnboardTarotDeckScreenItemProps,
    'item' |
    'screenName' |
    'itemSize' |
    'itemImageViewportSizes'
>