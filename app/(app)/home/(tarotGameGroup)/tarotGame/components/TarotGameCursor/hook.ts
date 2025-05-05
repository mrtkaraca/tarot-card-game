import { 
    useCallback, 
    useImperativeHandle, 
    useLayoutEffect
} from "react"
import { 
    cancelAnimation, 
    useAnimatedStyle, 
    useDerivedValue, 
    useSharedValue, 
    Easing, 
    withSpring, 
    withTiming,
    WithSpringConfig,
    runOnJS, 
    interpolate, 
    WithTimingConfig, 
    withRepeat,
    withSequence,
    Extrapolation,
    useAnimatedReaction,
    runOnUI,
    measure,
    useAnimatedRef,
    MeasuredDimensions
} from "react-native-reanimated"

import { 
    TTarotCursorDirection,
    TTarotCursorPhases,
    TTarotGameCursorHookProps, 
    TTarotGameCursorRefProps 
} from "./type"

export default undefined

export const useTarotGameCursorHook = (props:TTarotGameCursorHookProps,ref:React.ForwardedRef<TTarotGameCursorRefProps>)=>{


    const {
        cursorMeasure,
        cursorDimensions,
        cursorMaximumRight,
        cursorPreviousMaximumRight,
        spaceBetweenCards,
        cardsMinimumLeft,
        cardsPreviousMinimumLeft,
        cursorCenterToDeckBottomSidePage,
        topDeckSelectedCardPage,
        bottomDeckSelectedCardPage,
        bottomDeckFrontFacesIndexLength,
        bottomDeckPreviousFrontFacesIndexLength
    } = props


    const cursorAnimationDuration = 2000

    const moveCursorToSelectedCardConfig:WithSpringConfig = {
        damping: 100,
    }

    const cursorViewRef = useAnimatedRef()

    const cursorAnimationPhases = useSharedValue<TTarotCursorPhases>(null)
    const cursorIndex = useSharedValue(0)
    const cursorPreviousIndex = useSharedValue(0)
    const cursorTranslateX = useSharedValue(0)
    const cursorMoveToTopDeckToggle = useSharedValue<0 | 1>(0)
    const cursorMoveToBottomDeckToggle = useSharedValue<0 | 1>(0)
    const cursorMoveToTopTranslate = useSharedValue({
        x:0,
        y:0
    })
    const cursorMinimumLeftTranslateX = useSharedValue(0)
    const cursorAnimationDirection = useSharedValue<TTarotCursorDirection>('right')

    const cursorCenterToBottomDeckTranslate = useDerivedValue(()=>{
        return cursorCenterToDeckBottomSidePage.value ? {
            x:cursorCenterToDeckBottomSidePage.value.pageX,
            y:cursorCenterToDeckBottomSidePage.value.pageY
        }
        :
        {
            x:0,
            y:0
        }
    })
    const cardsFrontFacesIndexsLength = useDerivedValue(()=>{
        return bottomDeckFrontFacesIndexLength.value !== null ?
            bottomDeckFrontFacesIndexLength.value
            :
            0
    })
    const cursorVecolityMS = useDerivedValue(()=>{
        return cursorMaximumRight.value !== null ?
            (cursorMaximumRight.value / cursorAnimationDuration)
            :
            0
    })
    const cursorDurationPerCard = useDerivedValue(()=>{
        return spaceBetweenCards.value !== null ? 
            spaceBetweenCards.value / cursorVecolityMS.value
            :
            0
    })
    const cursorTranslateXInterpolate = useDerivedValue(()=>{
        return (
            cursorMaximumRight.value !== null && 
            bottomDeckFrontFacesIndexLength.value !== null
        ) ? interpolate(
            cursorIndex.value,
            [0,bottomDeckFrontFacesIndexLength.value],
            [0,cursorMaximumRight.value],
            Extrapolation.CLAMP
        )
        :
        0
    })
    const cursorPreviousranslateXInterpolate = useDerivedValue(()=>{
        return (
            cursorPreviousMaximumRight.value !== null && 
            bottomDeckPreviousFrontFacesIndexLength.value !== null
        ) ? interpolate(
            cursorPreviousIndex.value,
            [0,bottomDeckPreviousFrontFacesIndexLength.value],
            [0,cursorPreviousMaximumRight.value],
            Extrapolation.CLAMP
        )
        :
        0
    })
    const cursorMoveToTopDeckTranslateXInterpolate = useDerivedValue(()=>{
        return (
            topDeckSelectedCardPage.value &&
            bottomDeckSelectedCardPage.value
        ) ? 
        interpolate(
            cursorMoveToTopDeckToggle.value,
            [0,1],
            [0,topDeckSelectedCardPage.value.x - bottomDeckSelectedCardPage.value.x],
            Extrapolation.CLAMP
        )
        :
        0
    })
    const cursorMoveToTopDeckTranslateYInterpolate = useDerivedValue(()=>{
        return (
            topDeckSelectedCardPage.value &&
            bottomDeckSelectedCardPage.value
        ) ? 
        interpolate(
            cursorMoveToTopDeckToggle.value,
            [0,1],
            [0,topDeckSelectedCardPage.value.y - bottomDeckSelectedCardPage.value.y],
            Extrapolation.CLAMP
        )
        :
        0
    })
    const cursorMoveToBottomDeckMinimumLeftInterpolate = useDerivedValue(()=>{
        return(
            (
                cardsMinimumLeft.value !== null &&
                cardsPreviousMinimumLeft.value !== null
            )
        ) ? interpolate(
            cursorMoveToBottomDeckToggle.value,
            [0,1],
            [cardsPreviousMinimumLeft.value,cardsMinimumLeft.value]
        )
        :
        0
    })
    const cursorMoveToBottomDeckCursorTranslateXInterpolate = useDerivedValue(()=>{
        return(
            (
                cursorTranslateXInterpolate.value !== null &&
                cursorPreviousranslateXInterpolate.value !== null
            )
        ) ? interpolate(
            cursorMoveToBottomDeckToggle.value,
            [0,1],
            [cursorPreviousranslateXInterpolate.value,cursorTranslateXInterpolate.value]
        )
        :
        0
    })

    const cursorAnimatedStyle = useAnimatedStyle(()=>({
        height:cursorDimensions.value ? cursorDimensions.value.heigth : 0,
        width:cursorDimensions.value ? cursorDimensions.value.width : 0,
        transform:[
            {translateX:cursorCenterToBottomDeckTranslate.value.x},
            {translateY:cursorCenterToBottomDeckTranslate.value.y},
            {translateX:cursorMinimumLeftTranslateX.value},
            {translateX:cursorTranslateX.value},
            {translateX:cursorMoveToTopTranslate.value.x},
            {translateY:cursorMoveToTopTranslate.value.y},
        ]
    }))

    const handleOnLayout = useCallback(()=>{
        runOnUI(()=>{
            if(cursorViewRef){
                const mes = measure(cursorViewRef)
                if(mes){
                    cursorMeasure.value = mes
                }
            }
        })()
    },[])
    
    const handleCalculateCursorAnimationDuration = useCallback(()=>{
        if(cursorAnimationDirection.value === 'right'){
            return (cardsFrontFacesIndexsLength.value - cursorIndex.value) * cursorDurationPerCard.value
        }
        else{
            return cursorIndex.value * cursorDurationPerCard.value
        }
    },[])

    const cursorAnimationToLeft = useCallback(()=>{
        const duration = handleCalculateCursorAnimationDuration();
        cursorIndex.value = withTiming(
            0,
            {
                duration:duration
            },
            (finished)=>{
                if(finished){
                    cursorAnimationDirection.value = 'right'
                    runOnJS(cursorAnimationToRight)()
                }
            }
        )
    },[])

    const cursorAnimationToRight = useCallback(()=>{
        const duration = handleCalculateCursorAnimationDuration();
        cursorIndex.value = withTiming(
            cardsFrontFacesIndexsLength.value,
            {
                duration:duration
            },
            (finished)=>{
                if(finished){
                    cursorAnimationDirection.value = 'left'
                    runOnJS(cursorAnimationToLeft)()
                }
            }
        )
    },[])

    const startCursorAnimation = useCallback(()=>{
        cursorAnimationDirection.value === 'right' ?
        cursorAnimationToRight()
        :
        cursorAnimationToLeft()  
    },[cursorAnimationToLeft,cursorAnimationToRight])

    const getCurrenCursorPhase = useCallback(()=>{
        return cursorAnimationPhases.value
    },[])

    const getCursorCurrentIndex = useCallback(()=>{
        'worklet'
        return Math.round(cursorIndex.value)
    },[])

    const handleStartCursorAnimation = useCallback(()=>{
        cursorAnimationPhases.value = 'selectingCart'
        startCursorAnimation();
    },[startCursorAnimation])

    const handleStopCursorAnimation = useCallback(()=>{
        cancelAnimation(cursorIndex)
    },[])

    const handleMoveCursorToSelectedCard = useCallback((
        callback:()=>void
    )=>{
        cursorAnimationPhases.value = 'moveToSelectedCart'
        const cursorStoppedIndex = getCursorCurrentIndex();
        cursorPreviousIndex.value = cursorStoppedIndex
        cursorIndex.value = withSpring(
            cursorStoppedIndex,
            moveCursorToSelectedCardConfig,
            (finished)=>{
                if(!finished){
                    cursorIndex.value = cursorStoppedIndex
                }
                runOnJS(callback)()
            }
        )
    },[])
    
    const handleDrawCart = useCallback((
        callback:(cursorStoppedIndex:number)=>void
    )=>{
        handleStopCursorAnimation();
        const cursorStoppedIndex = getCursorCurrentIndex();
        handleMoveCursorToSelectedCard(
            ()=>{
                callback(cursorStoppedIndex)
            }
        )
    },[])


    const handleMoveCursorToTopkAndBackToBottomDeck:TTarotGameCursorRefProps['handleMoveCursorToTopkAndBackToBottomDeck'] = useCallback((
        cursorMoveToTopDeckDuration,
        callback
    )=>{
        cursorAnimationPhases.value = 'moveToTopDeck'
        cursorMoveToTopDeckToggle.value = withSequence(
            withTiming(
                1,
                {
                    duration:cursorMoveToTopDeckDuration
                },
                (finished)=>{
                    if(finished){
                        cursorMoveToBottomDeckToggle.value = 0
                        if(cursorIndex.value > cardsFrontFacesIndexsLength.value && cardsFrontFacesIndexsLength.value !== null){
                            cursorPreviousIndex.value = cursorIndex.value
                            cursorIndex.value -= 1
                        }
                        cursorAnimationPhases.value = 'moveToBottomDeck'
                        cursorMoveToBottomDeckToggle.value = withTiming(
                            1,
                            {
                                duration:cursorMoveToTopDeckDuration
                            }
                        )
                    }
                }
            ),
            withTiming(
                0,
                {
                    duration:cursorMoveToTopDeckDuration
                },
                (finished)=>{
                    if(finished){
                        if(callback){
                            runOnJS(callback)()
                        }
                        else{
                            runOnJS(handleStartCursorAnimation)()
                        }
                    }
                }
            )
        )


    },[])

    useAnimatedReaction(
        ()=>[
            cursorIndex,
            cursorTranslateXInterpolate,
            cursorPreviousranslateXInterpolate
        ],
        ()=>{
            if(
                cursorAnimationPhases.value === 'selectingCart' || 
                cursorAnimationPhases.value === 'moveToSelectedCart' ||
                cursorAnimationPhases.value === 'moveToBottomDeck'
            ){
                cursorTranslateX.value = cursorTranslateXInterpolate.value
            }
            if(
                cursorAnimationPhases.value === 'moveToTopDeck'
            ){
                cursorTranslateX.value = cursorPreviousranslateXInterpolate.value
            }

        }
    )

    useAnimatedReaction(
        ()=>[
            cardsMinimumLeft,
            cardsPreviousMinimumLeft
        ],
        ()=>{
            if(
                cursorAnimationPhases.value === null ||
                cursorAnimationPhases.value === 'selectingCart' || 
                cursorAnimationPhases.value === 'moveToSelectedCart'
            ){
                cursorMinimumLeftTranslateX.value = cardsMinimumLeft.value ? cardsMinimumLeft.value : 0
            }
            if(
                cursorAnimationPhases.value === 'moveToTopDeck'
            ){
                cursorMinimumLeftTranslateX.value = cardsPreviousMinimumLeft.value ? cardsPreviousMinimumLeft.value : 0
            }
        }
    )

    useAnimatedReaction(
        ()=>cursorMoveToTopDeckToggle,
        ()=>{
            if(
                cursorAnimationPhases.value === 'moveToTopDeck' ||
                cursorAnimationPhases.value === 'moveToBottomDeck'
            ){
                cursorMoveToTopTranslate.value = {
                    x:cursorMoveToTopDeckTranslateXInterpolate.value,
                    y:cursorMoveToTopDeckTranslateYInterpolate.value
                }
            }
        }
    )

    useAnimatedReaction(
        ()=>[
            cursorMoveToBottomDeckToggle,
            cursorMoveToBottomDeckMinimumLeftInterpolate,
            cursorMoveToBottomDeckCursorTranslateXInterpolate
        ],
        ()=>{
            if(cursorAnimationPhases.value === 'moveToBottomDeck'){
                cursorMinimumLeftTranslateX.value = cursorMoveToBottomDeckMinimumLeftInterpolate.value
                cursorTranslateX.value = cursorMoveToBottomDeckCursorTranslateXInterpolate.value
            }
        }
    )


    useLayoutEffect(()=>{
        handleOnLayout()
    },[])

    useImperativeHandle(
        ref,
        ()=>{
            return{
                getCursorCurrentIndex,
                getCurrenCursorPhase,
                handleDrawCart,
                handleStartCursorAnimation,
                handleStopCursorAnimation,
                handleMoveCursorToTopkAndBackToBottomDeck,
            }
        }
    )

    return{
        cursorViewRef,
        cursorAnimatedStyle,
        handleOnLayout
    }
}