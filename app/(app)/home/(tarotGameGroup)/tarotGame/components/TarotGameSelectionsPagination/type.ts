import { SharedValue } from "react-native-reanimated"

import { TTarotGameSelectionsPaginationData } from "../TarotGameSelectionsPaginationContainer/type"
import { RefObject } from "react"

export default {}

export type TTarotGameSelectionsPaginationProps = {
    ref:RefObject<TTarotGameSelectionsPaginationRefProps | null>
    tarotGameSelectionsPaginationData:TTarotGameSelectionsPaginationData
    tarotGameSelectionPaginationCurrentIndex: SharedValue<number>
    tarotGameSelectionsPaginationDataLength: number
}

export type TTarotGameSelectionsPaginationHookProps =  Pick<TTarotGameSelectionsPaginationProps,
    'ref' |
    'tarotGameSelectionPaginationCurrentIndex' |
    'tarotGameSelectionsPaginationDataLength'
>

export type TTarotGameSelectionsPaginationRefProps = {
    handlePreviousPagination: () => void
    handleNextPagination: () => void
}

export type TTarotGameSelectionsPaginationPhases = 'idle' | 'pagination' | null