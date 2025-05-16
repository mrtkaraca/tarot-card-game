import { 
    RefObject,
    useCallback,
    useImperativeHandle,
    useLayoutEffect,
    useRef 
} from "react"
import { 
    Easing,
    interpolate,
    measure,
    runOnUI,
    useAnimatedRef,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withTiming, 
} from "react-native-reanimated"

import { 
    TTarotGameCardRefProps 
} from "../TarotGameCard/type"

import { 
    TTarotGameDeck,
    TTarotGameDeckHookProps, 
    TTarotGameDeckRefProps
} from "./type"
import { useTarotGameStore } from "@/contexts/tarotGame"

export const useTarotGameDeckHook = (props:TTarotGameDeckHookProps)=>{

    const {
        ref,
        deckMeasure,
        deckBottomSideFrontFacesIndexLength,
        deckBottomSideSpaceBetweenCards
    } = props
    
    var cardReOrdinateAnimationDuration = 2000
    var cardReOrdinateAnimationCallPerTimeoutFunction = 10
    var cardStartAnimationDuration = 3000
    var startAnimationLastCardEasing = Easing.bezier(0.75, 0, 0.25, 1)

    const setTarotGameCardModalData = useTarotGameStore((state)=>state.setTarotGameCardModalData)

    const tarotGameDeckCardsRef = useRef<Array<TTarotGameCardRefProps>>([])
    
    const tarotGameDeckAnimatedRef = useAnimatedRef()

    const tarotGameDeckOpacity = useSharedValue<0 | 1>(0)
    const startAnimationLastCardTranslateXToggle = useSharedValue<0 | 1>(0)

    const deckLastCardMaximumRightTranslateX = useDerivedValue(()=>{
        return (
            deckBottomSideFrontFacesIndexLength.value !== null &&
            deckBottomSideSpaceBetweenCards.value !== null
        )? (
            deckBottomSideFrontFacesIndexLength.value * deckBottomSideSpaceBetweenCards.value
        )
        :
        null
    })

    const startAnimationLastCardTranslateXInterpolate = useDerivedValue(()=>{
        return (
            deckLastCardMaximumRightTranslateX.value !== null
        ) ? interpolate(
            startAnimationLastCardTranslateXToggle.value,
            [0,1],
            [0,deckLastCardMaximumRightTranslateX.value]
        )
        :
        0
    })

    const tarotGameDeckAnimatedStyle = useAnimatedStyle(()=>{
        return{
            opacity:tarotGameDeckOpacity.value
        }
    })

    const handleTarotGameDeckCardsRef = useCallback((cardRef:RefObject<TTarotGameCardRefProps | null>,cardIndex:number)=>{
        if(cardRef.current){
            tarotGameDeckCardsRef.current[cardIndex] = cardRef.current
        }
        else{
            delete tarotGameDeckCardsRef.current[cardIndex] 
        }
    },[])

    const handleTarotGameDeckMeasure = useCallback(()=>{
        runOnUI(()=>{
            if(tarotGameDeckAnimatedRef){
                const mes = measure(tarotGameDeckAnimatedRef)
                if(mes){
                    deckMeasure.value = mes
                }
            }
        })()
    },[])

    const handleOnLayout = useCallback(()=>{
        handleTarotGameDeckMeasure()
    },[])

    const handleGetTarotGameDeckStartAnimation = useCallback(()=>{
        return cardStartAnimationDuration
    },[])


    const handleStartGame = useCallback(()=>{
        if(tarotGameDeckCardsRef.current){
            
            tarotGameDeckOpacity.value = 1

            tarotGameDeckCardsRef.current[tarotGameDeckCardsRef.current.length-1].handleTarotCardMoveCardToRightStartAnimation(
                startAnimationLastCardEasing
            )

            startAnimationLastCardTranslateXToggle.value = withTiming(
                1,
                {
                    duration:cardStartAnimationDuration,
                    easing:startAnimationLastCardEasing
                }
            )


        }
    },[])

    const handleReOrdinateCards:TTarotGameDeckRefProps['handleReOrdinateCards'] = useCallback((
        deckTopSideSelectedCardIndex,
        deckBottomSideSelectedCardIndex
    )=>{
        if(tarotGameDeckCardsRef.current){

            const topSideDeckOrdered = tarotGameDeckCardsRef.current.filter(
                (cardRef)=> (
                    cardRef.handleGetTarotCardDeckSideAndIndex().deckSide === 'topSide'
                )
            ).sort(
                (cardRefOne,cardRefTwo)=> (
                    cardRefOne.handleGetTarotCardDeckSideAndIndex().index - 
                    cardRefTwo.handleGetTarotCardDeckSideAndIndex().index
                )
            )
            
            const bottomSideDeckOrdered = tarotGameDeckCardsRef.current.filter(
                (cardRef)=> (
                    cardRef.handleGetTarotCardDeckSideAndIndex().deckSide === 'bottomSide'
                )
            ).sort(
                (cardRefOne,cardRefTwo)=> (
                    cardRefOne.handleGetTarotCardDeckSideAndIndex().index - 
                    cardRefTwo.handleGetTarotCardDeckSideAndIndex().index
                )
            )

            topSideDeckOrdered.forEach((cardRef,index)=>{
                if(
                    deckTopSideSelectedCardIndex !== index
                ){
                    cardRef.handleReOrdinateCard()
                }
            })

    
            if(bottomSideDeckOrdered.length > cardReOrdinateAnimationCallPerTimeoutFunction){

                var animationDurationPerCard = cardReOrdinateAnimationDuration/Number((bottomSideDeckOrdered.length/cardReOrdinateAnimationCallPerTimeoutFunction).toFixed(0))

                if(
                    (deckBottomSideSelectedCardIndex-1) < bottomSideDeckOrdered.length/3
                ){
                    bottomSideDeckOrdered.reverse().forEach((cardRef,index)=>{
                        setTimeout(() => {
                            cardRef.handleReOrdinateCard(
                                animationDurationPerCard
                            )
                        }, ((index/cardReOrdinateAnimationCallPerTimeoutFunction)*animationDurationPerCard));
                    })
                }
                else{
                    if(
                        (deckBottomSideSelectedCardIndex-1) > bottomSideDeckOrdered.length/3 && 
                        (deckBottomSideSelectedCardIndex-1) < (bottomSideDeckOrdered.length/3)*2
                    ){
                        for(let i = 0; i <= bottomSideDeckOrdered.length/2; i++){
                            for(let j = bottomSideDeckOrdered.length-1; j >= bottomSideDeckOrdered.length/2; j--){
                                if(i !== j){
                                    setTimeout(() => {
                                        bottomSideDeckOrdered[j].handleReOrdinateCard(
                                            animationDurationPerCard
                                        )
                                        bottomSideDeckOrdered[i].handleReOrdinateCard(
                                            animationDurationPerCard
                                        )
                                    }, (i/cardReOrdinateAnimationCallPerTimeoutFunction)*animationDurationPerCard);
                                }
                                else{
                                    setTimeout(() => {
                                        bottomSideDeckOrdered[i].handleReOrdinateCard(
                                            animationDurationPerCard
                                        )
                                    }, (i/cardReOrdinateAnimationCallPerTimeoutFunction)*animationDurationPerCard);
                                }
                            }
                        }
                    }
                    else{
                        bottomSideDeckOrdered.forEach((cardRef,index)=>{
                            setTimeout(() => {
                                cardRef.handleReOrdinateCard(
                                    animationDurationPerCard
                                )
                            }, ((index/cardReOrdinateAnimationCallPerTimeoutFunction)*animationDurationPerCard));
                        })
                    }
                }
            }
            else{
                bottomSideDeckOrdered.forEach((cardRef)=>{
                    cardRef.handleReOrdinateCard()
                })
            }
            

        }
    },[])

    const handlePrepareCardsPhase:TTarotGameDeckRefProps['handlePrepareCardsPhase'] = useCallback((
        deckBottomSideCardStoppedIndex
    )=>{
          const bottomSideDeckOrdered = tarotGameDeckCardsRef.current.filter(
                (cardRef)=> (
                    cardRef.handleGetTarotCardDeckSideAndIndex().deckSide === 'bottomSide'
                )
            ).sort(
                (cardRefOne,cardRefTwo)=> (
                    cardRefOne.handleGetTarotCardDeckSideAndIndex().index - 
                    cardRefTwo.handleGetTarotCardDeckSideAndIndex().index
                )
            )

            const topSideDeck = tarotGameDeckCardsRef.current.filter(
                (cardRef)=> (
                    cardRef.handleGetTarotCardDeckSideAndIndex().deckSide === 'topSide'
                )
            )

            bottomSideDeckOrdered.forEach((cardRef,index)=>{
                if(index === deckBottomSideCardStoppedIndex){
                    cardRef.handleTarotCardPhase('moveCardToTop')
                }
                else{
                    cardRef.handleTarotCardPhase('reOrdinateCard')
                }
            })

            topSideDeck.forEach((cardRef)=>{
                cardRef.handleTarotCardPhase('reOrdinateCard')
            })
    },[])

    const handleTopSideDeckCardsZIndex:TTarotGameDeckRefProps['handleTopSideDeckCardsZIndex'] = useCallback((
        deckBottomSideSelectedCardIndex,
        deckTopSideSelectedCardIndex
    )=>{
        if(
            tarotGameDeckCardsRef.current
        ){
            
            const topSideDeckOrdered = tarotGameDeckCardsRef.current.filter(
                (cardRef)=> (
                    cardRef.handleGetTarotCardDeckSideAndIndex().deckSide === 'topSide'
                )
            ).sort(
                (cardRefOne,cardRefTwo)=> (
                    cardRefOne.handleGetTarotCardDeckSideAndIndex().index - 
                    cardRefTwo.handleGetTarotCardDeckSideAndIndex().index
                )
            )
            
            const topSideCardLength = topSideDeckOrdered.length

            topSideDeckOrdered.forEach((cardRef,index)=>{
                if(deckTopSideSelectedCardIndex !== index){
                    let cardIndex = cardRef.handleGetTarotCardDeckSideAndIndex().index
                    let newZIndex = (deckBottomSideSelectedCardIndex - topSideCardLength) + cardIndex
                    cardRef.handleCardZIndex(newZIndex)
                }
            })

        }
    },[])

    const handleMoveTarotCardFromBottomDeckToTopDeck:TTarotGameDeckRefProps['handleMoveTarotCardFromBottomDeckToTopDeck'] = useCallback((
        deckTopSideSelectedCardIndex,
        cursorAndCardMoveToDeckTopSidekDuration
    )=>{
        if(tarotGameDeckCardsRef.current){

            const topSideDeckOrdered = tarotGameDeckCardsRef.current.filter(
                (cardRef)=> (
                    cardRef.handleGetTarotCardDeckSideAndIndex().deckSide === 'topSide'
                )
            ).sort(
                (cardRefOne,cardRefTwo)=> (
                    cardRefOne.handleGetTarotCardDeckSideAndIndex().index - 
                    cardRefTwo.handleGetTarotCardDeckSideAndIndex().index
                )
            )

            topSideDeckOrdered[deckTopSideSelectedCardIndex].handleMoveTarotCardFromBottomDeckToTopDeck(
                cursorAndCardMoveToDeckTopSidekDuration
            )
        }
    },[])


    useLayoutEffect(()=>{
        handleTarotGameDeckMeasure()
    },[])

    useImperativeHandle(
        ref,
        ()=>{
            return{
                handlePrepareCardsPhase,
                handleStartGame,
                handleGetTarotGameDeckStartAnimation,
                handleMoveTarotCardFromBottomDeckToTopDeck,
                handleReOrdinateCards,
                handleTopSideDeckCardsZIndex,
            }
        }
    )
    
    return{
        tarotGameDeckAnimatedRef,
        cardStartAnimationDuration,
        tarotGameDeckAnimatedStyle,
        startAnimationLastCardTranslateXInterpolate,
        cardReOrdinateAnimationDuration,
        handleOnLayout,
        handleTarotGameDeckCardsRef,
        setTarotGameCardModalData
    }
}

export default {
    useTarotGameDeckHook
}