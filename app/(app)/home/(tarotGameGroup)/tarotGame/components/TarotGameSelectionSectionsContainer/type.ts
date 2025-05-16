import { TTarotGameSelectionContainer } from "../TarotGameSelectionContainer/type"

export type TTarotGameSelectionSectionsContainerProps = {
    tarotGameSelectionSectionsId:TTarotGameSelectionContainer['selectionPaginationData']['id']
    tarotGameSelectionSectionsData: TTarotGameSelectionContainer['selectionPaginationData']['data']
}

export type TTarotGameSelectionSectionsContainerHookProps = Pick<TTarotGameSelectionSectionsContainerProps,
    'tarotGameSelectionSectionsId'
>

export default {

}