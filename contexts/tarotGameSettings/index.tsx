import { 
    createContext, 
    useContext, 
    useState 
} from "react";
import { useStore } from "zustand";

import { createTarotGameSettingsStore } from "./zustand";

import { globalMMKVKeys } from "@/contexts/globalMMKV/helper";
import { useGlobalMMKVContext } from "@/contexts/globalMMKV";

import { 
    TTarotEventProviderProps, 
    TTarotGameSettingsStore 
} from "./type";

export const TarotGameSettingsContext = createContext<ReturnType<typeof createTarotGameSettingsStore > | null>(null)


export const useTarotGameSettingsStore = <U,>(selector: (state:TTarotGameSettingsStore ) => U)=>{
    const store = useContext(TarotGameSettingsContext)

    if(store === null){
        throw new Error(
            'useTarotGameSettingsStore must be used within TarotGameSettingsProvider',
        )
    }

    return useStore(store,selector)
}

export const TarotGameSettingsProvider = (props:TTarotEventProviderProps) =>{

    const { globalMMKVStorage } = useGlobalMMKVContext()

    const [value] = useState(()=>{
        return createTarotGameSettingsStore(globalMMKVStorage,globalMMKVKeys.tarotGameSettings)
    });

    return(
        <TarotGameSettingsContext.Provider value={value}>
            {props.children}
        </TarotGameSettingsContext.Provider>
    )
}