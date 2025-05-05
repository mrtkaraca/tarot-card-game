import { useRef } from "react"
import { 
    useAnimatedReaction,
    useSharedValue 
} from "react-native-reanimated"

import { TTarotGameSelectionsPaginationRefProps } from "../TarotGameSelectionsPagination/type"

import { TarotGameSelectionsPaginationData } from "./helper"
import { TTarotGameSelectionPaginationData, TTarotGameSelectionsPaginationContainerHookProps } from "./type"


export default {}

export const useTarotGameSelectionsPaginationContainerHook = (props:TTarotGameSelectionsPaginationContainerHookProps)=>{
    const tarotGameSelectionsPaginationRef = useRef<TTarotGameSelectionsPaginationRefProps>(null)

    const tarotGameSelectionPaginationCurrentIndex = useSharedValue(0)
    const tarotGameSelectionPaginationCurrentId = useSharedValue<TTarotGameSelectionPaginationData['id']>(TarotGameSelectionsPaginationData[0].id)

    const tarotGameSelectionsPaginationDataIndexLength = TarotGameSelectionsPaginationData.length - 1

    useAnimatedReaction(
        ()=>tarotGameSelectionPaginationCurrentIndex,
        ()=>{
            tarotGameSelectionPaginationCurrentId.value = TarotGameSelectionsPaginationData[tarotGameSelectionPaginationCurrentIndex.value].id
        }
    )
    return{
        tarotGameSelectionsPaginationRef,
        TarotGameSelectionsPaginationData,
        tarotGameSelectionPaginationCurrentIndex,
        tarotGameSelectionPaginationCurrentId,
        tarotGameSelectionsPaginationDataIndexLength
    }
}