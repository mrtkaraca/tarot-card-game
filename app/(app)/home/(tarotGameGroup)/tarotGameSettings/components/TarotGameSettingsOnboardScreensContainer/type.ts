import { SharedValue } from "react-native-reanimated"

import { TTarotGameSettingsScreens } from "../type"

export type  TOnboardScreenData = {
    id:number
    name:Exclude<TTarotGameSettingsScreens,'tarotDeck'>,
    screenTitle:string,
} | {
    id:number
    name:Extract<TTarotGameSettingsScreens,'tarotDeck'>,
    screenTitle:string,
}

export type TOnboardScreensData = Array<TOnboardScreenData>



export type TTarotGameSettingsOnboardScreensContainerProps = {
    onboardScreensPagination: SharedValue<{
        pre: null | number;
        curr: number;
    }>
}

export default {
    
}