import { 
    useCallback, 
    useEffect, 
    useRef, 
    useState 
} from "react"
import { 
    interpolate,
    MeasuredDimensions, 
    runOnJS, 
    useAnimatedReaction, 
    useDerivedValue, 
    useSharedValue, 
    withTiming
} from "react-native-reanimated"
import { useShallow } from "zustand/react/shallow"

import { 
    TTarotGameDeckDataWithDeckSide, 
    TTarotGameDeckPhases 
} from "../TarotGameDeck/type"

import { TTarotGameCursorRefProps } from "../TarotGameCursor/type"

import { TTarotGameInnerContainerHookProps } from "./type"
import { useTarotGameStore } from "@/contexts/tarotGame"
import { TTarotGameDeckRefProps } from "../TarotGameDeck/type"
import { TTarotGameCardDeckSideData } from "../TarotGameCard/type"
import { TTarotGameCardFaceData } from "../TarotGameCardFace/type"
import { TarotGameDrawningNumbersEndingLayout } from "../TarotGameDeck/helper"

export const useTarotGameInnerContainerHook = (props:TTarotGameInnerContainerHookProps)=>{

    const {
        tarotGameDataWithoutBackground
    } = props

    const cardEndingLayoutAnimationDuration = 5000
    const cursorAndCardMoveToTopSideDeckDuration = 5000

    const cardAspect = 600/1000

    const tarotGameDrawningCardNumber = useTarotGameStore((state)=>state.tarotGameSelectionsPaginationSelectedItems.tarotGameDrawningCardNumber)
    const tarotGameDeckTopSideCardEndingLayout = useTarotGameStore(
        useShallow((state)=>{
            return state.tarotGameSelectionsPaginationSelectedItems.tarotGameDrawningCardNumber ? (
                TarotGameDrawningNumbersEndingLayout[state.tarotGameSelectionsPaginationSelectedItems.tarotGameDrawningCardNumber]
            )
            :
            (
                null
            )
        }
    ))
    const tarotGameDeckTopSideCardEndingLayoutBiggestLenght = tarotGameDeckTopSideCardEndingLayout ? (
        (()=>{
            var biggestLenght = tarotGameDeckTopSideCardEndingLayout.length
            for(let row = 0; row < tarotGameDeckTopSideCardEndingLayout.length;row++){
                if(tarotGameDeckTopSideCardEndingLayout[row].length > tarotGameDeckTopSideCardEndingLayout.length){
                    biggestLenght = tarotGameDeckTopSideCardEndingLayout[row].length
                    break;
                }
            }
            return biggestLenght
        })()
    )
    :
    null
    
    
    const deckRef = useRef<TTarotGameDeckRefProps>(null);
    const cursorRef = useRef<TTarotGameCursorRefProps>(null);
    const tarotGameDrawnedCardCount = useRef(0)
    
    const [isGameEnded,setIsGameEnded] = useState(false)
    const [deck,setDeck] = useState<TTarotGameDeckDataWithDeckSide | null>(null)
  
    const deckPhase = useSharedValue<TTarotGameDeckPhases>('startGame')
    const deckMeasure = useSharedValue<MeasuredDimensions | null>(null)
    const isDeckReady = useSharedValue(false)
    const deckCardStartAndEndAnimationInterpolateToggle = useSharedValue<0 | 1>(0)
    const deckTopSideSelectedCardIndex = useSharedValue<number | null>(null)
    const deckTopSidePreviousFrontFacesLength = useSharedValue<number | null>(null)
    const deckBottomSideSelectedCardIndex = useSharedValue<number | null>(null)
    const deckBottomSidePreviousFrontFacesLength = useSharedValue<number | null>(null)

    const cardScaleRatio = useSharedValue(0.7)

    const cursorMeasure = useSharedValue<MeasuredDimensions | null>(null)
    const cursorGestureMeasure = useSharedValue<MeasuredDimensions | null>(null)
    const cursorScaleRatio = useSharedValue(0.7)
    
    const deckCardStartDimensions = useDerivedValue(()=>{
        return (
            deckMeasure.value
        ) ? 
        (
            {
                width:Math.floor((deckMeasure.value.height/2) * cardAspect * cardScaleRatio.value),
                heigth:Math.floor((deckMeasure.value.height/2) * cardScaleRatio.value)
            } 
          
        )
        :
        null
    })
    const deckCardEndDimensions = useDerivedValue(()=>{
        return (
            deckMeasure.value
        ) ? 
        (
            {
                width:Math.floor((deckMeasure.value.height) * cardAspect * cardScaleRatio.value),
                heigth:Math.floor((deckMeasure.value.height) * cardScaleRatio.value)
            } 
          
        )
        :
        null
    })

    const deckCardStartAndEndDimensionHeightInterpolate = useDerivedValue(()=>{
        return (
            deckCardStartAndEndAnimationInterpolateToggle.value !== null &&
            deckCardStartDimensions.value &&
            deckCardEndDimensions.value
        ) ?
        (
            interpolate(
                deckCardStartAndEndAnimationInterpolateToggle.value,
                [0,1],
                [deckCardStartDimensions.value.heigth,deckCardEndDimensions.value.heigth]
            )
        )
        :
        null
    })
    const deckCardStartAndEndDimensionWidthInterpolate = useDerivedValue(()=>{
        return (
            deckCardStartAndEndAnimationInterpolateToggle.value !== null &&
            deckCardStartDimensions.value &&
            deckCardEndDimensions.value
        ) ?
        (
            interpolate(
                deckCardStartAndEndAnimationInterpolateToggle.value,
                [0,1],
                [deckCardStartDimensions.value.width,deckCardEndDimensions.value.width]
            )
        )
        :
        null
    })


    const deckCardDimensions = useDerivedValue(()=>{
        return (
            deckCardStartDimensions.value && 
            deckCardStartAndEndDimensionHeightInterpolate.value &&
            deckCardStartAndEndDimensionWidthInterpolate.value
        ) ? 
        deckPhase.value === 'startGame' ? (
            deckCardStartDimensions.value
        ) 
        :
        (
            {
                width:deckCardStartAndEndDimensionWidthInterpolate.value,
                heigth:deckCardStartAndEndDimensionHeightInterpolate.value
            }
           
        )
        :
        null
    })

    const deckTopSidePageCenter = useDerivedValue(()=>{
        return deckMeasure.value ? {
            pageX:deckMeasure.value.pageX + deckMeasure.value.width/2,
            pageY:deckMeasure.value.pageY + deckMeasure.value.height/4
        }
        :
        null
    })
    const deckTopSideFrontFacesLength = useDerivedValue(()=>{
        return(
            deck &&
            deck.frontFaces.length
        ) ?
        deck.frontFaces.filter((frontFace)=>frontFace.deckSide === 'topSide').length
        :
        null
    })
    const deckTopSideCardsTotalWidth = useDerivedValue(()=>{
        return (
            deckTopSideFrontFacesLength.value &&
            deckCardDimensions.value
        ) ? 
            deckCardDimensions.value.width * deckTopSideFrontFacesLength.value
            : 
            null
    })
    const deckTopSideCardsPreviousTotalWidth = useDerivedValue(()=>{
        return (
            deckTopSidePreviousFrontFacesLength.value !== null && 
            deckCardDimensions.value
        ) ? 
        deckCardDimensions.value.width * deckTopSidePreviousFrontFacesLength.value
        : 
        null
    })
    const deckTopSideSpaceBetweenCards = useDerivedValue(()=>{
        return (
            deckMeasure.value && 
            deckTopSideCardsTotalWidth.value !== null && 
            deckCardDimensions.value &&
            deckTopSideFrontFacesLength.value !== null
        ) ? 
        deckTopSideCardsTotalWidth.value < deckMeasure.value.width ? 
            deckCardDimensions.value.width 
            : 
            (deckTopSideFrontFacesLength.value > 1) ? 
                (deckMeasure.value.width-deckCardDimensions.value.width)/(deckTopSideFrontFacesLength.value-1) 
                : 
                0
        :
        null
    })
    const deckTopSidePreviousSpaceBetweenCards = useDerivedValue(()=>{
        return (
            deckMeasure.value && 
            deckTopSideCardsPreviousTotalWidth.value !== null && 
            deckCardDimensions.value && 
            deckTopSidePreviousFrontFacesLength.value !== null
        ) ?
        deckTopSideCardsPreviousTotalWidth.value < deckMeasure.value.width ? 
            deckCardDimensions.value.width 
            : 
            (deckTopSidePreviousFrontFacesLength.value > 1) ? 
                (deckMeasure.value.width-deckCardDimensions.value.width)/(deckTopSidePreviousFrontFacesLength.value-1) 
                : 
                0
        :
        null
    })
    const deckTopSideCardsMinimumLeft = useDerivedValue(()=>{
        return (
            deckMeasure.value && 
            deckTopSideCardsTotalWidth.value !== null && 
            deckCardDimensions.value
        ) ? 
        deckTopSideCardsTotalWidth.value < deckMeasure.value.width ?
        -(deckTopSideCardsTotalWidth.value)/2 + deckCardDimensions.value.width/2
        :
        -(deckMeasure.value.width-deckCardDimensions.value.width)/2
        :
        null
    })
    const deckTopSideCardsPreviousMinimumLeft = useDerivedValue(()=>{
        return (
            deckMeasure.value && 
            deckTopSideCardsPreviousTotalWidth.value !== null && 
            deckCardDimensions.value
        ) ? 
        deckTopSideCardsPreviousTotalWidth.value < deckMeasure.value.width ?
        -(deckTopSideCardsPreviousTotalWidth.value)/2 + deckCardDimensions.value.width/2
        :
        -(deckMeasure.value.width-deckCardDimensions.value.width)/2
        :
        null
    })
    const deckTopSideSelectedCardPage = useDerivedValue(()=>{
        return (
            deckTopSideSelectedCardIndex.value !== null &&
            deckTopSideCardsMinimumLeft.value !== null &&
            deckTopSideSpaceBetweenCards.value !== null && 
            deckTopSidePageCenter.value !== null
        ) ? {
            x:
                deckTopSidePageCenter.value.pageX + 
                deckTopSideCardsMinimumLeft.value + 
                (deckTopSideSelectedCardIndex.value * deckTopSideSpaceBetweenCards.value)
            ,
            y:deckTopSidePageCenter.value.pageY
        }
        :
        null
    })
    const deckBottomSidePageCenter = useDerivedValue(()=>{
        return deckMeasure.value ? {
            pageX:deckMeasure.value.pageX + deckMeasure.value.width/2,
            pageY:(deckMeasure.value.pageY + deckMeasure.value.height) - deckMeasure.value.height/4
        }
        :
        null
    })
    const deckBottomSideFrontFacesLength = useDerivedValue(()=>{
        return (
            deck &&
            deck.frontFaces.length !== null
        ) ? 
        deck.frontFaces.filter((frontFace)=>frontFace.deckSide === 'bottomSide').length
        :
        null
    })
    const deckBottomSideFrontFacesIndexLength = useDerivedValue(()=>{
        return (
            deckBottomSideFrontFacesLength.value
        ) ? (
            deckBottomSideFrontFacesLength.value - 1
        )
        :
        null
    })
    const deckBottomSidePreviousFrontFacesIndexLength = useDerivedValue(()=>{
        return (
            deckBottomSidePreviousFrontFacesLength.value !== null
        ) ? (
            deckBottomSidePreviousFrontFacesLength.value - 1
        )
        :
        null
    })
    const deckBottomSideCardsTotalWidth = useDerivedValue(()=>{
        return (
            deckBottomSideFrontFacesLength.value && 
            deckCardDimensions.value
        ) ? 
            deckCardDimensions.value.width * deckBottomSideFrontFacesLength.value
            : 
            null
    })
    const deckBottomSideCardsPreviousTotalWidth = useDerivedValue(()=>{
        return (
            deckBottomSidePreviousFrontFacesLength.value !== null && 
            deckCardDimensions.value
        ) ? 
        deckCardDimensions.value.width * (deckBottomSidePreviousFrontFacesLength.value)
        : 
        null
    })
    const deckBottomSideSpaceBetweenCards = useDerivedValue(()=>{
        return (
            deckMeasure.value && 
            deckBottomSideCardsTotalWidth.value !== null && 
            deckCardDimensions.value &&
            deckBottomSideFrontFacesLength.value
        ) ? 
        deckBottomSideCardsTotalWidth.value < deckMeasure.value.width ? (
            deckCardDimensions.value.width 
        )
        : 
        (deckBottomSideFrontFacesLength.value > 1) ? 
            (deckMeasure.value.width-deckCardDimensions.value.width)/(deckBottomSideFrontFacesLength.value-1) 
            : 
            0
        :
        null
    })
    const deckBottomSidePreviousSpaceBetweenCards = useDerivedValue(()=>{
        return (
            deckMeasure.value && 
            deckBottomSideCardsPreviousTotalWidth.value !== null && 
            deckCardDimensions.value && 
            deckBottomSidePreviousFrontFacesLength.value !== null
        ) ?
        deckBottomSideCardsPreviousTotalWidth.value < deckMeasure.value.width ? 
            deckCardDimensions.value.width 
            : 
            (deckBottomSidePreviousFrontFacesLength.value > 1) ? 
                (deckMeasure.value.width-deckCardDimensions.value.width)/(deckBottomSidePreviousFrontFacesLength.value - 1) 
                : 
                0
        :
        null
    })
    const deckBottomSideCardsMinimumLeft = useDerivedValue(()=>{
        return (
            deckMeasure.value && 
            deckBottomSideCardsTotalWidth.value !== null && 
            deckCardDimensions.value
        ) ? 
            deckBottomSideCardsTotalWidth.value < deckMeasure.value.width ?
                -(deckBottomSideCardsTotalWidth.value)/2 + deckCardDimensions.value.width/2
                :
                -(deckMeasure.value.width-deckCardDimensions.value.width)/2
            :
            null
    })
    const deckBottomSideCardsPreviousMinimumLeft = useDerivedValue(()=>{
        return (
            deckMeasure.value && 
            deckBottomSideCardsPreviousTotalWidth.value !== null && 
            deckCardDimensions.value
        ) ? 
            deckBottomSideCardsPreviousTotalWidth.value < deckMeasure.value.width ?
                -(deckBottomSideCardsPreviousTotalWidth.value)/2 + deckCardDimensions.value.width/2
                :
                -(deckMeasure.value.width-deckCardDimensions.value.width)/2
            :
            null
    })
    const deckBottomSideSelectedCardPage = useDerivedValue(()=>{
        return (
            deckBottomSideSelectedCardIndex.value !== null &&
            deckBottomSideCardsPreviousMinimumLeft.value !== null &&
            deckBottomSidePreviousSpaceBetweenCards.value !== null && 
            deckBottomSidePageCenter.value !== null
        ) ? {
            x:
                deckBottomSidePageCenter.value.pageX + 
                deckBottomSideCardsPreviousMinimumLeft.value + 
                (deckBottomSideSelectedCardIndex.value * deckBottomSidePreviousSpaceBetweenCards.value)
            ,
            y:deckBottomSidePageCenter.value.pageY
        }
        :
        null
    })

    const cursorDimensions = useDerivedValue(()=>{
        return deckCardDimensions.value ? {
            heigth:deckCardDimensions.value.width * cursorScaleRatio.value,
            width:deckCardDimensions.value.width * cursorScaleRatio.value
        } : null
    })
    const cursorCenterToDeckBottomSidePage = useDerivedValue(()=>{
        return (
            deckBottomSidePageCenter.value && 
            cursorGestureMeasure.value && 
            cursorDimensions.value
        ) ? {
            pageX:(deckBottomSidePageCenter.value.pageX - cursorGestureMeasure.value.pageX) - cursorDimensions.value.width/2,
            pageY:(deckBottomSidePageCenter.value.pageY - cursorGestureMeasure.value.pageY) - cursorDimensions.value.heigth/2
        }
        :
        null
    })
    const cursorMaximumRightTranslateX = useDerivedValue(()=>{
        return (
            deckBottomSideSpaceBetweenCards.value !== null && 
            deckBottomSideFrontFacesIndexLength.value !== null
        ) ? 
            deckBottomSideSpaceBetweenCards.value * deckBottomSideFrontFacesIndexLength.value
            :
            null
    })
    const cursorPreviousMaximumRightTranslateX = useDerivedValue(()=>{
        return (
            deckBottomSidePreviousSpaceBetweenCards.value !== null && 
            deckBottomSidePreviousFrontFacesIndexLength.value !== null
        ) ? 
            deckBottomSidePreviousSpaceBetweenCards.value * deckBottomSidePreviousFrontFacesIndexLength.value
            :
            null
    })

    
    const handleShuffleDeck = useCallback(()=>{
        const frontFacesLength = tarotGameDataWithoutBackground.tarotDeck.frontFaces.length
        for(let i = 0 ; i < frontFacesLength; i++){
            let randomNum = Math.floor((Math.random()*(tarotGameDataWithoutBackground.tarotDeck.frontFaces.length)))
            let tempFrontFace = tarotGameDataWithoutBackground.tarotDeck.frontFaces[i]
            tarotGameDataWithoutBackground.tarotDeck.frontFaces[i] = props.tarotGameDataWithoutBackground.tarotDeck.frontFaces[randomNum]
            tarotGameDataWithoutBackground.tarotDeck.frontFaces[randomNum] = tempFrontFace
        }
        return tarotGameDataWithoutBackground.tarotDeck
    },[])

    const handleSetInitalDeckSideAndIndexToCards = useCallback(()=>{
        const newFrontFaces = tarotGameDataWithoutBackground.tarotDeck.frontFaces.map((cardFace,index)=>{
            let newCardFace:TTarotGameCardDeckSideData & TTarotGameCardFaceData={
                ...cardFace,
                deckSide:'bottomSide',
                index:index
            }
            return newCardFace
        })

        let newDeck:TTarotGameDeckDataWithDeckSide = {
            ...tarotGameDataWithoutBackground.tarotDeck,
            frontFaces:newFrontFaces
        }

        setDeck(newDeck)
    },[tarotGameDataWithoutBackground.tarotDeck])

    const handleDeckSideAndCardsIndex = useCallback((selectedCardIndex:number)=>{
        if(deck !== null){

            const topSideTotalCardLength = deck.frontFaces.filter((frontFace)=>frontFace.deckSide === 'topSide').length
            
            const newFrontFaces = deck.frontFaces.map((frontFace,index)=>{
                if(frontFace.index === selectedCardIndex){
                    if(frontFace.deckSide === 'bottomSide'){
                        frontFace = {
                            ...frontFace,
                            index:topSideTotalCardLength,
                            deckSide:'topSide'
                        }
                    }
                }
                else{
                    if(frontFace.deckSide === 'bottomSide'){
                        if(frontFace.index > selectedCardIndex){
                            frontFace = {
                                ...frontFace,
                                index:frontFace.index-1
                            }
                        }
                    }
                }

                return frontFace
            })

            deckTopSideSelectedCardIndex.value = topSideTotalCardLength
            deckBottomSideSelectedCardIndex.value = selectedCardIndex

            setDeck((prev)=>(prev ? {
                ...prev,
                frontFaces:newFrontFaces
            } : prev))

        }
    },[deck])

    const handleTarotCursorAndDeckAfterDrawCart = useCallback((
        cursorStoppedIndex:number
    )=>{
        if(
            deckRef.current !== null && 
            cursorRef.current !== null
        ){
            deckBottomSidePreviousFrontFacesLength.value = deckBottomSideFrontFacesLength.value
            deckTopSidePreviousFrontFacesLength.value = deckTopSideFrontFacesLength.value
            tarotGameDrawnedCardCount.current += 1

            deckRef.current.handlePrepareCardsPhase(cursorStoppedIndex)

            handleDeckSideAndCardsIndex(cursorStoppedIndex)

        }
    },[handleDeckSideAndCardsIndex])   

    const handleTarotCursorDrawCart = useCallback(()=>{
        if(
            cursorRef.current !== null && 
            deckRef.current !== null &&
            deckBottomSideFrontFacesLength.value
        ){
            cursorRef.current.handleDrawCart(
                handleTarotCursorAndDeckAfterDrawCart
            )
        }
    },[handleTarotCursorAndDeckAfterDrawCart])

    const handleTarotGameCursorGesture = useCallback(()=>{
        if(deckRef.current && cursorRef.current){
            const checkCursor = cursorRef.current.getCurrenCursorPhase()
            if(checkCursor === 'selectingCart'){
                handleTarotCursorDrawCart()
            }
        }
    },[handleTarotCursorDrawCart])

    const handleBottomDeckStartGame = useCallback(()=>{
        if(deckRef.current && cursorRef.current){
            deckRef.current.handleStartGame(
                cursorRef.current.handleStartCursorAnimation
            )
            isDeckReady.value = true
        }
    },[])


    const handleEndOfGame = useCallback((newArray:Array<TTarotGameCardFaceData & TTarotGameCardDeckSideData>)=>{
        if(
            deckRef.current &&
            tarotGameDeckTopSideCardEndingLayoutBiggestLenght
        ){
            deckPhase.value = 'endGame'
            cardScaleRatio.value = withTiming(
                1/tarotGameDeckTopSideCardEndingLayoutBiggestLenght,
                {
                    duration:cardEndingLayoutAnimationDuration
                }
            )
            deckCardStartAndEndAnimationInterpolateToggle.value = withTiming(
                1,
                {
                    duration:cardEndingLayoutAnimationDuration
                }
            )
            const newArrayDeleteBottomSide = newArray.filter((frontFace)=>frontFace.deckSide !== 'bottomSide')
            setDeck((prev)=>(prev ? {
                ...prev,
                frontFaces:newArrayDeleteBottomSide
            } : prev))
            setIsGameEnded(true)
        }
    },[])


    useAnimatedReaction(
        ()=>[
            deckCardDimensions.value,
            deckBottomSideCardsMinimumLeft.value,
            deckBottomSideSpaceBetweenCards.value,
            cursorCenterToDeckBottomSidePage.value,
            cursorDimensions.value,
            cursorMaximumRightTranslateX.value
        ],
        ()=>{
            if(
                deckCardDimensions.value !== null &&
                deckBottomSideCardsMinimumLeft.value !== null &&
                deckBottomSideSpaceBetweenCards.value !== null  &&
                cursorDimensions.value !== null &&
                cursorCenterToDeckBottomSidePage.value !== null &&
                cursorMaximumRightTranslateX.value !== null &&
                !isDeckReady.value
            ){
                runOnJS(handleBottomDeckStartGame)()
            }
        }
    )

    useEffect(()=>{
        handleShuffleDeck()
        handleSetInitalDeckSideAndIndexToCards()
    },[handleShuffleDeck,handleSetInitalDeckSideAndIndexToCards])
    
    useEffect(()=>{
        if(
            deck !== null &&
            deckRef.current &&
            cursorRef.current
        ){
            const topSideFrontFacesLenght = deck.frontFaces.filter((card)=>card.deckSide === 'topSide').length 
            if(
                topSideFrontFacesLenght >=1 &&
                deckTopSideSelectedCardIndex.value !== null &&
                deckBottomSideSelectedCardIndex.value !== null
            ){
                deckRef.current.handleReOrdinateCards(
                    deckTopSideSelectedCardIndex.value,
                    deckBottomSideSelectedCardIndex.value
                )

                deckRef.current.handleTopSideDeckCardsZIndex(
                    deckBottomSideSelectedCardIndex.value,
                    deckTopSideSelectedCardIndex.value
                )

                deckRef.current.handleMoveTarotCardFromBottomDeckToTopDeck(
                    deckTopSideSelectedCardIndex.value,
                    cursorAndCardMoveToTopSideDeckDuration
                )

                cursorRef.current.handleMoveCursorToTopkAndBackToBottomDeck(
                    cursorAndCardMoveToTopSideDeckDuration,
                    tarotGameDrawnedCardCount.current === tarotGameDrawningCardNumber ? (
                    ()=>handleEndOfGame(deck.frontFaces)
                    )
                    :
                    (
                        undefined
                    )
                )
            }
        }
    },[deck])

    return{
        isDeckReady,
        isGameEnded,
        cursorGestureMeasure,
        deck,
        deckRef,
        deckPhase,
        deckMeasure,
        deckCardDimensions,
        deckBottomSidePageCenter,
        deckBottomSideSpaceBetweenCards,
        deckBottomSidePreviousSpaceBetweenCards,
        deckBottomSideCardsMinimumLeft,
        deckBottomSideCardsPreviousMinimumLeft,
        deckBottomSideFrontFacesIndexLength,
        deckBottomSidePreviousFrontFacesIndexLength,
        deckBottomSideSelectedCardPage,
        deckTopSidePageCenter,
        deckTopSideSpaceBetweenCards,
        deckTopSidePreviousSpaceBetweenCards,
        deckTopSideCardsMinimumLeft,
        deckTopSideCardsPreviousMinimumLeft,
        deckTopSideSelectedCardPage,
        cursorRef,
        cursorMeasure,
        cursorDimensions,
        cursorCenterToDeckBottomSidePage,
        cursorMaximumRightTranslateX,
        cursorPreviousMaximumRightTranslateX,
        cardEndingLayoutAnimationDuration,
        tarotGameDeckTopSideCardEndingLayout,
        handleTarotGameCursorGesture,
    }
}


export default {
    useTarotGameInnerContainerHook
}

