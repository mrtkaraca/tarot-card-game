import { SharedValue } from "react-native-reanimated";
import { TTarotGameSettingsScreens } from "../type";

export type TTarotGameSettingsOnboardScreenProps = {
    index:number;
    children:React.ReactNode;
    screenName:TTarotGameSettingsScreens,
    screenTitle:string;
    onboardScreensPagination: SharedValue<{
        pre: null | number;
        curr: number;
    }>;
    onboardScreenDimensions: SharedValue<{
        heigth: null | number;
        width: null | number;
    }>
}

export type TTarotGameSettingsOnboardScreenHookProps = Pick<TTarotGameSettingsOnboardScreenProps,
    'index' |
    'onboardScreenDimensions' |
    'onboardScreensPagination'
>

export default {
    
}