import { MMKV } from "react-native-mmkv"

export type TGlobalMMKVProviderProps = {
    children:React.ReactNode
}

export type TGlobalMMKVKeys = {
    tarotGameGroup:string
    tarotGame:string
    tarotGameSettings:string
}

export type TGlobalMMKVContext = {
    globalMMKVStorage: MMKV;
}