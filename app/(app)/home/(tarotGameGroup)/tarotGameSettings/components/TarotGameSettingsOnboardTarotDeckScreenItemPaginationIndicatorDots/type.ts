import { SharedValue } from "react-native-reanimated";

export type TTarotGameSettingsOnboardTarotDeckScreenItemPaginationIndicatorDotsProps = {
    index:number;
    pagingIndicatorSize:Readonly<SharedValue<number>>;
    currentImageIndex:Readonly<SharedValue<number>>
}

export type TTarotGameSettingsOnboardTarotDeckScreenItemPaginationIndicatorDotsHookProps = Pick<TTarotGameSettingsOnboardTarotDeckScreenItemPaginationIndicatorDotsProps,
    'index' | 
    'pagingIndicatorSize' |
    'currentImageIndex'
>

export default {
    
}
