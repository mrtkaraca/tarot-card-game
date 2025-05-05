import { TTarotGameSelectionContainer } from "../TarotGameSelectionContainer/type"
import { TTarotGameSelectionSectionProps } from "../TarotGameSelectionSection/type"

export default {}

export type TTarotGameSelectionSectionsContainerProps = {
    tarotGameSelectionSectionsId:TTarotGameSelectionContainer['selectionPaginationData']['id']
    tarotGameSelectionSectionsData: TTarotGameSelectionContainer['selectionPaginationData']['data']
}

export type TTarotGameSelectionSectionsContainerHookProps = Pick<TTarotGameSelectionSectionsContainerProps,
    'tarotGameSelectionSectionsId'
>
