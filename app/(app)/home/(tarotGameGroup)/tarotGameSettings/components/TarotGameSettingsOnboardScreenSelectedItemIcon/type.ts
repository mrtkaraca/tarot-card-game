import { SharedValue } from "react-native-reanimated"

export type TTarotGameSettingsOnboardTarotDeckScreenSelectedItemProps = {
    isSelected: boolean
    itemSelectedIconSize:Readonly<SharedValue<number>>
}

export type TTarotGameSettingsOnboardScreenSelectedItemIconHookProps = Pick<TTarotGameSettingsOnboardTarotDeckScreenSelectedItemProps,
    'itemSelectedIconSize'
>