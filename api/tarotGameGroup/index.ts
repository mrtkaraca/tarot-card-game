import axios, { 
    AxiosError 
} from "axios";
import NetInfo from '@react-native-community/netinfo';

import { TTarotGameGroupStore } from "@/contexts/tarotGameGroup/type";

import { errorResponseHandler } from "@/api/helper";
import { TErrorApiResponseObject } from "@/api/type";

import { TTarotGameApiResponse, TTarotGameSettingsDataApiResponse } from "./type";

const url = process.env.EXPO_PUBLIC_API_URL

export const getTarotGameSettingsData = async(signal:AbortSignal):Promise<[TTarotGameSettingsDataApiResponse | null | undefined,TErrorApiResponseObject | null | undefined]>=>{
    
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
            return [null,errorResponseHandler('networkError')]
        }

        if(axios.isCancel(err)){
            console.log(err.message,'Abort')
            return [undefined,undefined]
        }

        if(err instanceof AxiosError){
            console.log(err.message,'Axios')
            return err.response?.status ? [null,errorResponseHandler('tarotGameSettings',err.response.status)] : [null,errorResponseHandler('tarotGameSettings',503)] 
        }

        return [null,errorResponseHandler('tarotGameSettings',503)]
    }
}

export const getTarotGameData = async(signal:AbortSignal,tarotGameSettingsSelectedItems:TTarotGameGroupStore['tarotGameSettingsSelectedItems']):Promise<[TTarotGameApiResponse | null | undefined,TErrorApiResponseObject | null | undefined]>=>{
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
            return [null,errorResponseHandler('networkError')]
        }

        if(axios.isCancel(err)){
            console.log(err.message,'Abort')
            return [undefined,undefined]
        }

        if(err instanceof AxiosError){
            console.log(err.message,'Axios')
            return err.response?.status ? [null,errorResponseHandler('tarotGame',err.response.status)] : [null,errorResponseHandler('tarotGame',503)] 
        }

        return [null,errorResponseHandler('tarotGameSettings',503)]
    }
}
