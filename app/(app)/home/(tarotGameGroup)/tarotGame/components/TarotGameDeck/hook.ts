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

export default undefined

export const useTarotGameDeckHook = (props:TTarotGameDeckHookProps)=>{

    const {
        ref,
        deckData,
        deckMeasure,
        deckBottomSideFrontFacesIndexLength,
        deckBottomSideSpaceBetweenCards
    } = props
    
    var cardReOrdinateAnimationDuration = 2000
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
        deckTopSideSelectedCardIndex
    )=>{
        if(tarotGameDeckCardsRef.current){
            tarotGameDeckCardsRef.current.forEach((cardRef,index)=>{
                if(
                    deckTopSideSelectedCardIndex !== index
                ){
                    if(deckData?.frontFaces[index].deckSide === 'topSide'){
                        cardRef.handleReOrdinateCard()
                    }
                    else{
                        
                    }
                }
            })
        }
    },[deckData])

    const handleTopSideDeckCardsZIndex:TTarotGameDeckRefProps['handleTopSideDeckCardsZIndex'] = useCallback((
        selectedCardDeckIndex
    )=>{
        if(
            tarotGameDeckCardsRef.current &&
            deckData?.frontFaces.length
        ){
            const topSideCardLength = deckData.frontFaces.filter((frontFace)=>frontFace.deckSide === 'topSide').length

            tarotGameDeckCardsRef.current.forEach((cardRef,index)=>{
                if(
                    deckData.frontFaces[index].deckSide === 'topSide'
                ){
                    let newZIndex = (selectedCardDeckIndex - topSideCardLength) + deckData.frontFaces[index].index
                    cardRef.handleCardZIndex(newZIndex)
                }
            })
        }
    },[deckData])

    const handleMoveTarotCardFromBottomDeckToTopDeck:TTarotGameDeckRefProps['handleMoveTarotCardFromBottomDeckToTopDeck'] = useCallback((
        deckTopSideSelectedCardIndex,
        cursorAndCardMoveToDeckTopSidekDuration
    )=>{
        if(tarotGameDeckCardsRef.current){
            tarotGameDeckCardsRef.current[deckTopSideSelectedCardIndex].handleMoveTarotCardFromBottomDeckToTopDeck(
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