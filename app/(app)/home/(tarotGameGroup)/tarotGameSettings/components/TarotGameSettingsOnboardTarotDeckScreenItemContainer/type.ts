import { SharedValue } from "react-native-reanimated";
import { TTarotGameSettingsScreens, TTarotGameSettingsTarotDeckData } from "../type";

export type TTarotGameSettingsOnboarTarotDeckScreenItemContainerProps = {
    screenName:Extract<TTarotGameSettingsScreens,'tarotDeck'>;
    data:TTarotGameSettingsTarotDeckData
    onboardScreenDimensions: SharedValue<{
        heigth: null | number;
        width: null | number;
    }>
}

export type TTarotGameSettingsOnboardScreenItemContainerHookProps = Pick<TTarotGameSettingsOnboarTarotDeckScreenItemContainerProps,
    'onboardScreenDimensions' |
    'screenName'
>

export default {
    
}