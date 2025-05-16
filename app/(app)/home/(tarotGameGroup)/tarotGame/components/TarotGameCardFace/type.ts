import { SharedValue } from "react-native-reanimated";

export type TTarotGameCardFaceData = {
    id: string;
    name: string;
    image: {
        url: string;
        blurhash: string;
        ext: string;
    };
}

export type TTarotGameCardFaceProps = {
    cardFace:TTarotGameCardFaceData;
    cardRotateY?: SharedValue<number>
    isCardFrontFace: boolean
}

export type TTarotGameCardFaceHookProps = Pick<TTarotGameCardFaceProps,
    'isCardFrontFace' | 
    'cardRotateY'
>

export default {

}