import { SharedValue } from "react-native-reanimated";
import { TTarotGameSettingsDefaultData, TTarotGameSettingsScreens } from "../type";

export type TTarotGameSettingsOnboardDefaultScreenItemContainerProps = {
    screenName:Exclude<TTarotGameSettingsScreens,'tarotDeck'>;
    data:TTarotGameSettingsDefaultData
    onboardScreenDimensions: SharedValue<{
        heigth: null | number;
        width: null | number;
    }>
}

export type TTarotGameSettingsOnboardScreenItemContainerHookProps = Pick<TTarotGameSettingsOnboardDefaultScreenItemContainerProps,
    'onboardScreenDimensions' |
    'screenName' 
>