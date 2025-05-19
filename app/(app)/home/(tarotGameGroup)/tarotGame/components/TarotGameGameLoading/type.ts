import { SharedValue } from "react-native-reanimated"

export type TTarotGameGameLoadingProps = {
    isDeckReady: SharedValue<boolean>
}

export type TTarotGameGameLoadingHookProps = Pick<TTarotGameGameLoadingProps,
    'isDeckReady'
>

export default {

}