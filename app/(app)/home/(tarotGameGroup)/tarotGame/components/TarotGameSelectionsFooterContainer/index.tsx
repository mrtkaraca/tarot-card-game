import { useCallback } from "react"
import { View } from "react-native"

import { TextButton } from "@/components/TextButton"

import { TTarotGameSelectionsFooterContainerProps } from "./type"
import { useTarotGameSelectionsFooterContainerHook } from "./hook"

export default {}

export const TarotGameSelectionsFooterContainer = (props:TTarotGameSelectionsFooterContainerProps)=>{

    const {
        tarotGameSelectionsPaginationContainerRef,
        tarotGameSelectionPaginationCurrentIndex,
        tarotGameSelectionPaginationCurrentId,
        tarotGameSelectionsPaginationDataIndexLength,
        handleOnFetchStart
    } = props

    const {
        tarotGameSelectionPaginationCurrentIndex:tgspcis,
        tarotGameIsCurrentSelectionPaginationItemSelected,
        handleTarotGameSelectionPaginationPrevious,
        handleTarotGameSelectionPaginationNext,
        handleTarotGameSelectionPaginatinOk
    } = useTarotGameSelectionsFooterContainerHook({
        tarotGameSelectionsPaginationContainerRef,
        tarotGameSelectionPaginationCurrentIndex,
        tarotGameSelectionPaginationCurrentId,
        handleOnFetchStart
    })


    return(
        <View
            style={{padding:8,justifyContent:'space-between',flexDirection:'row'}}
        >
            <View>
                {tgspcis !== 0 &&
                    <TextButton
                        textButtonTextLabel="Prev"
                        textButtonOpacityColor="#00000055"
                        numberOfLines={1}
                        handleOnPress={handleTarotGameSelectionPaginationPrevious}
                        style={{
                            color:'blue'
                        }}
                    />
                }
            </View>
            <View>
                <TextButton
                    disabled={!tarotGameIsCurrentSelectionPaginationItemSelected}
                    textButtonTextLabel={tgspcis !== (tarotGameSelectionsPaginationDataIndexLength) ? 'Next' : 'Ok'}
                    textButtonOpacityColor="#00000055"
                    numberOfLines={1}
                    handleOnPress={tgspcis !== tarotGameSelectionsPaginationDataIndexLength ? handleTarotGameSelectionPaginationNext : handleTarotGameSelectionPaginatinOk}
                    style={{
                        color:tarotGameIsCurrentSelectionPaginationItemSelected ? 'blue' : 'grey'
                    }}
                />
            </View>
        </View>
    )
}