import { 
    createContext, 
    useContext, 
    useState 
} from "react";
import { useStore } from "zustand";

import { 
    createTarotGameStore 
} from "./zustand";

import { useGlobalMMKVContext } from "../globalMMKV";
import { globalMMKVKeys } from "../globalMMKV/helper";

import { TTarotGameProviderProps, TTarotGameStore } from "./type";

export const TarotGameContext = createContext<ReturnType<typeof createTarotGameStore > | null>(null)


export const useTarotGameStore = <U,>(selector: (state:TTarotGameStore ) => U)=>{
    const store = useContext(TarotGameContext)

    if(store === null){
        throw new Error(
            'useTarotGameStore must be used within TarotGameProvider',
        )
    }

    return useStore(store,selector)
}

export const TarotGameProvider = (props:TTarotGameProviderProps) =>{

    const {globalMMKVStorage} = useGlobalMMKVContext()

    const [value] = useState(()=>createTarotGameStore(globalMMKVStorage,globalMMKVKeys.tarotGame));

    return(
        <TarotGameContext.Provider value={value}>
            {props.children}
        </TarotGameContext.Provider>
    )
}