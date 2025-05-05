import { 
    useCallback, 
    useRef, 
    useState 
} from "react"
import { useShallow } from 'zustand/react/shallow'

import { useTarotGameStore } from "@/contexts/tarotGame"

import { TTarotGameContainerHookProps } from "./type"


export default undefined

export const useTarotGameContainerHook = (props:TTarotGameContainerHookProps)=>{


    const tarotGameDataWithoutBackground = useTarotGameStore(
        useShallow((state)=>state.tarotGameData ? 
            {
                tarotCursor:state.tarotGameData.tarotCursor,
                tarotDeck:state.tarotGameData.tarotDeck
            }
            :
            null
        )
    )

   
    const [isGameStarted,setIsGameStarted] = useState(false)
    const [startFetch,setStartFetch] = useState(false)

    const handleOnFetchStart = useCallback(()=>{
        setStartFetch(true)
    },[])

    const handleAfterFetch = useCallback(()=>{
        setStartFetch(false)
        setIsGameStarted(true)
    },[])

    return{
        startFetch,
        isGameStarted,
        tarotGameDataWithoutBackground,
        handleOnFetchStart,
        handleAfterFetch
    }
}