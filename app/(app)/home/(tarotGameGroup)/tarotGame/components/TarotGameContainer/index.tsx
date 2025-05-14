import { TarotGameInnerContainer } from "../TarotGameInnerContainer"
import { TarotGameDataFetch } from "../TarotGameDataFetch"
import {TarotGameSelectionsPaginationContainer} from "../TarotGameSelectionsPaginationContainer"

import { useTarotGameContainerHook } from "./hook"

export default undefined

export const TarotGameContainer = ()=>{

    const {
        startFetch,
        isGameStarted,
        tarotGameDataWithoutBackground,
        tarotGameImageQualitys,
        tarotGameSelectionsPaginationData,
        handleOnFetchStart,
        handleAfterFetch,
    } = useTarotGameContainerHook({
        
    })


    if(startFetch){
        return(
            <TarotGameDataFetch
                tarotGameImageQualitys={tarotGameImageQualitys}
                handleAfterFetch={handleAfterFetch}
            />
        )
    }

    if(isGameStarted && tarotGameDataWithoutBackground){
        return(
            <TarotGameInnerContainer
                tarotGameDataWithoutBackground={tarotGameDataWithoutBackground}
            />
        )
    }
    
    return(
        <TarotGameSelectionsPaginationContainer
            tarotGameSelectionsPaginationData={tarotGameSelectionsPaginationData}
            handleOnFetchStart={handleOnFetchStart}
        />
    )
    
}