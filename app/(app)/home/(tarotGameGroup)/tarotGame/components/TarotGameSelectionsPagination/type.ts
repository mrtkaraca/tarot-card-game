import { SharedValue } from "react-native-reanimated"

import { TTarotGameSelectionsPaginationData } from "../TarotGameSelectionsPaginationContainer/type"

export default {}

export type TTarotGameSelectionsPaginationProps = {
    selectionsPaginationData:TTarotGameSelectionsPaginationData
    tarotGameSelectionPaginationCurrentIndex: SharedValue<number>
    tarotGameSelectionsPaginationDataIndexLength: number
}

export type TTarotGameSelectionsPaginationHookProps =  Pick<TTarotGameSelectionsPaginationProps,
    'tarotGameSelectionPaginationCurrentIndex' |
    'tarotGameSelectionsPaginationDataIndexLength'
>

export type TTarotGameSelectionsPaginationRefProps = {
    handlePreviousPagination: () => void
    handleNextPagination: () => void
}

export type TTarotGameSelectionsPaginationPhases = 'idle' | 'pagination' | null