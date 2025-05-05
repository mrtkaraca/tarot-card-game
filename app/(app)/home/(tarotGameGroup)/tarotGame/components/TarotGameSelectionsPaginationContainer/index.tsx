import { View } from "react-native"

import { TarotGameSelectionsFooterContainer } from "../TarotGameSelectionsFooterContainer"
import { TarotGameSelectionsPagination } from "../TarotGameSelectionsPagination"

import { TTarotGameSelectionsPaginationContainerProps } from "./type"
import { useTarotGameSelectionsPaginationContainerHook } from "./hook"

export default {}

export const TarotGameSelectionsPaginationContainer = (props:TTarotGameSelectionsPaginationContainerProps)=>{

    const {
        handleOnFetchStart
    } = props

    const {
        tarotGameSelectionsPaginationRef,
        TarotGameSelectionsPaginationData,
        tarotGameSelectionPaginationCurrentIndex,
        tarotGameSelectionPaginationCurrentId,
        tarotGameSelectionsPaginationDataIndexLength
    } = useTarotGameSelectionsPaginationContainerHook({})

      return(
            <View
                style={{flex:1}}
            >
                <TarotGameSelectionsPagination
                    ref={tarotGameSelectionsPaginationRef}
                    selectionsPaginationData={TarotGameSelectionsPaginationData}
                    tarotGameSelectionPaginationCurrentIndex={tarotGameSelectionPaginationCurrentIndex}
                    tarotGameSelectionsPaginationDataIndexLength={tarotGameSelectionsPaginationDataIndexLength}
                />
                <TarotGameSelectionsFooterContainer
                    tarotGameSelectionsPaginationContainerRef={tarotGameSelectionsPaginationRef}
                    tarotGameSelectionPaginationCurrentIndex={tarotGameSelectionPaginationCurrentIndex}
                    tarotGameSelectionPaginationCurrentId={tarotGameSelectionPaginationCurrentId}
                    tarotGameSelectionsPaginationDataIndexLength={tarotGameSelectionsPaginationDataIndexLength}
                    handleOnFetchStart={handleOnFetchStart}
                />
            </View>
        )
}