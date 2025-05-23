import { Fragment, Suspense } from "react"
import { 
    View ,
    Text
} from "react-native"

import {TarotGameCursorGesture} from "../TarotGameCursorGesture"
import { TarotGameDeck } from "../TarotGameDeck"
import { TarotGameCursor } from "../TarotGameCursor"
import { TarotGameGameLoading } from "../TarotGameGameLoading"

import { TTarotGameInnerContainerProps } from "./type"
import { useTarotGameInnerContainerHook } from "./hook"
import { TarotGameInnerContainerStyle } from "./stlye"


export const TarotGameInnerContainer = (props:TTarotGameInnerContainerProps)=>{

    const {
        tarotGameDataWithoutBackground
    } = props

    const {
        isDeckReady,
        isGameEnded,
        cursorGestureMeasure,
        deck,
        deckRef,
        deckPhase,
        deckMeasure,
        deckCardDimensions,
        deckBottomSidePageCenter,
        deckBottomSideCardsMinimumLeft,
        deckBottomSideCardsPreviousMinimumLeft,
        deckBottomSideSpaceBetweenCards,
        deckBottomSidePreviousSpaceBetweenCards,
        deckBottomSideFrontFacesIndexLength,
        deckBottomSidePreviousFrontFacesIndexLength,
        deckBottomSideSelectedCardPage,
        deckTopSidePageCenter,
        deckTopSideCardsMinimumLeft,
        deckTopSideCardsPreviousMinimumLeft,
        deckTopSideSpaceBetweenCards,
        deckTopSidePreviousSpaceBetweenCards,
        deckTopSideSelectedCardPage,
        cursorRef,
        cursorMeasure,
        cursorDimensions,
        cursorCenterToDeckBottomSidePage,
        cursorMaximumRightTranslateX,
        cursorPreviousMaximumRightTranslateX,
        tarotGameDeckTopSideCardEndingLayout,
        cardEndingLayoutAnimationDuration,
        handleTarotGameCursorGesture,
    } = useTarotGameInnerContainerHook(props)

    return(
        <Fragment>
            <TarotGameGameLoading
                isDeckReady={isDeckReady}
            />
            <TarotGameCursorGesture
                cursorGestureMeasure={cursorGestureMeasure}
                handleTarotGameCursorGesture={handleTarotGameCursorGesture}
            >
                <View
                    style={TarotGameInnerContainerStyle.TarotGameInnerContainerPaddingContainer}
                >
                    <TarotGameDeck
                        ref={deckRef}
                        deckData={deck}
                        deckPhase={deckPhase}
                        deckMeasure={deckMeasure}
                        deckCardDimensions={deckCardDimensions}
                        deckBottomSidePageCenter={deckBottomSidePageCenter}
                        deckBottomSideFrontFacesIndexLength={deckBottomSideFrontFacesIndexLength}
                        deckBottomSideCardsMinimumLeft={deckBottomSideCardsMinimumLeft}
                        deckBottomSideCardsPreviousMinimumLeft={deckBottomSideCardsPreviousMinimumLeft}
                        deckBottomSideSpaceBetweenCards={deckBottomSideSpaceBetweenCards}
                        deckBottomSidePreviousSpaceBetweenCards={deckBottomSidePreviousSpaceBetweenCards}
                        deckTopSidePageCenter={deckTopSidePageCenter}
                        deckTopSideCardsMinimumLeft={deckTopSideCardsMinimumLeft}
                        deckTopSideCardsPreviousMinimumLeft={deckTopSideCardsPreviousMinimumLeft}
                        deckTopSideSpaceBetweenCards={deckTopSideSpaceBetweenCards}
                        deckTopSidePreviousSpaceBetweenCards={deckTopSidePreviousSpaceBetweenCards}
                        deckTopSideSelectedCardPage={deckTopSideSelectedCardPage}
                        deckBottomSideSelectedCardPage={deckBottomSideSelectedCardPage}
                        cardEndingLayoutAnimationDuration={cardEndingLayoutAnimationDuration}
                        tarotGameDeckTopSideCardEndingLayout={tarotGameDeckTopSideCardEndingLayout}
                    />
                    {!isGameEnded &&
                        <TarotGameCursor
                            ref={cursorRef}
                            cursorMeasure={cursorMeasure}
                            cursorData={tarotGameDataWithoutBackground.tarotCursor}
                            cursorDimensions={cursorDimensions}
                            cursorMaximumRight={cursorMaximumRightTranslateX}
                            cursorPreviousMaximumRight={cursorPreviousMaximumRightTranslateX}
                            cursorCenterToDeckBottomSidePage={cursorCenterToDeckBottomSidePage}
                            cardsMinimumLeft={deckBottomSideCardsMinimumLeft}
                            cardsPreviousMinimumLeft={deckBottomSideCardsPreviousMinimumLeft}
                            spaceBetweenCards={deckBottomSideSpaceBetweenCards}
                            bottomDeckFrontFacesIndexLength={deckBottomSideFrontFacesIndexLength}
                            bottomDeckPreviousFrontFacesIndexLength={deckBottomSidePreviousFrontFacesIndexLength}
                            topDeckSelectedCardPage={deckTopSideSelectedCardPage}
                            bottomDeckSelectedCardPage={deckBottomSideSelectedCardPage}
                        />
                    }
                </View>
            </TarotGameCursorGesture>
        </Fragment>
    )
}

export default {
    TarotGameInnerContainer
}