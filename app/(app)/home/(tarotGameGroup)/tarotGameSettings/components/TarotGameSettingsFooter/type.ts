import { SharedValue } from "react-native-reanimated";
import { TOnboardScreensData, TTarotGameSettingsOnboardScreensContainerProps } from "../TarotGameSettingsOnboardScreensContainer/type";

export type TTarotGameSettingsFooterProps = {
    onboardScreensData: TOnboardScreensData,
    onboardScreensPagination: SharedValue<{
        pre: null | number;
        curr: number;
    }>;
}

export type TTarotGameSettingsFooterHookProps = Pick<TTarotGameSettingsFooterProps,
    'onboardScreensPagination' |
    'onboardScreensData'
>

export default {
    
}