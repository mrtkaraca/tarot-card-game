import { useSharedValue } from "react-native-reanimated";


export const useTarotGameSettingsHook = ()=>{

    const onboardScreensPagination = useSharedValue<{
        pre:null | number;
        curr:number
    }>({
        pre:null,
        curr:0
    })

    return {
        onboardScreensPagination
    }
}