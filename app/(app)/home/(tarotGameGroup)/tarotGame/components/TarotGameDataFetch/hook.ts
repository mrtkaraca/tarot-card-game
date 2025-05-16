import { 
    useCallback,
    useEffect,
    useRef, 
    useState 
} from "react";
import { useAnimatedReaction, useSharedValue } from "react-native-reanimated";
import {Image} from 'expo-image'

import { useTarotGameStore } from "@/contexts/tarotGame";
import { useTarotGameGroupStore } from "@/contexts/tarotGameGroup";


import { TErrorViewProps } from "@/components/ErrorView/type";
import { TDataLoadingData } from "@/components/DataLoading/type";

import { getTarotGameData } from "@/api/tarotGameGroup";
import { useApiErrorHandler } from "@/api/hook";

import { TTarotGamePrefetchMap } from "./type";

import { TCheckTarotGameData, TTarotGameDataFetchHookProps } from "./type"

import { TTarotGameAsset, TTarotGameData } from "../type";

import { TarotGameDataLoadingDataTitles } from "../TarotGameInnerContainer/helper";
import { useTranslation } from "react-i18next";

export const useTarotGameDataFetchHook = (props:TTarotGameDataFetchHookProps)=>{

    const {
        tarotGameImageQualitys,
        handleAfterFetch
    } = props


    const {
        t
    } = useTranslation()

    const {
        errorResponseHandler
    } = useApiErrorHandler()

    const tarotGameSettingsSelectedItems = useTarotGameGroupStore((state)=>state.tarotGameSettingsSelectedItems)
    const tarotGameSelectedImageQuality = useTarotGameStore((state)=>state.tarotGameSelectionsPaginationSelectedItems.tarotGameImageQuality)
    const setTarotGameData = useTarotGameStore((state)=>state.setTarotGameData)

    const [isPending, setIsPending] = useState(false);
    const [errorViewData,setErrorViewData] = useState<TErrorViewProps | null>(null)
    const [toggleFetch,setToggleFetch] = useState(false)
    const [isPrefetch,setIsPrefetch] = useState(false)
    const [checkTarotGameData,setCheckTarotGameData] = useState<TCheckTarotGameData | null>(null)

    const pureTarotGameDataRef = useRef<TTarotGameData | null>(null)
    const [isAdjustTarotGameDataImageUrl,setIsAdjustTarotGameDataImageUrl] = useState(false)

    const dataLoadingDataSV = useSharedValue<TDataLoadingData | null>(null)

    const dataLoadingDataRef = useRef<TDataLoadingData | null>(null)

    const handleAdjustTarotGameDefaultDataImageUrls = useCallback((asset:Exclude<TTarotGameAsset,'tarotDeck'>)=>{

        if(pureTarotGameDataRef.current?.[asset]){
            let viewPorts = tarotGameImageQualitys.filter((qualitys)=>qualitys.id === tarotGameSelectedImageQuality).map((quality)=>quality.viewports[asset])[0]
    
            let uri = 
                `${pureTarotGameDataRef.current[asset].image.url.split(pureTarotGameDataRef.current[asset].image.ext)[0]}` +
                `-` + 
                `${viewPorts.width}` + 
                `x` +
                `${viewPorts.height}` + 
                `${pureTarotGameDataRef.current[asset].image.ext}`
            ;

            pureTarotGameDataRef.current[asset].image.url = uri
        }

    },[tarotGameSelectedImageQuality])

    const handleAdjustTarotGameDecktDataImageUrls = useCallback((asset:Extract<TTarotGameAsset,'tarotDeck'>)=>{
        if(pureTarotGameDataRef.current){
            let viewPorts = tarotGameImageQualitys.filter((qualitys)=>qualitys.id === tarotGameSelectedImageQuality).map((quality)=>quality.viewports[asset])[0]
    
            let backFaceUri = 
                `${pureTarotGameDataRef.current[asset].backFace.image.url.split(pureTarotGameDataRef.current[asset].backFace.image.ext)[0]}` +
                `-` + 
                `${viewPorts.width}` + 
                `x` +
                `${viewPorts.height}` + 
                `${pureTarotGameDataRef.current[asset].backFace.image.ext}`
            ;
    
            pureTarotGameDataRef.current[asset].backFace.image.url = backFaceUri
    
            for(let i = 0 ; i < pureTarotGameDataRef.current[asset].frontFaces.length; i++){
    
                let frotFaceUri = 
                    `${pureTarotGameDataRef.current[asset].frontFaces[i].image.url.split(pureTarotGameDataRef.current[asset].frontFaces[i].image.ext)[0]}` +
                    `-` + 
                    `${viewPorts.width}` + 
                    `x` +
                    `${viewPorts.height}` + 
                    `${pureTarotGameDataRef.current[asset].frontFaces[i].image.ext}`
                ;
    
                pureTarotGameDataRef.current[asset].frontFaces[i].image.url = frotFaceUri
            }
        }
    },[tarotGameSelectedImageQuality])

    const handleAdjustTarotGameDataImageUrls = useCallback(()=>{
        if(pureTarotGameDataRef.current){
            for(const asset of (Object.keys(pureTarotGameDataRef.current) as Array<TTarotGameAsset>)){
                asset === 'tarotDeck' ? 
                    handleAdjustTarotGameDecktDataImageUrls(asset) 
                    : 
                    handleAdjustTarotGameDefaultDataImageUrls(asset)
            }
            setIsPrefetch(true)
        }
    
        setIsAdjustTarotGameDataImageUrl(false)
    },[])

    const handlePrefetchTarotCursor = useCallback(async(tarotCursorData:TTarotGameData['tarotCursor'])=>{

        dataLoadingDataRef.current = {
            ...dataLoadingDataRef.current,
            dataLoadCurrentDataName:tarotCursorData.name
        }
        dataLoadingDataSV.value = dataLoadingDataRef.current

        let isPrefetched = await Image.prefetch(tarotCursorData.image.url,{
            cachePolicy:'memory-disk'
        })

        if(isPrefetched){
            dataLoadingDataRef.current = {
                ...dataLoadingDataRef.current,
                dataLoadCurrentProgress:Number(dataLoadingDataRef.current.dataLoadCurrentProgress) + 1
            }
            dataLoadingDataSV.value = dataLoadingDataRef.current
            return true
        }
        else{
            return false
        }
    },[])

    const handlePrefetchTarotBackground = useCallback(async(tarotBackgroundData:TTarotGameData['tarotBackground'])=>{

        dataLoadingDataRef.current = {
            ...dataLoadingDataRef.current,
            dataLoadCurrentDataName:tarotBackgroundData.name
        }
        dataLoadingDataSV.value = dataLoadingDataRef.current

        let isPrefetched = await Image.prefetch(tarotBackgroundData.image.url,{
            cachePolicy:'memory-disk'
        })

        if(isPrefetched){
            dataLoadingDataRef.current = {
                ...dataLoadingDataRef.current,
                dataLoadCurrentProgress:Number(dataLoadingDataRef.current.dataLoadCurrentProgress) + 1
            }
            dataLoadingDataSV.value = dataLoadingDataRef.current
            return true
        }
        else{
            return false
        }
    },[])
    
    const handlePrefetchTarotDeck = useCallback(async(tarotDeckData:TTarotGameData['tarotDeck'])=>{
        dataLoadingDataRef.current = {
            ...dataLoadingDataRef.current,
            dataLoadCurrentDataName:tarotDeckData.name + ' '  + tarotDeckData.backFace.name
        }
        dataLoadingDataSV.value = dataLoadingDataRef.current

        const isImagePrefetched = await Image.prefetch(tarotDeckData.backFace.image.url,{
            cachePolicy:'memory-disk'
        })

        if(isImagePrefetched){
            dataLoadingDataRef.current = {
                ...dataLoadingDataRef.current,
                dataLoadCurrentProgress:Number(dataLoadingDataRef.current.dataLoadCurrentProgress) + 1
            }
            dataLoadingDataSV.value = dataLoadingDataRef.current
        }
        else{
            return false
        }

        for(let i = 0 ; i < tarotDeckData.frontFaces.length; i++){

            dataLoadingDataRef.current = {
                ...dataLoadingDataRef.current,
                dataLoadCurrentDataName:tarotDeckData.name + ' ' + tarotDeckData.frontFaces[i].name
            }
            dataLoadingDataSV.value = dataLoadingDataRef.current


            const isImagePrefetched = await Image.prefetch(tarotDeckData.frontFaces[i].image.url,{
                cachePolicy:'memory-disk'
            })

            if(isImagePrefetched){
                dataLoadingDataRef.current = {
                    ...dataLoadingDataRef.current,
                    dataLoadCurrentProgress:Number(dataLoadingDataRef.current.dataLoadCurrentProgress) + 1
                }
                dataLoadingDataSV.value = dataLoadingDataRef.current
            }
            else{
                return false
            }
            
        }

        return true

    },[])

    const tarotGameDataPrefetchObj:TTarotGamePrefetchMap = {
        tarotBackground:handlePrefetchTarotBackground,
        tarotCursor:handlePrefetchTarotCursor,
        tarotDeck:handlePrefetchTarotDeck
    }

    const prefetchTarotGameData = useCallback(async(data:TTarotGameData)=>{

        await Image.clearMemoryCache();

        let dataLoadMaxDataLength;
        let tarotCursorDataLength = 1
        let tarotBackgroundDataLength = 1
        let tarotDeckDataLength = data.tarotDeck.frontFaces.length + 1

        dataLoadMaxDataLength = tarotCursorDataLength + tarotBackgroundDataLength + tarotDeckDataLength

        dataLoadingDataRef.current = {
            dataLoadCurrentDataTitle:TarotGameDataLoadingDataTitles.loadingAssets,
            dataLoadCurrentProgress:0,
            dataLoadMaxDataLength:dataLoadMaxDataLength,
        }

        dataLoadingDataSV.value = dataLoadingDataRef.current;

        for(const dataKey of ((Object.keys(data)) as Array<TTarotGameAsset>)){
            const fnc = tarotGameDataPrefetchObj[dataKey]
            const check = await fnc(data[dataKey])
            if(!check){
                const err = errorResponseHandler({
                    errorContent:'tarotGame',
                    errorCode:'503'
                })
                if(err){
                    setErrorViewData({
                        isVisible:true,
                        errorData:err,
                        textButtonProps:{
                            textButtonTextLabel:'heh',
                            handleOnPress:()=>{
                                setIsPrefetch(true)
                                setErrorViewData(null)
                            }
                        }
                    })
                }
                return false
            }    
        }

        return true

    },[])

    const handlePrefetchTarotGameData = useCallback(async()=>{

        setIsPending(true)

        if(pureTarotGameDataRef.current){
            if(pureTarotGameDataRef.current.tarotBackground && pureTarotGameDataRef.current.tarotCursor && pureTarotGameDataRef.current.tarotDeck){
                const check = await prefetchTarotGameData(pureTarotGameDataRef.current);
                if(check){
                    setTarotGameData(pureTarotGameDataRef.current)
                    handleAfterFetch()
                }
            }
        }

        setIsPending(false)
        setIsPrefetch(false)

    },[])

    const fetchData = useCallback(async(abortSignal:AbortSignal)=>{
    
        dataLoadingDataRef.current = {
            dataLoadCurrentDataTitle:TarotGameDataLoadingDataTitles.fetchData,
            dataLoadCurrentProgress:0,
            dataLoadMaxDataLength:1
        }

        dataLoadingDataSV.value = dataLoadingDataRef.current

        const [res,err] = await getTarotGameData(
            abortSignal,
            tarotGameSettingsSelectedItems,
            errorResponseHandler
        )
        if(res){
            dataLoadingDataRef.current = {
                ...dataLoadingDataRef.current,
                dataLoadCurrentProgress:Number(dataLoadingDataRef.current.dataLoadCurrentProgress) + 1
            }
            dataLoadingDataSV.value = dataLoadingDataRef.current
    
            if(!res.tarotBackground || !res.tarotCursor || !res.tarotDeck){
                setCheckTarotGameData({
                    tarotBackground:res.tarotBackground ? true: false,
                    tarotCursor:res.tarotCursor ? true: false,
                    tarotDeck:res.tarotDeck ? true : false
                })
                return false
            }
            else{
                pureTarotGameDataRef.current = res
                return true
            }
        }
        else{
            if(err){
                setErrorViewData({
                    isVisible:true,
                    errorData:err,
                    textButtonProps:{
                        textButtonTextLabel:'Tekrar dene',
                        textButtonOpacityColor:'gray',
                        handleOnPress:()=>{
                            setToggleFetch((prev)=>!prev)
                            setErrorViewData(null)
                        }
                    }
                })
            }

            return false
        }

    },[])

    const handleFetchData = useCallback(async(abortSignal:AbortSignal)=>{
        
        setIsPending(true)

        const check = await fetchData(abortSignal);

        setIsPending(check)
        setIsAdjustTarotGameDataImageUrl(check)

    },[])

    useEffect(()=>{
        const abortController = new AbortController();

        handleFetchData(abortController.signal)

        return ()=>{
            abortController.abort();
        }
    },[toggleFetch])

    useEffect(()=>{
        if(isAdjustTarotGameDataImageUrl){
            handleAdjustTarotGameDataImageUrls();
        }
    },[isAdjustTarotGameDataImageUrl])

    useEffect(()=>{
        if(isPrefetch){
            handlePrefetchTarotGameData()
        }
    },[isPrefetch])

    return{
        t,
        checkTarotGameData,
        isPending,
        errorViewData,
        dataLoadingDataSV
    }
}

export default {
    useTarotGameDataFetchHook
}