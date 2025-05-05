import { create } from "zustand"
import { TPortalStore } from "./type"

export const createPortalStore = ()=>{
    return create<TPortalStore>()(
        (set,get)=>({
            components:null,
            addComponent:(component)=>set((state)=>({components:{
                ...state.components,
                [component.id]:component.children
            }})),
            removeComponent:(id)=>{
                if(id){
                    const components = get().components;
                    if(components){
                        delete components[id]
                        set(()=>({components:components}))
                    }
                }
                else{
                    set(()=>({components:null}))
                }
            }
        })
    )
}