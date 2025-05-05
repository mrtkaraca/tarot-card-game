import { SharedValue } from "react-native-reanimated";
import { TTarotGameSettingsOnboardScreensContainerProps } from "../TarotGameSettingsOnboardScreensContainer/type";

export type TTarotGameSettingsFooterProps = {
    onboardScreensPagination: SharedValue<{
        pre: null | number;
        curr: number;
    }>;
}

export type TTarotGameSettingsFooterHookProps = Pick<TTarotGameSettingsFooterProps,
    'onboardScreensPagination'
>