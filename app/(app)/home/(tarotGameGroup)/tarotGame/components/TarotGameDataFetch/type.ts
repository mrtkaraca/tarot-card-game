import { TTarotGameAsset } from "../../type"

export default undefined

export type TTarotGameDataFetchProps = {
    handleAfterFetch: () => void
}

export type TCheckTarotGameData = {
    [key in TTarotGameAsset]:boolean
}

export type TTarotGamePrefetchMap= {
    [key in TTarotGameAsset]:(data:any)=>Promise<boolean>
}


export type TTarotGameDataFetchHookProps = TTarotGameDataFetchProps