import { 
    startTransition, 
    useState, 
    useCallback,
    useEffect, 
} from "react"
import { LayoutChangeEvent } from "react-native"
import { useSharedValue } from "react-native-reanimated"
import { useTranslation } from "react-i18next"

import { getTarotGameSettingsData } from "@/api/tarotGameGroup"

import { TErrorViewProps } from "@/components/ErrorView/type"

import { useTarotGameGroupStore } from "@/contexts/tarotGameGroup"
import { useTarotGameSettingsStore } from "@/contexts/tarotGameSettings"

import { TTarotGameSettingsData, TTarotGameSettingsScreens } from "../type"
import { TarotGameSettingsColors } from "@/constants/color"
import { TOnboardScreensData } from "./type"
import { useApiErrorHandler } from "@/api/hook"



export const useTarotGameSettingsOnboardScreensContainerHook = ()=>{

    const {
        t
    } = useTranslation()

    const {
        errorResponseHandler
    } = useApiErrorHandler()

    const tarotGameSettingsData = useTarotGameSettingsStore((state)=>state.tarotGameSettingsData)
    const tarotGameSettingsSelectedItems = useTarotGameGroupStore((state)=>state.tarotGameSettingsSelectedItems)
    const setTarotGameSettingsData = useTarotGameSettingsStore((state)=>state.setTarotGameSettingsData)
    const setTarotGameSettingsSelectedItems = useTarotGameGroupStore((state)=>state.setTarotGameSettingsSelectedItems)

    const [isPending,setIsPending] = useState(true)

    const [errorViewData,setErrorViewData] = useState<TErrorViewProps | null>(null)
    const [handleFetch,setHandleFetch] = useState(true)

    const onboardScreenDimensions = useSharedValue<{
        heigth:null | number;
        width: null | number
    }>({
        heigth:null,
        width:null
    })

    const screenTitles = {
        tarotBackground:t('tarotGameSettings.tarotGameSettingsOnboardScreen.title.tarotBackground'),
        tarotCursor:t('tarotGameSettings.tarotGameSettingsOnboardScreen.title.tarotCursor'),
        tarotDeck:t('tarotGameSettings.tarotGameSettingsOnboardScreen.title.tarotDeck'),
    }

    const onboardScreensData:TOnboardScreensData = [
        {
            id:0,
            name:"tarotBackground",
            screenTitle:screenTitles['tarotBackground'],
        },
        {
            id:1,
            name:'tarotCursor',
            screenTitle:screenTitles['tarotCursor'],
        },
        {
            id:2,
            name:'tarotDeck',
            screenTitle:screenTitles['tarotDeck'],
        }
    ]


    const handleOnboardScreensDimensions = useCallback((e:LayoutChangeEvent)=>{
        onboardScreenDimensions.value = {
            heigth:e.nativeEvent.layout.height,
            width:e.nativeEvent.layout.width
        }
    },[])

    const compareTarotGameSettingsSelectedItemsWithTarotGameSettingsData = useCallback((tarotGameSettingsData:TTarotGameSettingsData)=>{
        (Object.keys(tarotGameSettingsSelectedItems) as Array<TTarotGameSettingsScreens>).filter((screen)=>
                !tarotGameSettingsData[screen]?.find((item)=>item.id === tarotGameSettingsSelectedItems[screen])
        ).forEach((screen)=>{
            setTarotGameSettingsSelectedItems(screen,null)
        })
    },[tarotGameSettingsSelectedItems])

    const fetchData = async(abortSignal:AbortSignal)=>{
        const [res,err] = await getTarotGameSettingsData(
            abortSignal,
            errorResponseHandler
        );
        if(res){
            compareTarotGameSettingsSelectedItemsWithTarotGameSettingsData(res)
            setTarotGameSettingsData(res)
        }
        else{
            if(err){
                setErrorViewData({
                    isVisible:true,
                    errorData:err,
                    textButtonProps:{
                        textButtonOpacityColor:TarotGameSettingsColors.TextButtons.buttonOpacityColor,
                        textButtonTextLabel:t('tarotGameSettings.tarotGameSettingsOnboardScreensContainer.reFetch'),
                        handleOnPress:()=>{
                            setHandleFetch(true)
                            setIsPending(true)
                            setErrorViewData(null)
                        }
                    }
                })
            }
        }
        setHandleFetch(false)
        setIsPending(false)
    }


    const handleFetchDataAction = useCallback(()=>{
        const abortController = new AbortController();

        if(handleFetch){
            fetchData(abortController.signal);
        }
        
        return ()=> {
            abortController.abort();
            
        };
    },[fetchData,handleFetch])

    useEffect(()=>{
        startTransition(()=>{
            handleFetchDataAction();
        })
    },[handleFetchDataAction])


    return{
        t,
        isPending,
        onboardScreensData,
        errorViewData,
        tarotGameSettingsData,
        onboardScreenDimensions,
        handleOnboardScreensDimensions,
    }
}