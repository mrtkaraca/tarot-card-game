import { 
    View, 
    Text 
} from "react-native"

import { TarotGameSelectionSectionsContainer } from "../TarotGameSelectionSectionsContainer"

import { TTarotGameSelectionContainer } from "./type"
import { TarotGameSelectionContainerStyle } from "./style"
import { useTarotGameSelectionContainer } from "./hook"


export const TarotGameSelectionContainer = (props:TTarotGameSelectionContainer)=>{

    const {
        selectionPaginationData,
    } = props

    const {

    } = useTarotGameSelectionContainer({
        
    })


    return(
        <View
            style={TarotGameSelectionContainerStyle.TarotGameSelectionContainerContainer}
        >
            <View
                style={TarotGameSelectionContainerStyle.TarotGameSelectionContainerTextHeaderContainer}
            >
                <Text
                    numberOfLines={1} 
                    style={TarotGameSelectionContainerStyle.TarotGameSelectionContainerTextHeader}
                >
                    {selectionPaginationData.title}
                </Text>
            </View>
            <TarotGameSelectionSectionsContainer
                tarotGameSelectionSectionsId={selectionPaginationData.id}
                tarotGameSelectionSectionsData={selectionPaginationData.data}
            />
        </View>
    )
}

export default {
    TarotGameSelectionContainer
}