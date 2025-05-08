import { create } from 'zustand'
import { persist, createJSONStorage} from 'zustand/middleware'

import { MMKV } from 'react-native-mmkv'

import { 
    TTarotEventPersistStorageConfig,
    TTarotGameSettingsStore,
} from './type'



export const createTarotGameSettingsStore = (store:MMKV,key:string) =>{

    const TarotGameSettingsPersistStorageConfig:TTarotEventPersistStorageConfig = {
        key:key,
        tarotGameSettingsZustandPersistStorage:{
            setItem: (name, value) => {
                return store.set(name,value)
            },
            getItem: (name) => {
                const value = store.getString(name)
                return value ?? null
            },
            removeItem: (name) => {
                return store.delete(name)
            },
        }
    }

    return create<TTarotGameSettingsStore>()(
        (set,get)=>({
            tarotGameSettingsData:null,
            tarotGameSettingsItemModal:{
                modalVisibility:false,
                screenName:null,
                item:null
            },
            setTarotGameSettingsData:(props)=>set(()=>({tarotGameSettingsData:props ? {...props} : props})),
            setTarotGameSettingsItemModal:(props)=>set((state)=>({tarotGameSettingsItemModal:{...state.tarotGameSettingsItemModal,...props}})),
        })
    )
}



