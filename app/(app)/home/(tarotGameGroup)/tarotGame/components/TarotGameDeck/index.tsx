import { forwardRef, memo, useCallback } from "react"
import Animated from "react-native-reanimated"

import { TarotGameCard } from "../TarotGameCard"

import { useTarotGameDeckHook } from "./hook"
import { 
    TTarotGameDeckDataWithDeckSide,
    TTarotGameDeckProps, 
    TTarotGameDeckRefProps 
} from "./type"
import { TarotGameDeckStyle } from "./style"

export default undefined

export const TarotGameDeck = memo((props:TTarotGameDeckProps)=>{

    const {
        ref,
        deckData,
        deckPhase,
        deckMeasure,
        deckCardDimensions,
        deckBottomSidePageCenter,
        deckBottomSideFrontFacesIndexLength,
        deckBottomSideCardsMinimumLeft,
        deckBottomSideCardsPreviousMinimumLeft,
        deckBottomSideSpaceBetweenCards,
        deckBottomSidePreviousSpaceBetweenCards,
        deckTopSidePageCenter,
        deckTopSideCardsMinimumLeft,
        deckTopSideCardsPreviousMinimumLeft,
        deckTopSideSpaceBetweenCards,
        deckTopSidePreviousSpaceBetweenCards,
        deckTopSideSelectedCardPage,
        deckBottomSideSelectedCardPage,
        tarotGameDeckTopSideCardEndingLayout,
        cardEndingLayoutAnimationDuration
    } = props

    const {
        tarotGameDeckAnimatedRef,
        cardStartAnimationDuration,
        tarotGameDeckAnimatedStyle,
        startAnimationLastCardTranslateXInterpolate,
        cardReOrdinateAnimationDuration,
        handleOnLayout,
        handleTarotGameDeckCardsRef,
        setTarotGameCardModalData
    } = useTarotGameDeckHook({
        ref,
        deckData,
        deckMeasure,
        deckBottomSideFrontFacesIndexLength,
        deckBottomSideSpaceBetweenCards
    })

    return(
        <Animated.View 
            ref={tarotGameDeckAnimatedRef}
            onLayout={handleOnLayout}
            style={[
                TarotGameDeckStyle.TarotGameDeckContainer,
                tarotGameDeckAnimatedStyle
            ]} 
        >
            {deckData && deckData.frontFaces.map((frontFace,index)=>{
                return(
                    <TarotGameCard
                        key={frontFace.id}
                        deck={{
                            id:deckData.id,
                            name:deckData.name
                        }}
                        deckIndex={index}
                        frontFace={frontFace}
                        backFace={deckData.backFace}
                        deckMeasure={deckMeasure}
                        deckPhase={deckPhase}
                        tarotGameDeckTopSideCardEndingLayout={tarotGameDeckTopSideCardEndingLayout}
                        cardDimensions={deckCardDimensions}
                        cardStartAnimationDuration={cardStartAnimationDuration}
                        cardReOrdinateAnimationDuration={cardReOrdinateAnimationDuration}
                        startAnimationLastCardTranslateXInterpolate={startAnimationLastCardTranslateXInterpolate}
                        pageCenter={frontFace.deckSide === 'bottomSide' ? deckBottomSidePageCenter : deckTopSidePageCenter}
                        spaceBetweenCards={frontFace.deckSide === 'bottomSide' ? deckBottomSideSpaceBetweenCards : deckTopSideSpaceBetweenCards}
                        previousSpaceBetweenCards={frontFace.deckSide === 'bottomSide' ?  deckBottomSidePreviousSpaceBetweenCards : deckTopSidePreviousSpaceBetweenCards}
                        cardsMinimumLeft={frontFace.deckSide === 'bottomSide' ?  deckBottomSideCardsMinimumLeft : deckTopSideCardsMinimumLeft}
                        cardsPreviousMinimumLeft={frontFace.deckSide === 'bottomSide' ?  deckBottomSideCardsPreviousMinimumLeft : deckTopSideCardsPreviousMinimumLeft}
                        deckTopSideSelectedCardPage={deckTopSideSelectedCardPage}
                        deckBottomSideSelectedCardPage={deckBottomSideSelectedCardPage}
                        cardEndingLayoutAnimationDuration={frontFace.deckSide === 'topSide' ? cardEndingLayoutAnimationDuration : undefined}
                        setTarotGameCardModalData={setTarotGameCardModalData}
                        handleTarotGameDeckCardsRef={handleTarotGameDeckCardsRef}
                    />
                )
            })}
        </Animated.View>
    )
})