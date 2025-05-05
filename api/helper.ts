import { TErrorApiResponseData, TErrorApiResponseObject } from "./type";

const errorDataConfig:TErrorApiResponseData={
    networkError:[
        {
            errorTitleMessage:'Internet yok!',
            errorDescriptionMessage:'Internete bir an once baglan!'
        }
    ],
    tarotGameSettings:[
        {
            errorCode:400,
            errorTitleMessage:"Hmm...",
            errorDescriptionMessage:"Gorünüşe gore bazı boşlukları doldurmamışsın!"
        }, 
        {
            errorCode:401,
            errorTitleMessage:"Hay aksi...",
            errorDescriptionMessage:"Sanırım ki uygulamayı güncellemen gerekecek!"
        },
        {
            errorCode:503,
            errorTitleMessage:"Hay aksi...",
            errorDescriptionMessage:"Bir sorun oluştu. Daha sonra tekrar dene!"
        }
    ],
    tarotGame:[
        {
            errorCode:400,
            errorTitleMessage:"Hmm...",
            errorDescriptionMessage:"Gorünüşe gore deste,arka plan veya imlec secmemissin!"
        }, 
        {
            errorCode:401,
            errorTitleMessage:"Hay aksi...",
            errorDescriptionMessage:"Sanırım ki uygulamayı güncellemen gerekecek!"
        },
        {
            errorCode:503,
            errorTitleMessage:"Hay aksi...",
            errorDescriptionMessage:"Bir sorun oluştu. Daha sonra tekrar dene!"
        }
    ]
}
    
export const errorResponseHandler = (errorContent:keyof TErrorApiResponseData,errorCode?:TErrorApiResponseObject['errorCode'])=>{
    if(errorCode){
        return errorDataConfig[errorContent].find(value => value.errorCode === errorCode)
    }
    else{
        return errorDataConfig[errorContent][0]
    }
}



