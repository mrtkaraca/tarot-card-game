import { SharedValue } from "react-native-reanimated"

export type TTarotGameSettingsOnboardScreensContainerProps = {
    onboardScreensPagination: SharedValue<{
        pre: null | number;
        curr: number;
    }>
}