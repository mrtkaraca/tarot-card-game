import { create } from 'zustand'

import { MMKV } from 'react-native-mmkv'

import { 
    TTarotGameSettingsStore,
} from './type'



export const createTarotGameSettingsStore = (store:MMKV,key:string) =>{


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



