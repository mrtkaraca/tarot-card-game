import { useTranslation } from "react-i18next"
import { useAnimatedStyle } from "react-native-reanimated"

import { TTarotGameGameLoadingHookProps } from "./type"


export const useTarotGameGameLoadingHook = (props:TTarotGameGameLoadingHookProps)=>{

    const {
        isDeckReady
    } = props

    const {
        t
    } = useTranslation()

    const preparingText = t('tarotGame.tarotGameGameLoading.preparingText')

    const tarotGameGameLoadingAnimatedStyle = useAnimatedStyle(()=>{
        return{
            display:isDeckReady.value === true ? 'none' :'flex',
            // opacity for when screen unmounted
            opacity:isDeckReady.value === true ? 0 : 1
        }
    })

    return{
        preparingText,
        tarotGameGameLoadingAnimatedStyle
    }
}

export default {
    useTarotGameGameLoadingHook
}