import {
    useState,
    createContext, 
    useContext 
} from 'react'

import { 
    TAlertModalContextProps, 
    TAlertModalProviderProps 
} from './type';


const AlertModalContext = createContext({} as TAlertModalContextProps);

export const useAlertModalContext = ()=>{
    return useContext(AlertModalContext);
}

export const AlertModalProvider = (props:TAlertModalProviderProps) => {

    const [alertModalProps,setAlertModalProps] = useState<TAlertModalContextProps['alertModalProps']>(null)

    const value = {
        alertModalProps,
        setAlertModalProps
    }

    return(
        <AlertModalContext.Provider value={value}>
            {props.children}
        </AlertModalContext.Provider>
    )
}

