import { TTarotGameAsset } from "../../type"
import { TTarotGameImageQualitysConfig } from "../TarotGameSelectionsPaginationContainer/type"

export default undefined

export type TTarotGameDataFetchProps = {
    tarotGameImageQualitys: TTarotGameImageQualitysConfig
    handleAfterFetch: () => void
}

export type TCheckTarotGameData = {
    [key in TTarotGameAsset]:boolean
}

export type TTarotGamePrefetchMap= {
    [key in TTarotGameAsset]:(data:any)=>Promise<boolean>
}


export type TTarotGameDataFetchHookProps = Pick<TTarotGameDataFetchProps,
    'tarotGameImageQualitys' |
    'handleAfterFetch'
>