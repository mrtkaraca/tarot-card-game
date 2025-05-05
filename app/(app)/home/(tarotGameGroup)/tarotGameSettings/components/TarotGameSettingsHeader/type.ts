import { SharedValue } from "react-native-reanimated";

export type TTarotGameSettingsHeaderProps = {
    textLabel:string;
    onboardScreensPagination: SharedValue<{
        pre: null | number;
        curr: number;
    }>
}

export type TTarotGameSettingsHeaderHookProps = Pick<TTarotGameSettingsHeaderProps,
    'onboardScreensPagination'
>