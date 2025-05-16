import { 
    useCallback, 
    useRef, 
    useState 
} from "react"
import { useShallow } from 'zustand/react/shallow'

import { useTarotGameStore } from "@/contexts/tarotGame"

import { TTarotGameContainerHookProps } from "./type"
import { TTarotGameCardDrawningNumbersConfig, TTarotGameImageQualitysConfig, TTarotGameSelectionsPaginationData } from "../TarotGameSelectionsPaginationContainer/type"
import { useTranslation } from "react-i18next"


export const useTarotGameContainerHook = (props:TTarotGameContainerHookProps)=>{

    const {
        t
    } = useTranslation()

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

    const tarotGameImageQualitys:TTarotGameImageQualitysConfig = [
        {
            id:'veryLow',
            name:t('tarotGame.tarotGameSelectionsPaginationContainer.tarotGameImageQualitys.veryLow'),
            viewports:{
                tarotDeck:{
                    width:120,
                    height:200
                },
                tarotBackground:{
                    width:180,
                    height:320
                },
                tarotCursor:{
                    width:128,
                    height:128
                }
            }
        },
        {
            id:'low',
            name:t('tarotGame.tarotGameSelectionsPaginationContainer.tarotGameImageQualitys.low'),
            viewports:{
                tarotDeck:{
                    width:240,
                    height:400
                },
                tarotBackground:{
                    width:360,
                    height:640
                },
                tarotCursor:{
                    width:128,
                    height:128
                }
            }
        },
        {
            id:'medium',
            name:t('tarotGame.tarotGameSelectionsPaginationContainer.tarotGameImageQualitys.medium'),
            viewports:{
                tarotDeck:{
                    width:360,
                    height:600
                },
                tarotBackground:{
                    width:630,
                    height:1120
                },
                tarotCursor:{
                    width:256,
                    height:256
                }
            }
        },
        {
            id:'high',
            name:t('tarotGame.tarotGameSelectionsPaginationContainer.tarotGameImageQualitys.high'),
            viewports:{
                tarotDeck:{
                    width:480,
                    height:800
                },
                tarotBackground:{
                    width:810,
                    height:1440
                },
                tarotCursor:{
                    width:256,
                    height:256
                }
            }
        },
        {
            id:'veryHigh',
            name:t('tarotGame.tarotGameSelectionsPaginationContainer.tarotGameImageQualitys.veryHigh'),
            viewports:{
                tarotDeck:{
                    width:600,
                    height:1000
                },
                tarotBackground:{
                    width:1080,
                    height:1920
                },
                tarotCursor:{
                    width:256,
                    height:256
                }
            }
        }
    ]


    const tarotGameCardDrawningNumbers:TTarotGameCardDrawningNumbersConfig = [
        {
            id:1,
            name:t('tarotGame.tarotGameSelectionsPaginationContainer.tarotGameCardDrawningNumbers.1')
        },
        {
            id:3,
            name:t('tarotGame.tarotGameSelectionsPaginationContainer.tarotGameCardDrawningNumbers.3')
        },
        {
            id:5,
            name:t('tarotGame.tarotGameSelectionsPaginationContainer.tarotGameCardDrawningNumbers.5')
        },
        {
            id:7,
            name:t('tarotGame.tarotGameSelectionsPaginationContainer.tarotGameCardDrawningNumbers.7')
        },
        {
            id:9,
            name:t('tarotGame.tarotGameSelectionsPaginationContainer.tarotGameCardDrawningNumbers.9')
        }
    ]

    const tarotGameSelectionsPaginationData:TTarotGameSelectionsPaginationData = [
        {
            id:'tarotGameImageQuality',
            data:tarotGameImageQualitys,
            title:t('tarotGame.tarotGameSelectionsPaginationContainer.tarotGameSelectionsPaginationData.tarotGameImageQualityTitle')
        },
        {
            id:'tarotGameDrawningCardNumber',
            data:tarotGameCardDrawningNumbers,
            title:t('tarotGame.tarotGameSelectionsPaginationContainer.tarotGameSelectionsPaginationData.tarotGameCardDrawningNumbersTitle')
        }
    ]

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
        tarotGameImageQualitys,
        tarotGameSelectionsPaginationData,
        handleOnFetchStart,
        handleAfterFetch
    }
}

export default {
    useTarotGameContainerHook
}