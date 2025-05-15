import { DerivedValue,EasingFunction,EasingFunctionFactory,MeasuredDimensions, SharedValue } from "react-native-reanimated"

import { TTarotGameCardFaceData } from "../TarotGameCardFace/type"
import { TTarotGameCardDrawningNumberLayout, TTarotGameDeck, TTarotGameDeckPhases } from "../TarotGameDeck/type"
import { TTarotGameStore } from "@/contexts/tarotGame/type"

export default undefined

export type TTarotGameCardPhases = 
    'startAnimation' | 
    'drawingCard' | 
    'moveCardToTop' | 
    'reOrdinateCard' |
    'moveToEndLayout' |
    'endAnimation' |
    null

export type TTarotGameCardDeckSideData = {
    deckSide:'topSide' | 'bottomSide'
    index:number
}

export type  TTarotGameCardProps = {
    frontFace: (TTarotGameCardFaceData & TTarotGameCardDeckSideData)
    backFace: TTarotGameCardFaceData
    deck:TTarotGameDeck
    deckIndex: number
    deckPhase: SharedValue<TTarotGameDeckPhases>
    deckMeasure: SharedValue<MeasuredDimensions | null>
    tarotGameDeckTopSideCardEndingLayout: TTarotGameCardDrawningNumberLayout | null
    pageCenter: DerivedValue<{
        pageX: number;
        pageY: number;
    } | null>
    cardDimensions: DerivedValue<{
        width: number;
        heigth: number;
    } | null>
    cardStartAnimationDuration: number
    startAnimationLastCardTranslateXInterpolate: DerivedValue<number>
    cardReOrdinateAnimationDuration: number
    spaceBetweenCards: DerivedValue<number | null>
    previousSpaceBetweenCards: DerivedValue<number | null>
    cardsMinimumLeft: DerivedValue<number | null>
    cardsPreviousMinimumLeft: DerivedValue<number | null>
    deckTopSideSelectedCardPage: DerivedValue<{
        x: number;
        y: number;
    } | null>
    deckBottomSideSelectedCardPage: DerivedValue<{
        x: number;
        y: number;
    } | null>
    cardEndingLayoutAnimationDuration: number | undefined
    setTarotGameCardModalData:TTarotGameStore['setTarotGameCardModalData']
    handleTarotGameDeckCardsRef: (cardRef: React.RefObject<TTarotGameCardRefProps | null>, cardIndex: number) => void
}

export type TTarotGameCardHookProps = Pick<TTarotGameCardProps,
    'deck' |
    'frontFace' |
    'backFace' |
    'deckMeasure' |
    'deckIndex' |
    'deckPhase' |
    'pageCenter' |
    'cardDimensions' |
    'cardStartAnimationDuration' |
    'startAnimationLastCardTranslateXInterpolate' |
    'cardReOrdinateAnimationDuration' |
    'spaceBetweenCards' |
    'previousSpaceBetweenCards' |
    'cardsMinimumLeft' |
    'cardsPreviousMinimumLeft' |
    'deckTopSideSelectedCardPage' |
    'deckBottomSideSelectedCardPage' |
    'tarotGameDeckTopSideCardEndingLayout' |
    'setTarotGameCardModalData' |
    'cardEndingLayoutAnimationDuration' |
    'handleTarotGameDeckCardsRef'
>

export type TTarotGameCardRefProps = {
    handleGetTarotCardDeckSideAndIndex:() => TTarotGameCardDeckSideData
    handleTarotCardMoveCardToRightStartAnimation: (
        easing?:EasingFunction | EasingFunctionFactory | undefined
    ) => void
    handleTarotCardPhase:(
        phase:TTarotGameCardPhases
    )=>void
    handleMoveTarotCardFromBottomDeckToTopDeck:(
        animationDuration:number
    )=>void
    handleReOrdinateCard:(
        animationDuration?:number
    )=>void
    handleCardZIndex:(
        zIndex:number
    )=>void
}