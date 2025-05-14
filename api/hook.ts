import { useTranslation } from "react-i18next";

import { 
    TErrorApiResponse,
    TErrorApiResponseObject,
    TErrorResponseHandler
} from "./type";

export const useApiErrorHandler = ()=>{

    const {
        t
    } = useTranslation()
    
    const errorDataConfig:TErrorApiResponse={
        networkError:{
            '0':{
                errorCode:0,
                errorTitleMessage:t('errorResponseHandler.networkError.0.errorTitleMessage'),
                errorDescriptionMessage:t('errorResponseHandler.networkError.0.errorDescriptionMessage')
            }
        },
        tarotGameSettings:{
            '400':{
                errorCode:400,
                errorTitleMessage:t('errorResponseHandler.tarotGameSettings.400.errorTitleMessage'),
                errorDescriptionMessage:t('errorResponseHandler.tarotGameSettings.400.errorDescriptionMessage')
            }, 
            '401':{
                errorCode:401,
                errorTitleMessage:t('errorResponseHandler.tarotGameSettings.401.errorTitleMessage'),
                errorDescriptionMessage:t('errorResponseHandler.tarotGameSettings.401.errorDescriptionMessage')
            },
            '503':{
                errorCode:503,
                errorTitleMessage:t('errorResponseHandler.tarotGameSettings.503.errorTitleMessage'),
                errorDescriptionMessage:t('errorResponseHandler.tarotGameSettings.503.errorDescriptionMessage')
            }
        },
        tarotGame:{
            '400':{
                errorCode:400,
                errorTitleMessage:t('errorResponseHandler.tarotGame.400.errorTitleMessage'),
                errorDescriptionMessage:t('errorResponseHandler.tarotGame.400.errorDescriptionMessage')
            }, 
            '401':{
                errorCode:401,
                errorTitleMessage:t('errorResponseHandler.tarotGame.401.errorTitleMessage'),
                errorDescriptionMessage:t('errorResponseHandler.tarotGame.401.errorDescriptionMessage')
            },
            '503':{
                errorCode:503,
                errorTitleMessage:t('errorResponseHandler.tarotGame.503.errorTitleMessage'),
                errorDescriptionMessage:t('errorResponseHandler.tarotGame.503.errorDescriptionMessage')
            }
        }
    }
        
    const errorResponseHandler:TErrorResponseHandler =(
        {
            errorContent,
            errorCode
        }
    )=>{
        if(typeof errorCode === 'number'){
            let check = errorDataConfig[errorContent][errorCode] ? true : false
            if(check){
                return errorDataConfig[errorContent][errorCode]
            }
            else{
                return {
                    errorCode:errorCode,
                    errorTitleMessage:t('errorResponseHandler.unknownError.errorTitleMessage'),
                    errorDescriptionMessage:t('errorResponseHandler.unknownError.errorDescriptionMessage')
                }
            }
        }
        return errorDataConfig[errorContent][errorCode]
    }

    return{
        errorResponseHandler
    }
}