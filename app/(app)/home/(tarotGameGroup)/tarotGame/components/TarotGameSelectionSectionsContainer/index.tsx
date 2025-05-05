import { ScrollView, View } from "react-native"

import {TarotGameSelectionSection} from "../TarotGameSelectionSection"

import { TTarotGameSelectionSectionsContainerProps } from "./type"
import { useTarotGameSelectionSectionsContainerHook } from "./hook"
import { TarotGameSelectionSectionsContainerStyle } from "./style"


export default {}

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
                        selectionOpacitiyColor="#00000030"
                        handleOnSelect={()=>setTarotGameSelectionsPaginationSelectedItems(tarotGameSelectionSectionsId,selection.id)}
                    />
                )
            })}
        </ScrollView>
    )
}