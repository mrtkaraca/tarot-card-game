import { useRef } from "react"
import { 
    useAnimatedReaction,
    useSharedValue 
} from "react-native-reanimated"

import { TTarotGameSelectionsPaginationRefProps } from "../TarotGameSelectionsPagination/type"

import { 
    TTarotGameSelectionPaginationData, 
    TTarotGameSelectionsPaginationContainerHookProps, 
} from "./type"


export const useTarotGameSelectionsPaginationContainerHook = (props:TTarotGameSelectionsPaginationContainerHookProps)=>{

    const {
        tarotGameSelectionsPaginationData
    } = props

    const tarotGameSelectionsPaginationRef = useRef<TTarotGameSelectionsPaginationRefProps>(null)

    const tarotGameSelectionPaginationCurrentIndex = useSharedValue(0)
    const tarotGameSelectionPaginationCurrentId = useSharedValue<TTarotGameSelectionPaginationData['id']>(tarotGameSelectionsPaginationData[0].id)

    useAnimatedReaction(
        ()=>tarotGameSelectionPaginationCurrentIndex,
        ()=>{
            tarotGameSelectionPaginationCurrentId.value = tarotGameSelectionsPaginationData[tarotGameSelectionPaginationCurrentIndex.value].id
        }
    )
    return{
        tarotGameSelectionsPaginationRef,
        tarotGameSelectionPaginationCurrentIndex,
        tarotGameSelectionPaginationCurrentId,
    }
}

export default {
    useTarotGameSelectionsPaginationContainerHook
}