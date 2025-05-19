import { 
    createRef,
    forwardRef, 
    memo 
} from "react"
import Animated, { FadeOut, LinearTransition, runOnJS } from "react-native-reanimated"

import { TarotGameCardFace } from "../TarotGameCardFace"

import { TTarotGameCardProps, TTarotGameCardRefProps } from "./type"
import { useTarotGameCardHook } from "./hook"
import { TarotGameCardStyle } from "./style"
import { Gesture, GestureDetector } from "react-native-gesture-handler"

export const TarotGameCard = memo((props:TTarotGameCardProps)=>{

    const {
        deck,
        frontFace,
        backFace,
        deckIndex,
        deckMeasure,
        deckPhase,
        pageCenter,
        tarotGameDeckTopSideCardEndingLayout,
        cardDimensions,
        startAnimationLastCardTranslateXInterpolate,
        cardReOrdinateAnimationDuration,
        spaceBetweenCards,
        previousSpaceBetweenCards,
        cardsMinimumLeft,
        cardsPreviousMinimumLeft,
        deckTopSideSelectedCardPage,
        deckBottomSideSelectedCardPage,
        cardEndingLayoutAnimationDuration,
        setTarotGameCardModalData,
        handleTarotGameDeckCardsRef,
    } = props
    
    const {
        cardAnimatedRef,
        cardAnimatedStyle,
        cardRotateY,
        tapGesture
    } = useTarotGameCardHook({
        deck,
        frontFace,
        backFace,
        deckMeasure,
        deckIndex,
        deckPhase,
        pageCenter,
        tarotGameDeckTopSideCardEndingLayout,
        cardDimensions,
        startAnimationLastCardTranslateXInterpolate,
        cardReOrdinateAnimationDuration,
        spaceBetweenCards,
        previousSpaceBetweenCards,
        cardsMinimumLeft,
        cardsPreviousMinimumLeft,
        deckTopSideSelectedCardPage,
        deckBottomSideSelectedCardPage,
        cardEndingLayoutAnimationDuration,
        setTarotGameCardModalData,
        handleTarotGameDeckCardsRef
    })


    return(
        <GestureDetector gesture={tapGesture}>
            <Animated.View
                ref={cardAnimatedRef}
                style={[
                    TarotGameCardStyle.TarotGameCardContainer,
                    cardAnimatedStyle
                ]}
            >
                {(frontFace.deckSide === 'topSide' && frontFace) &&
                    <TarotGameCardFace
                        isCardFrontFace={true}
                        cardFace={frontFace}
                        cardRotateY={cardRotateY}
                    />
                }
                {backFace &&
                    <TarotGameCardFace
                        isCardFrontFace={false}
                        cardFace={backFace}
                        {...frontFace.deckSide ==='topSide' &&
                            {
                                cardRotateY:cardRotateY
                            }
                        }
                    />
                }
            </Animated.View>
        </GestureDetector>
    )
})

export default {
    TarotGameCard
}