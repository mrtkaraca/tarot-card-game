import { 
    RefObject,
    useCallback,
    useImperativeHandle,
    useLayoutEffect,
    useRef 
} from "react"
import { 
    measure,
    runOnUI,
    useAnimatedRef, 
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
        deckMeasure
    } = props
    
    var cardReOrdinateAnimationDuration = 2000
    var cardStartAnimationDuration = 3000

    const setTarotGameCardModalData = useTarotGameStore((state)=>state.setTarotGameCardModalData)

    const tarotGameDeckCardsRef = useRef<Array<TTarotGameCardRefProps>>([])
    
    const tarotGameDeckAnimatedRef = useAnimatedRef()

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

    const handleReOrdinateCards:TTarotGameDeckRefProps['handleReOrdinateCards'] = useCallback((
        deckTopSideSelectedCardIndex
    )=>{
        if(tarotGameDeckCardsRef.current){
            tarotGameDeckCardsRef.current.forEach((cardRef,index)=>{
                if(
                    deckTopSideSelectedCardIndex !== index
                ){
                    cardRef.handleReOrdinateCard()
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
        cardReOrdinateAnimationDuration,
        handleOnLayout,
        handleTarotGameDeckCardsRef,
        setTarotGameCardModalData
    }
}