import { SharedValue } from "react-native-reanimated"

import { TTarotGameSelectionsPaginationRefProps } from "../TarotGameSelectionsPagination/type"
import { TTarotGameSelectionPaginationData, TTarotGameSelectionsPaginationContainerProps } from "../TarotGameSelectionsPaginationContainer/type"

export default {}

export type TTarotGameSelectionsFooterContainerProps = {
    tarotGameSelectionsPaginationContainerRef:React.RefObject<TTarotGameSelectionsPaginationRefProps | null>
    tarotGameSelectionPaginationCurrentIndex: SharedValue<number>
    tarotGameSelectionPaginationCurrentId: SharedValue<TTarotGameSelectionPaginationData['id']>
    tarotGameSelectionsPaginationDataIndexLength: number
    handleOnFetchStart:TTarotGameSelectionsPaginationContainerProps['handleOnFetchStart']
}

export type TTTarotGameSelectionsFooterContainerHookProps =  Pick<TTarotGameSelectionsFooterContainerProps,
    'tarotGameSelectionsPaginationContainerRef' |
    'tarotGameSelectionPaginationCurrentIndex' |
    'tarotGameSelectionPaginationCurrentId' |
    'handleOnFetchStart' 
>