import { TTarotGameStore } from "@/contexts/tarotGame/type";
import { TTarotGameAsset } from "../type";

export type TarotGameImageQuality = 'veryLow' | 'low' | 'medium' | 'high' | 'veryHigh'

export type TTarotGameCardDrawningNumber = 1 | 3 | 5 | 7 | 9

export type TTarotGameImageQualityConfig = {
    id:TarotGameImageQuality;
    name:string;
    viewports:{
        [key in TTarotGameAsset]:{
            width:number,
            height:number
        }
    }
}

export type TTarotGameCardDrawningNumberConfig = {
    id:TTarotGameCardDrawningNumber;
    name:string,
}

export type TTarotGameImageQualitysConfig = Array<TTarotGameImageQualityConfig>


export type TTarotGameCardDrawningNumbersConfig = Array<TTarotGameCardDrawningNumberConfig>

export type TTarotGameSelectionPaginationDataId = keyof TTarotGameStore['tarotGameSelectionsPaginationSelectedItems']

export type TTarotGameSelectionPaginationData = ({
    id:keyof Pick<TTarotGameStore['tarotGameSelectionsPaginationSelectedItems'],'tarotGameDrawningCardNumber'>,
    data:TTarotGameCardDrawningNumbersConfig
} | {
    id:keyof Pick<TTarotGameStore['tarotGameSelectionsPaginationSelectedItems'],'tarotGameImageQuality'>,
    data:TTarotGameImageQualitysConfig
}) & {
    title:string
}
export type TTarotGameSelectionsPaginationData = Array<TTarotGameSelectionPaginationData>

export type TTarotGameSelectionsPaginationContainerProps = {
    tarotGameSelectionsPaginationData: TTarotGameSelectionsPaginationData
    handleOnFetchStart: () => void
}

export type TTarotGameSelectionsPaginationContainerHookProps = Pick<TTarotGameSelectionsPaginationContainerProps,
    'tarotGameSelectionsPaginationData'
>

export default {
    
}