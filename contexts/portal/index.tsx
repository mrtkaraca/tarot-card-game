import { 
    createContext, 
    Fragment, 
    useContext, 
    useState 
} from "react";
import { useStore } from "zustand";

import { createPortalStore } from "./zustand";
import { TPortalProviderProps, TPortalStore } from "./type";


export const PortalContext = createContext<ReturnType<typeof createPortalStore > | null>(null)

export const usePortalStore = <U,>(selector: (state: TPortalStore) => U)=>{
    const store = useContext(PortalContext)

    if(store === null){
        throw new Error(
            'usePortalStore must be used within PortalProvider',
        )
    }

    return useStore(store,selector)
}

export const PortalProvider = (props:TPortalProviderProps)=>{


    const [values] = useState(()=>createPortalStore())

    const components = values((state)=>state.components)

    return(
        <PortalContext.Provider value={values}>
            {props.children}
            <Fragment>
                {components &&
                    Object.entries(components).map(([id,component])=>{
                        return(
                            <Fragment key={id}>
                                {component}
                            </Fragment>
                        )
                    })
                }
            </Fragment>
        </PortalContext.Provider>
    )
}