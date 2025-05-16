import { DerivedValue, MeasuredDimensions, SharedValue } from "react-native-reanimated";

export type TTarotGameCursorData = {
    id:string;
    name:string;
    image:{
        url:string,
        blurhash:string,
        ext:string
    }
}

export type TTarotCursorPhases = 
    "selectingCart" | 
    "moveToSelectedCart" | 
    "moveToTopDeck" | 
    "moveToBottomDeck" |
    null

export type TTarotCursorDirection = "left" | "right"

export type TTarotGameCursorProps = {
    cursorData: TTarotGameCursorData;
    cursorMeasure: SharedValue<MeasuredDimensions | null>
    cursorDimensions: DerivedValue<{
        heigth: number;
        width: number;
    } | null>
    cursorMaximumRight: DerivedValue<number | null>
    cursorPreviousMaximumRight: DerivedValue<number | null>
    cardsMinimumLeft: DerivedValue<number | null>
    cardsPreviousMinimumLeft: DerivedValue<number | null>
    spaceBetweenCards: DerivedValue<number | null>
    cursorCenterToDeckBottomSidePage: DerivedValue<{
        pageX: number;
        pageY: number;
    } | null>
    topDeckSelectedCardPage: DerivedValue<{
        x: number;
        y: number;
    } | null>
    bottomDeckSelectedCardPage: DerivedValue<{
        x: number;
        y: number;
    } | null>
    bottomDeckFrontFacesIndexLength: DerivedValue<number | null>
    bottomDeckPreviousFrontFacesIndexLength: DerivedValue<number | null>
    
}

export type TTarotGameCursorRefProps = {
    handleMoveCursorToTopkAndBackToBottomDeck: (
        animationDuration:number,
        callback:(()=>void) | undefined
    ) => void
    handleDrawCart: (
        callback: (cursorStoppedIndex: number) => void
    ) => void
    handleStartCursorAnimation: () => void
    handleStopCursorAnimation: () => void
    getCursorCurrentIndex: () => number
    getCurrenCursorPhase: () => TTarotCursorPhases
}

export type TTarotGameCursorHookProps = Pick<TTarotGameCursorProps,
    'cursorDimensions' |
    'cardsMinimumLeft' |
    'cardsPreviousMinimumLeft' |
    'spaceBetweenCards' |
    'cursorMeasure' |
    'cursorCenterToDeckBottomSidePage' |
    'bottomDeckSelectedCardPage' |
    'topDeckSelectedCardPage' |
    'cursorMaximumRight' |
    'cursorPreviousMaximumRight' |
    'bottomDeckFrontFacesIndexLength' |
    'bottomDeckPreviousFrontFacesIndexLength'
>

export default {
    
}