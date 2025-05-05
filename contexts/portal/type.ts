import { TPortalProps } from "components/Portal/type"


export type TPortalStore = {
    components:{
        [key:TPortalProps['id']]:TPortalProps['children']
    } | null,
    addComponent:(component:TPortalProps)=>void,
    removeComponent:(id?:TPortalProps['id'])=>void
}

export type TPortalProviderProps = {
    children:React.ReactNode
}