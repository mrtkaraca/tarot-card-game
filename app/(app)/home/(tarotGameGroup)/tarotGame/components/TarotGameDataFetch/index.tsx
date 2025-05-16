import { DataLoading } from "@/components/DataLoading"
import { ErrorView } from "@/components/ErrorView"

import { useTarotGameDataFetchHook } from "./hook"
import { TTarotGameDataFetchProps } from "./type"
import { View,Text } from "react-native"
import { TTarotGameDataFetcStyle } from "./style"

export const TarotGameDataFetch = (props:TTarotGameDataFetchProps)=>{

    const {
        tarotGameImageQualitys,
        handleAfterFetch
    } = props

    const {
        t,
        checkTarotGameData,
        isPending,
        errorViewData,
        dataLoadingDataSV
    } = useTarotGameDataFetchHook({
        tarotGameImageQualitys,
        handleAfterFetch
    })

    if(isPending){
        return(
            <DataLoading
                dataLoadingDataSV={dataLoadingDataSV}
            />
        )
    } 

    if(errorViewData){
        return(
            <ErrorView 
                {...errorViewData}                 
            />
            
        )
    }

    if(checkTarotGameData){
        return(
            <View style={TTarotGameDataFetcStyle.TarotGameDataFetchFallbackContainer}>
                <Text
                    style={TTarotGameDataFetcStyle.TarotGameDataFetchFallbackContainerText}
                >
                    {!checkTarotGameData.tarotBackground && t('tarotGame.tarotGameDataFetch.noTarotBackground') + '\n\n'}
                    {!checkTarotGameData.tarotCursor && t('tarotGame.tarotGameDataFetch.noTarotCursor') + '\n\n'}
                    {!checkTarotGameData.tarotDeck && t('tarotGame.tarotGameDataFetch.noTarotDeck')}
                </Text>
            </View>
        )
    }


    return null
}

export default {
    TarotGameDataFetch
}