import { TPortalProps } from "./type"
import { usePortalHook } from "./hook"

export const Portal = (props:TPortalProps)=>{

    usePortalHook(props);

    return null
}