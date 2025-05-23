import { SharedValue } from "react-native-reanimated";

export type TDataLoadingData = {
    dataLoadCurrentDataTitle?:string;
    dataLoadCurrentDataName?:string;
    dataLoadCurrentProgress?:number;
    dataLoadMaxDataLength?:number;
}

export type TDataLoadingProps = {
    dataLoadingDataSV:SharedValue<TDataLoadingData | null>;
}

export type TDataLoadingHookProps = TDataLoadingProps