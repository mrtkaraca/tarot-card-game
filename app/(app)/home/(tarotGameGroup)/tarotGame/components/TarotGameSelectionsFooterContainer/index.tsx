import { useCallback } from "react"
import { View } from "react-native"

import { TextButton } from "@/components/TextButton"

import { TTarotGameSelectionsFooterContainerProps } from "./type"
import { useTarotGameSelectionsFooterContainerHook } from "./hook"
import { TarotGameSelectionsFooterContainerStyle } from "./style"
import { TarotGameColors } from "@/constants/color"

export default {}

export const TarotGameSelectionsFooterContainer = (props:TTarotGameSelectionsFooterContainerProps)=>{

    const {
        tarotGameSelectionsPaginationContainerRef,
        tarotGameSelectionPaginationCurrentIndex,
        tarotGameSelectionPaginationCurrentId,
        tarotGameSelectionsPaginationDataLength,
        handleOnFetchStart
    } = props

    const {
        t,
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
            style={TarotGameSelectionsFooterContainerStyle.TarotGameSelectionsFooterContainerContainer}
        >
            <View>
                {tgspcis !== 0 &&
                    <TextButton
                        textButtonTextLabel={t('tarotGame.tarotGameSelectionsFooterContainer.leftButtonTextLabel')}
                        textButtonOpacityColor={TarotGameColors.TextButtons.buttonOpacityColor}
                        numberOfLines={1}
                        handleOnPress={handleTarotGameSelectionPaginationPrevious}
                    />
                }
            </View>
            <View>
                <TextButton
                    disabled={!tarotGameIsCurrentSelectionPaginationItemSelected}
                    textButtonTextLabel={tgspcis !== (tarotGameSelectionsPaginationDataLength-1) ? 
                        t('tarotGame.tarotGameSelectionsFooterContainer.rightButtonTextLabel')
                        : 
                        t('tarotGame.tarotGameSelectionsFooterContainer.rightButtonEndTextLabel')
                    }
                    textButtonOpacityColor={TarotGameColors.TextButtons.buttonOpacityColor}
                    numberOfLines={1}
                    handleOnPress={tgspcis !== (tarotGameSelectionsPaginationDataLength-1) ? 
                        handleTarotGameSelectionPaginationNext 
                        : 
                        handleTarotGameSelectionPaginatinOk
                    }
                    style={{
                        color:tarotGameIsCurrentSelectionPaginationItemSelected ? 
                            TarotGameColors.tarotGameSelectionsFooterContainer.currentPaginationItemIsSelected
                            : 
                            TarotGameColors.tarotGameSelectionsFooterContainer.currentPaginationItemIsNotSelected
                    }}
                />
            </View>
        </View>
    )
}