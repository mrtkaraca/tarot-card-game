export type TErrorApiResponseObject = {
    errorCode?:number;
    errorTitleMessage:string;
    errorDescriptionMessage:string; 
}

export type TErrorApiResponseKeys = 'networkError' | 'tarotGameSettings' | 'tarotGame'

export type TErrorApiResponseData = {
    [key in TErrorApiResponseKeys]:Array<TErrorApiResponseObject>
}