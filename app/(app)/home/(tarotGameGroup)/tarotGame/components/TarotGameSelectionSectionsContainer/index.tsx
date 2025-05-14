import { 
    ScrollView
} from "react-native"

import { TarotGameColors } from "@/constants/color"

import {TarotGameSelectionSection} from "../TarotGameSelectionSection"

import { TTarotGameSelectionSectionsContainerProps } from "./type"
import { useTarotGameSelectionSectionsContainerHook } from "./hook"
import { TarotGameSelectionSectionsContainerStyle } from "./style"

export const TarotGameSelectionSectionsContainer = (props:TTarotGameSelectionSectionsContainerProps)=>{
    
    const {
        tarotGameSelectionSectionsId,
        tarotGameSelectionSectionsData
    } = props

    const {
        tarotGameSelectionPaginationSelectedItem,
        setTarotGameSelectionsPaginationSelectedItems
    } = useTarotGameSelectionSectionsContainerHook({
        tarotGameSelectionSectionsId
    })



    return(
        <ScrollView
            style={TarotGameSelectionSectionsContainerStyle.TarotGameSelectionSectionsContainerContainer}
        >
            {tarotGameSelectionSectionsData.map((selection,index)=>{
                return(
                    <TarotGameSelectionSection
                        key={index}
                        selection={selection}
                        isSelected={tarotGameSelectionPaginationSelectedItem === selection.id ? true : false}
                        selectionOpacitiyColor={TarotGameColors.TarotGameSelectionSection.selectionOpacitiyColor}
                        handleOnSelect={()=>setTarotGameSelectionsPaginationSelectedItems(tarotGameSelectionSectionsId,selection.id)}
                    />
                )
            })}
        </ScrollView>
    )
}

export default {
    TarotGameSelectionSectionsContainer
}