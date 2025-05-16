import { useTarotGameStore } from "@/contexts/tarotGame"
import { 
    TTarotGameSelectionSectionsContainerHookProps, 
} from "./type"

export const useTarotGameSelectionSectionsContainerHook = (props:TTarotGameSelectionSectionsContainerHookProps)=>{

    const {
        tarotGameSelectionSectionsId
    } = props


    const tarotGameSelectionPaginationSelectedItem = useTarotGameStore((state)=>state.tarotGameSelectionsPaginationSelectedItems[tarotGameSelectionSectionsId])
    const setTarotGameSelectionsPaginationSelectedItems = useTarotGameStore((state)=>state.setTarotGameSelectionsPaginationSelectedItems)

    
    return{
        tarotGameSelectionPaginationSelectedItem,
        setTarotGameSelectionsPaginationSelectedItems
    }
}

export default {
    useTarotGameSelectionSectionsContainerHook
}