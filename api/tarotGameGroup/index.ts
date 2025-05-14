import axios, { 
    AxiosError 
} from "axios";
import NetInfo from '@react-native-community/netinfo';

import { TTarotGameGroupStore } from "@/contexts/tarotGameGroup/type";

import { TErrorApiResponseObject, TErrorResponseHandler } from "@/api/type";

import { TTarotGameApiResponse, TTarotGameSettingsDataApiResponse } from "./type";

const url = process.env.EXPO_PUBLIC_API_URL

export const getTarotGameSettingsData = async(
    signal:AbortSignal,
    errorResponseHandler:TErrorResponseHandler
):Promise<[TTarotGameSettingsDataApiResponse | null | undefined,TErrorApiResponseObject | null | undefined]>=>{
    
    try{
        const data = await axios.get(`${url}/tarotEvent/tarotGameSettings`,{
            headers: {
                'Accept': 'application/json',
            },
            signal
        })
        return [data.data,null];
    }
    catch(err){
        const c = await NetInfo.fetch();
        if(!c.isConnected){
            return [null,errorResponseHandler({errorContent:'networkError',errorCode:'0'})]
        }

        if(axios.isCancel(err)){
            console.log(err.message,'Abort')
            return [undefined,undefined]
        }

        if(err instanceof AxiosError){
            console.log(err.message,'Axios')
            return err.response?.status ? [
                null,
                errorResponseHandler({
                    errorContent:'tarotGameSettings',
                    errorCode:err.response.status
                })
            ] 
            : 
            [
                null,
                errorResponseHandler({
                    errorContent:'tarotGameSettings',
                    errorCode:'503'
                })
            ] 
        }

        return [
            null,
            errorResponseHandler({
                errorContent:'tarotGameSettings',
                errorCode:'503'
            })
        ]
    }
}

export const getTarotGameData = async(
    signal:AbortSignal,
    tarotGameSettingsSelectedItems:TTarotGameGroupStore['tarotGameSettingsSelectedItems'],
    errorResponseHandler:TErrorResponseHandler
):Promise<[TTarotGameApiResponse | null | undefined,TErrorApiResponseObject | null | undefined]>=>{
    try{
        const data = await axios.post(`${url}/tarotEvent/tarotGame`,tarotGameSettingsSelectedItems,{
            headers: {
                'Accept': 'application/json',
            },
            signal
        })
        return [data.data,null];
    }
    catch(err){
        const c = await NetInfo.fetch();
        if(!c.isConnected){
            return [
                null,
                errorResponseHandler({
                    errorContent:'networkError',
                    errorCode:'0'
                })
            ]
        }

        if(axios.isCancel(err)){
            console.log(err.message,'Abort')
            return [undefined,undefined]
        }

        if(err instanceof AxiosError){
            console.log(err.message,'Axios')
            return err.response?.status ? [
                null,
                errorResponseHandler({
                    errorContent:'tarotGame',
                    errorCode:err.response.status
                })
            ] 
            : 
            [
                null,
                errorResponseHandler({
                    errorContent:'tarotGame',
                    errorCode:'503'
                })
            ] 
        }

        return [
            null,
            errorResponseHandler({
                errorContent:'tarotGame',
                errorCode:'503'
            })
        ]
    }
}
