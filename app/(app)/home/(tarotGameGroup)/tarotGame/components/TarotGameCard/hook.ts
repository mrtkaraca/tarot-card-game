import {
    useCallback, 
    useEffect, 
    useImperativeHandle, 
    useRef,
    useState
} from "react"
import { 
    Easing,
    Extrapolation,
    interpolate,
    runOnJS,
    useAnimatedReaction,
    useAnimatedRef, 
    useAnimatedStyle, 
    useDerivedValue, 
    useSharedValue, 
    withDelay, 
    withSequence, 
    withTiming 
} from "react-native-reanimated"
import { Gesture } from "react-native-gesture-handler"

import { 
    TTarotGameCardHookProps, 
    TTarotGameCardPhases, 
    TTarotGameCardRefProps 
} from "./type"

export const useTarotGameCardHook = (props:TTarotGameCardHookProps)=>{

    const {
        deck,
        frontFace,
        backFace,
        deckPhase,
        deckIndex,
        deckMeasure,
        pageCenter,
        cardDimensions,
        tarotGameDeckTopSideCardEndingLayout,
        startAnimationLastCardTranslateXInterpolate,
        cardReOrdinateAnimationDuration,
        cardEndingLayoutAnimationDuration,
        spaceBetweenCards,
        previousSpaceBetweenCards,
        cardsMinimumLeft,
        cardsPreviousMinimumLeft,
        deckTopSideSelectedCardPage,
        deckBottomSideSelectedCardPage,
        setTarotGameCardModalData,
        handleTarotGameDeckCardsRef
    } = props

    const cardRef = useRef<TTarotGameCardRefProps>(null)
    const [enableTapGesture,setEnableTapGesture] = useState(false)

    const cardAnimatedRef = useAnimatedRef();
    
    const cardIndex = useSharedValue<number | null>(null)
    const cardZIndex = useSharedValue<number>(deckIndex)
    const cardOpacity = useSharedValue<0 | 1>(0)
    const cardPreviousIndex = useSharedValue<number | null>(null)
    const cardPhase = useSharedValue<TTarotGameCardPhases>(null)
    const cardToggleMaximumRight = useSharedValue<0 | 1>(1)
    const cardToggleReOrdinate = useSharedValue<0 | 1>(0)
    const cardToggleMoveToTopDeck = useSharedValue<0 | 1>(0)
    const cardsMinimumLeftDV = useSharedValue(0)
    const cardTranslateX = useSharedValue(0)
    const cardRotateY = useSharedValue(0)
    const cardMoveToEndLayoutToggle = useSharedValue<0 | 1>(0)
    const cardEndingLayoutRowColumn = useSharedValue({
        row:0,
        column:0
    })
    const cardMoveToEndLayout = useSharedValue({
        x:0,
        y:0
    })


    const cardDimensionsDV = useDerivedValue(()=>{
        return {
            height:cardDimensions.value ? cardDimensions.value.heigth : 0,
            width:cardDimensions.value ? cardDimensions.value.width : 0,
        }
    })
    const cardCenterToDeckSideTranslate = useDerivedValue(()=>{
        return (
            deckMeasure.value && 
            pageCenter.value
        ) ? {
            x:(pageCenter.value.pageX - deckMeasure.value.pageX) - cardDimensionsDV.value.width/2,
            y:(pageCenter.value.pageY - deckMeasure.value.pageY) - cardDimensionsDV.value.height/2
        }
        :
        {
            x:0,
            y:0
        }
    })
    const cardMaximumRight = useDerivedValue(()=>{
        return (
            spaceBetweenCards.value !== null &&
            cardIndex.value !== null
        ) ? 
        cardIndex.value * spaceBetweenCards.value 
        :
        0
    })
    const cardPreviousMaximumRight = useDerivedValue(()=>{
        return (
            previousSpaceBetweenCards.value !== null &&
            cardPreviousIndex.value !== null
        ) ?       
        cardPreviousIndex.value * previousSpaceBetweenCards.value  
        :
        0
    })
    const cardMaximumRightInterpolate = useDerivedValue(()=>{
        return interpolate(
            cardToggleMaximumRight.value,
            [0,1],
            [0,cardMaximumRight.value],
            Extrapolation.CLAMP
        )
    })
    const cardPreviousMaximumRightInterpolate = useDerivedValue(()=>{
        return interpolate(
            cardToggleMaximumRight.value,
            [0,1],
            [0,cardPreviousMaximumRight.value],
            Extrapolation.CLAMP
        )
    })
    const cardReOrdinateMaximumRightInterpolate = useDerivedValue(()=>{
        return interpolate(
            cardToggleReOrdinate.value,
            [0,1],
            [cardPreviousMaximumRightInterpolate.value,cardMaximumRightInterpolate.value],
            Extrapolation.CLAMP
        )
    })
    const cardReOrdinateMinimumLeftInterpolate = useDerivedValue(()=>{
        return (
            cardsPreviousMinimumLeft.value !== null &&
            cardsMinimumLeft.value !== null
        ) ? interpolate(
            cardToggleReOrdinate.value,
            [0,1],
            [cardsPreviousMinimumLeft.value,cardsMinimumLeft.value]
        )
        :
        0
    })
    const cardMoveToTopDeckTranslateYIntepolate = useDerivedValue(()=>{
        return (
            frontFace.deckSide === 'topSide' &&
            deckTopSideSelectedCardPage && deckTopSideSelectedCardPage.value &&
            deckBottomSideSelectedCardPage && deckBottomSideSelectedCardPage.value
        ) ? interpolate(
            cardToggleMoveToTopDeck.value,
            [0,1],
            [(deckBottomSideSelectedCardPage.value.y-deckTopSideSelectedCardPage.value.y),0]
        )
        :
        0
    })
    const cardMoveToTopDeckTranslateXIntepolate = useDerivedValue(()=>{
        return (
            frontFace.deckSide === 'topSide' &&
            deckTopSideSelectedCardPage && deckTopSideSelectedCardPage.value &&
            deckBottomSideSelectedCardPage && deckBottomSideSelectedCardPage.value
        ) ? interpolate(
            cardToggleMoveToTopDeck.value,
            [0,1],
            [(deckBottomSideSelectedCardPage.value.x - deckTopSideSelectedCardPage.value.x),0]
        )
        :
        0
    })
    const cardMoveToTopTranslate = useDerivedValue(()=>{
        if(frontFace.deckSide === 'topSide'){
            if(cardPhase.value === 'moveCardToTop'){
                return{
                    x:cardMoveToTopDeckTranslateXIntepolate.value,
                    y:cardMoveToTopDeckTranslateYIntepolate.value
                }
            }
        }
        return{
            x:0,
            y:0
        }
    })

    const cardEndingLayoutPageYInterpolate = useDerivedValue(()=>{
        return (
            frontFace.deckSide === 'topSide' &&
            cardEndingLayoutRowColumn.value !== null &&
            deckMeasure && deckMeasure.value !== null &&
            tarotGameDeckTopSideCardEndingLayout
        ) ? 
        tarotGameDeckTopSideCardEndingLayout.length > 1 ? (
                interpolate(
                    cardEndingLayoutRowColumn.value.row,
                    [0,tarotGameDeckTopSideCardEndingLayout.length-1],
                    [
                        deckMeasure.value.pageY + (deckMeasure.value.height/tarotGameDeckTopSideCardEndingLayout.length)/2,
                        (deckMeasure.value.pageY + deckMeasure.value.height) - (deckMeasure.value.height/tarotGameDeckTopSideCardEndingLayout.length)/2
                    ],
                    Extrapolation.CLAMP
                )
            )
            :
            (
                deckMeasure.value.pageY + deckMeasure.value.height/2
            )
        :
        (
            null
        )
    })

    const cardEndingLayoutPageXInterpolate = useDerivedValue(()=>{
        return (
            frontFace.deckSide === 'topSide' &&
            cardEndingLayoutRowColumn.value !== null &&
            deckMeasure && deckMeasure.value !== null &&
            tarotGameDeckTopSideCardEndingLayout
        ) ? 
        tarotGameDeckTopSideCardEndingLayout[cardEndingLayoutRowColumn.value.row].length > 1 ? (
                interpolate(
                    cardEndingLayoutRowColumn.value.column,
                    [0,tarotGameDeckTopSideCardEndingLayout[cardEndingLayoutRowColumn.value.row].length-1],
                    [
                        deckMeasure.value.pageX + (deckMeasure.value.width/tarotGameDeckTopSideCardEndingLayout[cardEndingLayoutRowColumn.value.row].length)/2,
                        (deckMeasure.value.pageX + deckMeasure.value.width) - (deckMeasure.value.width/tarotGameDeckTopSideCardEndingLayout[cardEndingLayoutRowColumn.value.row].length)/2
                    ],
                    Extrapolation.CLAMP
                )
            )
            :
            (
                deckMeasure.value.pageX + deckMeasure.value.width/2
            )
        :
        (
            null
        )
    })

    const cardMoveToEndingLayoutTranslateXInterpolate = useDerivedValue(()=>{
        return (
            cardEndingLayoutPageXInterpolate.value &&
            pageCenter.value
        ) ?
         interpolate(
            cardMoveToEndLayoutToggle.value,
            [0,1],
            [0,(
                cardEndingLayoutPageXInterpolate.value - (
                    pageCenter.value?.pageX + 
                    cardsMinimumLeftDV.value +
                    cardMaximumRight.value
                )
              
            )]
        )
        :
        0
    })
    const cardMoveToEndingLayoutTranslateYInterpolate = useDerivedValue(()=>{
        return (
            cardEndingLayoutPageYInterpolate.value &&
            pageCenter.value
        ) ?
         interpolate(
            cardMoveToEndLayoutToggle.value,
            [0,1],
            [0,(cardEndingLayoutPageYInterpolate.value - pageCenter.value.pageY)]
        )
        :
        0
    })

    const cardAnimatedStyle = useAnimatedStyle(()=>{
        return{
            height:cardDimensionsDV.value.height,
            width:cardDimensionsDV.value.width,
            opacity:cardOpacity.value,
            zIndex:cardZIndex.value,
            transform:[
                {translateX:cardCenterToDeckSideTranslate.value.x},
                {translateY:cardCenterToDeckSideTranslate.value.y},
                {translateX:cardsMinimumLeftDV.value},
                {translateX:cardTranslateX.value},
                {translateX:cardMoveToTopTranslate.value.x},
                {translateY:cardMoveToTopTranslate.value.y},
                {translateX:cardMoveToEndLayout.value.x},
                {translateY:cardMoveToEndLayout.value.y}
            ]
        }
    })

    const tapGesture = Gesture.Tap()
    .enabled(enableTapGesture)
    .onEnd((event)=>{
        if(event.state !== 3){
            runOnJS(setTarotGameCardModalData)({
                isModalVisible:true,
                cardData:{
                    frontFace,
                    backFace
                },
                deckData:deck
            })
        }
    })

    const handleCardRotateY = useCallback(()=>{
        'worklet'
        cardRotateY.value = withTiming(
            180,
            {
                duration:2000
            }
        )
    },[])

    const handleGetTarotCardDeckSideAndIndex:TTarotGameCardRefProps['handleGetTarotCardDeckSideAndIndex'] = useCallback(()=>{
        return {
            deckSide:frontFace.deckSide,
            index:frontFace.index
        }
    },[frontFace])

    const handleTarotCardMoveCardToRightStartAnimation:TTarotGameCardRefProps['handleTarotCardMoveCardToRightStartAnimation'] = useCallback((
        cardStartAnimationLastCardEasing,
        easing
    )=>{
        cardPhase.value = 'startAnimation'
        cardToggleMaximumRight.value = 0
        cardOpacity.value = 1
        cardToggleMaximumRight.value = withTiming(
            1,
            {
                duration:cardStartAnimationLastCardEasing,
                easing
            },
            (finished)=>{
                if(finished){
                    cardPhase.value = 'drawingCard'
                }
            }
        )
        
    },[])
    const handleTarotCardMoveCardToEndGameLayout = useCallback(()=>{
        'worklet'
        if(frontFace.deckSide === 'topSide'){
            cardPhase.value = 'moveToEndLayout'
            cardMoveToEndLayoutToggle.value = withTiming(
                1,
                {
                    duration:cardEndingLayoutAnimationDuration
                },
                (finished)=>{
                    if(finished){
                        cardPhase.value = 'endAnimation'
                    }
                }
            )
        }
    },[frontFace.deckSide,cardEndingLayoutAnimationDuration])
    const handleMoveTarotCardFromBottomDeckToTopDeck:TTarotGameCardRefProps['handleMoveTarotCardFromBottomDeckToTopDeck'] = useCallback((
        animationDuration
    )=>{
        cardToggleMaximumRight.value = 1
        cardPhase.value = 'moveCardToTop'
        cardToggleMoveToTopDeck.value = withTiming(
            1,
            {
                duration:animationDuration
            },
            (finished)=>{
                if(finished){
                    handleCardRotateY()
                    cardPhase.value = 'drawingCard'
                }
            }
        )
    },[])
    const handleTarotCardPhase:TTarotGameCardRefProps['handleTarotCardPhase'] = useCallback((
        phase
    )=>{
        cardPhase.value = phase
    },[])
    const handleReOrdinateCard:TTarotGameCardRefProps['handleReOrdinateCard'] = useCallback((
        animationDuration
    )=>{
        cardToggleReOrdinate.value = 0
        cardPhase.value ='reOrdinateCard'

        cardToggleReOrdinate.value = withTiming(
            1,
            {
                duration:animationDuration ? animationDuration : cardReOrdinateAnimationDuration
            },
            (finished)=>{
                if(finished){
                    cardPhase.value = 'drawingCard'
                    cardPreviousIndex.value = cardIndex.value
                }
            }
        )
    },[])

    const handleCardZIndex:TTarotGameCardRefProps['handleCardZIndex'] = useCallback((
        zIndex:number
    )=>{
        cardZIndex.value = zIndex
    },[])

    const handleTarotGameTopDeckCardEndingLayout = useCallback((
        cardIndex:number,
        endingLayout:NonNullable<typeof tarotGameDeckTopSideCardEndingLayout>
    )=>{
        let index = 0
        let endingLayoutRow = 0
        let endingLayourCol = 0
        
        loop:
        for(let row = 0; row < endingLayout.length; row++){
            for(let col = 0; col < endingLayout[row].length; col++){
                if(cardIndex === index){
                    endingLayoutRow = row
                    endingLayourCol = col
                    break loop
                }
                index++
            }
        }

        return {
            row:endingLayoutRow,
            column:endingLayourCol
        }
        
    },[])

    useAnimatedReaction(
        ()=>deckPhase.value,
        ()=>{
            if(deckPhase.value === 'endGame'){
                handleTarotCardMoveCardToEndGameLayout()
            }
        }
    )

    useAnimatedReaction(
        ()=>startAnimationLastCardTranslateXInterpolate.value,
        ()=>{
            if(
                deckPhase.value === 'startGame' &&
                cardPhase.value === null
            ){
                if(startAnimationLastCardTranslateXInterpolate.value >= cardMaximumRight.value){
                    cardOpacity.value = 1
                    cardPhase.value = 'drawingCard'
                }
            }
        }
    )
 
    useAnimatedReaction(
        ()=>cardMaximumRightInterpolate.value,
        ()=>{
            if(
                cardPhase.value === null ||
                cardPhase.value === 'startAnimation' ||
                cardPhase.value === 'drawingCard' ||
                cardPhase.value === 'moveCardToTop' ||
                cardPhase.value === 'moveToEndLayout' ||
                cardPhase.value === 'endAnimation'
            ){
                cardTranslateX.value = cardMaximumRightInterpolate.value
            }
        }
    )

    useAnimatedReaction(
        ()=>cardToggleReOrdinate.value,
        ()=>{
            if(
                cardPhase.value === 'reOrdinateCard'
            ){
                cardTranslateX.value = cardReOrdinateMaximumRightInterpolate.value
                cardsMinimumLeftDV.value = cardReOrdinateMinimumLeftInterpolate.value
            }
        }
    )

    useAnimatedReaction(
        ()=>cardsMinimumLeft.value,
        ()=>{
            if(cardsMinimumLeft.value !== null){
                if(
                    cardPhase.value === null ||
                    cardPhase.value === 'startAnimation' ||
                    cardPhase.value === 'drawingCard' ||
                    cardPhase.value === 'moveCardToTop' ||
                    cardPhase.value === 'moveToEndLayout' ||
                    cardPhase.value === 'endAnimation'
                ){
                    cardsMinimumLeftDV.value = cardsMinimumLeft.value
                }
            }
        }
    )

    useAnimatedReaction(
        ()=>[
            cardMoveToEndingLayoutTranslateXInterpolate.value,
            cardMoveToEndingLayoutTranslateYInterpolate.value
        ],
        ()=>{
            if(
                deckPhase.value === 'endGame' &&
                frontFace.deckSide === 'topSide'
            ){
                cardMoveToEndLayout.value = {
                    x:cardMoveToEndingLayoutTranslateXInterpolate.value,
                    y:cardMoveToEndingLayoutTranslateYInterpolate.value
                }
            }
        }
    )

    useAnimatedReaction(
        ()=>cardPhase.value,
        ()=>{
            if(cardPhase.value === 'endAnimation'){
                runOnJS(setEnableTapGesture)(true)
            }
        }
    )

    useEffect(()=>{
        handleTarotGameDeckCardsRef(cardRef,deckIndex)
    },[deckIndex,frontFace])


    useEffect(()=>{
        cardPreviousIndex.value = cardPreviousIndex.value === null ? (
            frontFace.index
        )
        :
        (
            frontFace.deckSide === 'topSide' ? (
                frontFace.index
            )
            :
            (
                cardIndex.value
            )
        )
        cardIndex.value = frontFace.index
    },[frontFace.index,frontFace.deckSide])

    useEffect(()=>{
        if(frontFace.deckSide === 'topSide'){
            if(tarotGameDeckTopSideCardEndingLayout){
                const cardEndingPosition = handleTarotGameTopDeckCardEndingLayout(
                    frontFace.index,
                    tarotGameDeckTopSideCardEndingLayout
                )
                cardEndingLayoutRowColumn.value = cardEndingPosition
            }
        }
    },[frontFace.deckSide])

    useImperativeHandle(
        cardRef,
        ()=>{
            return{
                handleTarotCardPhase,
                handleGetTarotCardDeckSideAndIndex,
                handleTarotCardMoveCardToRightStartAnimation,
                handleMoveTarotCardFromBottomDeckToTopDeck,
                handleReOrdinateCard,
                handleCardZIndex
            }
        }
    )

    return{
        tapGesture,
        cardAnimatedRef,
        cardAnimatedStyle,
        cardRotateY,
    }
}

export default {
    useTarotGameCardHook
}