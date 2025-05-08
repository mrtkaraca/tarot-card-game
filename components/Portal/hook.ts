import { usePortalStore } from "@/contexts/portal";
import { PortalHookProps } from "./type";
import { useEffect } from "react";

export const usePortalHook = (props:PortalHookProps)=>{

    const addComponent = usePortalStore((state)=>state.addComponent)
    const removeComponent = usePortalStore((state)=>state.removeComponent)


    useEffect(()=>{
        if(props.id && props.children){
            addComponent(props)
        }

        return ()=>{
            if(props.id && props.children){
                removeComponent(props.id)
            } 
        }
    },[props])

}