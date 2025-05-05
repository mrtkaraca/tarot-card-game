import { create } from 'zustand'
import { MMKV } from 'react-native-mmkv'
import { 
    persist, 
    createJSONStorage
} from 'zustand/middleware'


import { 
    TTarotEventPersistStorageConfig,
    TTarotGameStore, 
} from './type'


export const createTarotGameStore = (store:MMKV,key:string) =>{

    const TarotGameSettingsPersistStorageConfig:TTarotEventPersistStorageConfig = {
        key:key,
        tarotGameZustandPersistStorage:{
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

    return create<TTarotGameStore>()(
        persist(
            (set,get)=>({
                tarotGameData:null,
                tarotGameSelectionsPaginationSelectedItems:{
                    tarotGameImageQuality:null,
                    tarotGameDrawningCardNumber:null
                },
                tarotGameCardModalData:{
                    isModalVisible:false,
                    cardData:null,
                    deckData:null
                },
                setTarotGameData:(props)=>set(()=>({tarotGameData:props ? {...props} : props})),
                setTarotGameSelectionsPaginationSelectedItems:((selectionPaginationName,selection)=>set((state)=>({
                    tarotGameSelectionsPaginationSelectedItems:{
                        ...state.tarotGameSelectionsPaginationSelectedItems,
                        [selectionPaginationName]:selection
                    }
                }))),
                setTarotGameCardModalData:(props)=>set((state)=>({
                    tarotGameCardModalData:{
                        ...state.tarotGameCardModalData,
                        ...props
                    }            
                })),
            }),
            {
                name:TarotGameSettingsPersistStorageConfig.key,
                storage:createJSONStorage(()=>TarotGameSettingsPersistStorageConfig.tarotGameZustandPersistStorage),
                partialize: (state) => ({ 
                    tarotGameSelectionsPaginationSelectedItems : state.tarotGameSelectionsPaginationSelectedItems
                }),
            }
        )
    )
}



