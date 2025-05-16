import { useTranslation } from "react-i18next";
import { useSharedValue } from "react-native-reanimated";


export const useTarotGameSettingsHook = ()=>{

    const {
        t
    } = useTranslation()

    const onboardScreensPagination = useSharedValue<{
        pre:null | number;
        curr:number
    }>({
        pre:null,
        curr:0
    })

    return {
        t,
        onboardScreensPagination
    }
}

export default {
    useTarotGameSettingsHook
}