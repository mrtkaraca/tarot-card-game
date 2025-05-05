import { SharedValue } from "react-native-reanimated";
import { TTarotGameSettingsScreens, TTarotGameSettingsScreensDefaultData } from "../../type";

export type TTarotGameSettingsOnboardDefaultScreenItemProps = {
    screenName:Exclude<TTarotGameSettingsScreens,'tarotDeck'>;
    item:TTarotGameSettingsScreensDefaultData;
    itemSize: Readonly<SharedValue<number>>;
    itemImageViewportSizes: Array<{
        width: number;
        height: number;
    }>
    itemSizePercent: Readonly<SharedValue<number>>
}

export type TTarotGameSettingsOnboardDefaultScreenItemHookProps = Pick<TTarotGameSettingsOnboardDefaultScreenItemProps,
    'item' |
    'screenName' |
    'itemSize' |
    'itemSizePercent'
>