import { DataLoading } from "@/components/DataLoading"
import { ErrorView } from "@/components/ErrorView"

import { useTarotGameDataFetchHook } from "./hook"
import { TTarotGameDataFetchProps } from "./type"
import { View,Text } from "react-native"

export default undefined

export const TarotGameDataFetch = (props:TTarotGameDataFetchProps)=>{


    const {
        checkTarotGameData,
        isPending,
        errorViewData,
        dataLoadingData
    } = useTarotGameDataFetchHook(props)

    if(isPending){
        return(
            <DataLoading
                dataLoadingData={dataLoadingData}
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
            <View style={{height:'100%',width:'100%',justifyContent:'center',alignItems:'center',gap:12}}>
                <Text>{!checkTarotGameData.tarotBackground && 'Goruntulenebilcek bir arkaplan yok!'}</Text>
                <Text>{!checkTarotGameData.tarotCursor && 'Goruntulenebilcek bir imlecyok!'}</Text>
                <Text>{!checkTarotGameData.tarotDeck && 'Goruntulenebilcek bir deste yok!'}</Text>
            </View>
        )
    }


    return null
}