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
        handleOnFetchStart,
        handleAfterFetch,
    } = useTarotGameContainerHook({})




    if(startFetch){
        return(
            <TarotGameDataFetch
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
            handleOnFetchStart={handleOnFetchStart}
        />
    )
    
}