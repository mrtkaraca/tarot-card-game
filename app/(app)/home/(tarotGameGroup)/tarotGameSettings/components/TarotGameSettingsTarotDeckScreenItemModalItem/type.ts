import { SharedValue } from "react-native-reanimated";
import { TTarotGameSettingsTarotDeckScreenItemModalItemContainerProps } from "../TarotGameSettingsTarotDeckScreenItemModalItemContainer/type";

export type TTarotGameSettingsTarotDeckScreenItemModalItemProps = {
    data:TTarotGameSettingsTarotDeckScreenItemModalItemContainerProps['data']['backFace' | 'randomFrontFace']
    isFrontFace:boolean;
    rotateX: SharedValue<number>;
    rotateY: SharedValue<number>;
}

export type TTarotGameSettingsTarotDeckScreenItemModalItemHookProps = Pick<TTarotGameSettingsTarotDeckScreenItemModalItemProps,
    'isFrontFace' |
    'rotateX' |
    'rotateY'
>

export default {
    
}
