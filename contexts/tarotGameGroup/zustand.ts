import { create } from 'zustand'
import { persist, createJSONStorage} from 'zustand/middleware'

import { MMKV } from 'react-native-mmkv'

import { 
    TTarotGameGroupPersistStorageConfig,
    TTarotGameGroupStore, 
} from './type'


export const createTarotGameGroupStore = (store:MMKV,key:string) =>{

    const TarotGameSettingsPersistStorageConfig:TTarotGameGroupPersistStorageConfig = {
        key:key,
        tarotGameGroupsZustandPersistStorage:{
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

    return create<TTarotGameGroupStore>()(
        persist(
            (set,get)=>({
                tarotGameSettingsSelectedItems:{
                    tarotBackground:null,
                    tarotCursor:null,
                    tarotDeck:null
                },
                setTarotGameSettingsSelectedItems:(screenName,itemId)=>set((state)=>({tarotGameSettingsSelectedItems:{
                    ...state.tarotGameSettingsSelectedItems,
                    [screenName]:itemId
                }})),
                getReadOnlyTarotGameSettingsSelectedItems:()=>{
                    return get().tarotGameSettingsSelectedItems
                },
            }),
            {
                name:TarotGameSettingsPersistStorageConfig.key,
                storage:createJSONStorage(()=>TarotGameSettingsPersistStorageConfig.tarotGameGroupsZustandPersistStorage),
                partialize: (state) => ({ 
                    tarotGameSettingsSelectedItems: state.tarotGameSettingsSelectedItems
                }),
            }
        )
    )
}



