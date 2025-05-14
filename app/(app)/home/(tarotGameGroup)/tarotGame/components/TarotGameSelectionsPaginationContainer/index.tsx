import { View } from "react-native"

import { TarotGameSelectionsFooterContainer } from "../TarotGameSelectionsFooterContainer"
import { TarotGameSelectionsPagination } from "../TarotGameSelectionsPagination"

import { TTarotGameSelectionsPaginationContainerProps } from "./type"
import { useTarotGameSelectionsPaginationContainerHook } from "./hook"
import { TarotGameSelectionsPaginationContainerStyle } from "./style"

export default {}

export const TarotGameSelectionsPaginationContainer = (props:TTarotGameSelectionsPaginationContainerProps)=>{

    const {
        tarotGameSelectionsPaginationData,
        handleOnFetchStart
    } = props

    const {
        tarotGameSelectionsPaginationRef,
        tarotGameSelectionPaginationCurrentIndex,
        tarotGameSelectionPaginationCurrentId,
    } = useTarotGameSelectionsPaginationContainerHook({
        tarotGameSelectionsPaginationData
    })

      return(
            <View
                style={TarotGameSelectionsPaginationContainerStyle.TarotGameSelectionsPaginationContainerContainer}
            >
                <TarotGameSelectionsPagination
                    ref={tarotGameSelectionsPaginationRef}
                    tarotGameSelectionsPaginationData={tarotGameSelectionsPaginationData}
                    tarotGameSelectionPaginationCurrentIndex={tarotGameSelectionPaginationCurrentIndex}
                    tarotGameSelectionsPaginationDataLength={tarotGameSelectionsPaginationData.length}
                />
                <TarotGameSelectionsFooterContainer
                    tarotGameSelectionsPaginationContainerRef={tarotGameSelectionsPaginationRef}
                    tarotGameSelectionPaginationCurrentIndex={tarotGameSelectionPaginationCurrentIndex}
                    tarotGameSelectionPaginationCurrentId={tarotGameSelectionPaginationCurrentId}
                    tarotGameSelectionsPaginationDataLength={tarotGameSelectionsPaginationData.length}
                    handleOnFetchStart={handleOnFetchStart}
                />
            </View>
        )
}