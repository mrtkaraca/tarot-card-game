import { 
    useCallback, 
    useState 
} from "react"
import {
    runOnJS, 
    useAnimatedReaction 
} from "react-native-reanimated"

import { TTTarotGameSelectionsFooterContainerHookProps } from "./type"
import { useTarotGameStore } from "@/contexts/tarotGame"
import { useTranslation } from "react-i18next"


export const useTarotGameSelectionsFooterContainerHook = (props:TTTarotGameSelectionsFooterContainerHookProps)=>{

    const {
        tarotGameSelectionsPaginationContainerRef,
        tarotGameSelectionPaginationCurrentIndex:tgspcia,
        tarotGameSelectionPaginationCurrentId:tgspcida,
        handleOnFetchStart
    } = props

    const {
        t
    } = useTranslation()

    const [tarotGameSelectionPaginationCurrentIndex,setTarotGameSelectionPaginationCurrentIndex] = useState<number | null>(null)
    const [tarotGameSelectionPaginationCurrentId,setTarotGameSelectionPaginationCurrentId] = useState<typeof tgspcida.value>(tgspcida.get)

    const tarotGameIsCurrentSelectionPaginationItemSelected = useTarotGameStore((state)=>state.tarotGameSelectionsPaginationSelectedItems[tarotGameSelectionPaginationCurrentId] ? true : false)

    const handleTarotGameSelectionPaginationPrevious = useCallback(()=>{
        if(tarotGameSelectionsPaginationContainerRef.current){
            tarotGameSelectionsPaginationContainerRef.current.handlePreviousPagination()
        }
    },[])

    const handleTarotGameSelectionPaginationNext = useCallback(()=>{
        if(tarotGameSelectionsPaginationContainerRef.current){
            tarotGameSelectionsPaginationContainerRef.current.handleNextPagination()
        }
    },[])

    const handleTarotGameSelectionPaginatinOk = useCallback(()=>{
        handleOnFetchStart()
    },[])

    useAnimatedReaction(
        ()=>tgspcia,
        ()=>{
            runOnJS(setTarotGameSelectionPaginationCurrentIndex)(tgspcia.value)
        }
    )

    useAnimatedReaction(
        ()=>tgspcida,
        ()=>{
            runOnJS(setTarotGameSelectionPaginationCurrentId)(tgspcida.value)
        }
    )

    return{
        t,
        tarotGameSelectionPaginationCurrentIndex,
        tarotGameSelectionPaginationCurrentId,
        tarotGameIsCurrentSelectionPaginationItemSelected,
        handleTarotGameSelectionPaginationPrevious,
        handleTarotGameSelectionPaginationNext,
        handleTarotGameSelectionPaginatinOk
    }
}

export default {
    useTarotGameSelectionsFooterContainerHook
}