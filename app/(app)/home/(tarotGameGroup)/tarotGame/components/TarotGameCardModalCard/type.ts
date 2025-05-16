import { TTarotGameStore } from "@/contexts/tarotGame/type"
import { SharedValue } from "react-native-reanimated"

export type TarotGameCardModalCardProps = ({
    isFrontFace:true
    data:NonNullable<TTarotGameStore['tarotGameCardModalData']['cardData']>['frontFace']
} | {
    isFrontFace:false
    data:NonNullable<TTarotGameStore['tarotGameCardModalData']['cardData']>['backFace']
}) & {
    rotateX: SharedValue<number>
    rotateY: SharedValue<number>
}

export type TarotGameCardModalCardHookProps = Pick<TarotGameCardModalCardProps,
    'isFrontFace' |
    'rotateX' |
    'rotateY'
>

export default {
    
}