import { 
    createContext, 
    useContext 
} from "react"
import { 
    useMMKV, 
    useMMKVObject 
} from "react-native-mmkv"

import { 
    TGlobalMMKVContext, 
    TGlobalMMKVProviderProps 
} from "./type"

const GlobalMMKVContext = createContext({} as TGlobalMMKVContext)

export const useGlobalMMKVContext = () =>{
    return useContext(GlobalMMKVContext)
}

export const GlobalMMKVProvider = (props:TGlobalMMKVProviderProps)=>{

    const globalMMKVStorage = useMMKV();

    const value = {
        globalMMKVStorage
    }

    return(
        <GlobalMMKVContext.Provider value={value}>
            {props.children}
        </GlobalMMKVContext.Provider>
    )
}