export type TErrorApiResponseKeys = 'unknownError' | 'networkError' | 'tarotGameSettings' | 'tarotGame'


export type TErrorApiResponseObject = {
    errorCode:number;
    errorTitleMessage:string;
    errorDescriptionMessage:string; 
}

export type TErrorApiNetworkErrorResponseData = {
    '0':TErrorApiResponseObject
}

export type TErrorApiTarotGameSettingsResponseData = {
    '400':TErrorApiResponseObject, 
    '401':TErrorApiResponseObject,
    '503':TErrorApiResponseObject,
    [key:number]:TErrorApiResponseObject
}

export type TErrorApiTarotGameResponseData = {
    '400':TErrorApiResponseObject, 
    '401':TErrorApiResponseObject,
    '503':TErrorApiResponseObject,
    [key:number]:TErrorApiResponseObject
}

export type TErrorApiNetworkErrorResponse = {
    [key in Extract<TErrorApiResponseKeys,'networkError'>]:TErrorApiNetworkErrorResponseData
}

export type TErrorApiTarotGameSettingsResponse = {
    [key in Extract<TErrorApiResponseKeys,'tarotGameSettings'>]:TErrorApiTarotGameSettingsResponseData
}

export type TErrorApiTarotGameResponse = {
    [key in Extract<TErrorApiResponseKeys,'tarotGame'>]:TErrorApiTarotGameResponseData
}

export type TErrorApiResponse = (
    TErrorApiNetworkErrorResponse & 
    TErrorApiTarotGameSettingsResponse & 
    TErrorApiTarotGameResponse
)

export type TErrorResponseHandler = <
    T extends keyof TErrorApiResponse,
    K extends keyof TErrorApiResponse[T]
>({
    errorContent,
    errorCode
}:{
    errorContent:T,
    errorCode:K
})=> TErrorApiResponse[T][K] | TErrorApiResponseObject


