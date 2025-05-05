import { 
    useTransition, 
    useState, 
    useCallback,
    useEffect, 
} from "react"
import { LayoutChangeEvent } from "react-native"
import { measure, runOnUI, useAnimatedRef, useSharedValue } from "react-native-reanimated"
import { useFocusEffect } from "expo-router"

import { getTarotGameSettingsData } from "@/api/tarotGameGroup"

import { TErrorViewProps } from "@/components/ErrorView/type"

import { useTarotGameGroupStore } from "@/contexts/tarotGameGroup"
import { useTarotGameSettingsStore } from "@/contexts/tarotGameSettings"

import { TTarotGameSettingsData, TTarotGameSettingsScreens } from "../../type"

export const useTarotGameSettingsOnboardScreensContainerHook = ()=>{

    const tarotGameSettingsData = useTarotGameSettingsStore((state)=>state.tarotGameSettingsData)
    const tarotGameSettingsSelectedItems = useTarotGameGroupStore((state)=>state.tarotGameSettingsSelectedItems)
    const setTarotGameSettingsData = useTarotGameSettingsStore((state)=>state.setTarotGameSettingsData)
    const setTarotGameSettingsSelectedItems = useTarotGameGroupStore((state)=>state.setTarotGameSettingsSelectedItems)

    const [isPending,startTransition] = useTransition()

    const [errorViewData,setErrorViewData] = useState<TErrorViewProps | null>(null)
    const [handleFetch,setHandleFetch] = useState({
        toggleFetch:false,
        shouldFetch:false
    })

    const onboardScreenDimensions = useSharedValue<{
        heigth:null | number;
        width: null | number
    }>({
        heigth:null,
        width:null
    })

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
        const [res,err] = await getTarotGameSettingsData(abortSignal);
        if(res){
            compareTarotGameSettingsSelectedItemsWithTarotGameSettingsData(res)
            setTarotGameSettingsData(res)
        }
        else{
            if(err){
                setTarotGameSettingsData(undefined)
                setErrorViewData({
                    isVisible:true,
                  
                    errorData:err,
                    textButtonProps:{
                        textButtonColor:'red',
                        textButtonTextLabel:'dem',
                        handleOnPress:()=>{
                            setTarotGameSettingsData(null)
                            setHandleFetch((prev)=>({...prev,toggleFetch:!prev.toggleFetch}))
                            setErrorViewData(null)
                        }
                    }
                })
            }
        }
    }

    const handleOnLayout = useCallback(()=>{
        setHandleFetch(prev=>({...prev,shouldFetch:true}))
    },[])

    const handleFetchData = useCallback(()=>{
        const abortController = new AbortController();

        if(handleFetch.shouldFetch){
            startTransition(()=>{
                fetchData(abortController.signal);
            })
        }
        
        return ()=> {
            abortController.abort();
            
        };
    },[tarotGameSettingsSelectedItems,handleFetch])

    useEffect(()=>{
        handleFetchData();
    },[handleFetch])


    return{
        isPending,
        errorViewData,
        tarotGameSettingsData,
        onboardScreenDimensions,
        handleOnLayout,
        handleOnboardScreensDimensions,
    }
}