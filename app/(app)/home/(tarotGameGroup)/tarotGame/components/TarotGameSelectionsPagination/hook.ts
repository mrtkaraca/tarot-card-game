import { 
    useCallback, 
    useImperativeHandle 
} from "react"
import { useWindowDimensions } from "react-native"
import { 
    Extrapolation,
    interpolate,
    runOnUI,
    useAnimatedReaction,
    useAnimatedStyle, 
    useDerivedValue, 
    useSharedValue, 
    withTiming
} from "react-native-reanimated"

import { 
    TTarotGameSelectionsPaginationHookProps, 
    TTarotGameSelectionsPaginationRefProps, 
    TTarotGameSelectionsPaginationPhases
} from "./type"

export default {}

export const useTarotGameSelectionsPaginationHook = (props:TTarotGameSelectionsPaginationHookProps,ref:React.ForwardedRef<TTarotGameSelectionsPaginationRefProps>)=>{

    const {
        tarotGameSelectionPaginationCurrentIndex,
        tarotGameSelectionsPaginationDataIndexLength
    } = props

    const { width } = useWindowDimensions();

    const tarotGameSelectionsPaginationAnimationDuration = 500

    const tarotGameSelectionPaginationPrevIndex = useSharedValue(0)
    const tarotGameSelectionPaginationToggle = useSharedValue<0 | 1>(0)
    const tarotGameSelectionPaginationTranslateX = useSharedValue(0)
    const tarotGameSelectionPaginationPhase = useSharedValue<TTarotGameSelectionsPaginationPhases>(null)

    const selectionsPaginationDataIndexLength = useDerivedValue(()=>{
        return tarotGameSelectionsPaginationDataIndexLength
    })

    const tarotGameSelectionPaginationTranslateXInterpolate = useDerivedValue(()=>{
        return interpolate(
            tarotGameSelectionPaginationCurrentIndex.value,
            [0,selectionsPaginationDataIndexLength.value],
            [0,-(selectionsPaginationDataIndexLength.value * width)],
            Extrapolation.CLAMP
        )
    })

    const tarotGameSelectionPaginationPreviousTranslateXInterpolate = useDerivedValue(()=>{
        return interpolate(
            tarotGameSelectionPaginationPrevIndex.value,
            [0,selectionsPaginationDataIndexLength.value],
            [0,-(selectionsPaginationDataIndexLength.value * width)],
            Extrapolation.CLAMP
        )
    })

    const tarotGameSelectionPaginationTranslateXToggleInterpolate = useDerivedValue(()=>{
        return interpolate(
            tarotGameSelectionPaginationToggle.value,
            [0,1],
            [tarotGameSelectionPaginationPreviousTranslateXInterpolate.value,tarotGameSelectionPaginationTranslateXInterpolate.value],
            Extrapolation.CLAMP
        )
    })

    const tarotGameSelectionsPaginationContainerAnimatedStyle = useAnimatedStyle(()=>{
        return{
            transform:[
                {translateX:tarotGameSelectionPaginationTranslateX.value}
            ]
        }
    })

    const handleTarotGameSelectionPaginationTranslateX = useCallback(()=>{
        tarotGameSelectionPaginationToggle.value = withTiming(
            1,
            {
                duration:tarotGameSelectionsPaginationAnimationDuration
            },
            (finished)=>{
                if(finished){
                    tarotGameSelectionPaginationPhase.value = 'idle'
                }
            }
        )
    },[])

    const handlePreviousPagination = useCallback(()=>{
        if(tarotGameSelectionPaginationCurrentIndex.value !== 0){
            tarotGameSelectionPaginationToggle.value = 0
            tarotGameSelectionPaginationPhase.value = 'pagination'
            tarotGameSelectionPaginationTranslateX.value = tarotGameSelectionPaginationTranslateXInterpolate.value
            tarotGameSelectionPaginationPrevIndex.value = tarotGameSelectionPaginationCurrentIndex.value
            tarotGameSelectionPaginationCurrentIndex.value -= 1
            handleTarotGameSelectionPaginationTranslateX()
        }
    },[])

    const handleNextPagination = useCallback(()=>{
        if(tarotGameSelectionPaginationCurrentIndex.value < selectionsPaginationDataIndexLength.value){
            tarotGameSelectionPaginationToggle.value = 0
            tarotGameSelectionPaginationPhase.value = 'pagination'
            tarotGameSelectionPaginationTranslateX.value = tarotGameSelectionPaginationTranslateXInterpolate.value
            tarotGameSelectionPaginationPrevIndex.value = tarotGameSelectionPaginationCurrentIndex.value
            tarotGameSelectionPaginationCurrentIndex.value += 1
            handleTarotGameSelectionPaginationTranslateX()
        }
    },[])

    useAnimatedReaction(
        ()=>tarotGameSelectionPaginationToggle,
        ()=>{
            if(tarotGameSelectionPaginationPhase.value === 'pagination'){
                tarotGameSelectionPaginationTranslateX.value = tarotGameSelectionPaginationTranslateXToggleInterpolate.value
            }
        }
    )

    useAnimatedReaction(
        ()=>tarotGameSelectionPaginationTranslateXInterpolate,
        ()=>{
            if(tarotGameSelectionPaginationPhase.value === 'idle'){
                tarotGameSelectionPaginationTranslateX.value = tarotGameSelectionPaginationTranslateXInterpolate.value
            }
        }
    )

    useImperativeHandle(
        ref,
        ()=>{
            return{
                handlePreviousPagination,
                handleNextPagination
            }
        }
    )

    return{
        tarotGameSelectionsPaginationContainerAnimatedStyle
    }
}