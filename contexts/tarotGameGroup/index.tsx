import { 
    createContext, 
    useContext, 
    useState 
} from "react";
import { useStore } from "zustand";

import { 
    createTarotGameGroupStore 
} from "./zustand"

import { useGlobalMMKVContext } from "@/contexts/globalMMKV";

import { globalMMKVKeys } from "../globalMMKV/helper";

import { 
    TTarotGameGroupProviderProps, 
    TTarotGameGroupStore 
} from "./type";


export const TarotGameGroupContext = createContext<ReturnType<typeof createTarotGameGroupStore > | null>(null)


export const useTarotGameGroupStore = <U,>(selector: (state:TTarotGameGroupStore ) => U)=>{
    const store = useContext(TarotGameGroupContext)

    if(store === null){
        throw new Error(
            'useTarotGameGroupStore must be used within TarotGameGroupProvider',
        )
    }

    return useStore(store,selector)
}

export const TarotGameGroupProvider = (props:TTarotGameGroupProviderProps) =>{

    const { globalMMKVStorage } = useGlobalMMKVContext();

    const [value] = useState(()=>createTarotGameGroupStore(globalMMKVStorage,globalMMKVKeys.tarotGameGroup));

    return(
        <TarotGameGroupContext.Provider value={value}>
            {props.children}
        </TarotGameGroupContext.Provider>
    )
}