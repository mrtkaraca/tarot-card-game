import { 
    DerivedValue,
    MeasuredDimensions, 
    SharedValue 
} from "react-native-reanimated"
import { TTarotGameCardFaceData } from "../TarotGameCardFace/type";
import { TTarotGameCardDeckSideData } from "../TarotGameCard/type";
import { TTarotGameCardDrawningNumber } from "../TarotGameSelectionsPaginationContainer/type"

export type TTarotGameDeckdData = {
    id:string;
    name:string;
    frontFaces:Array<TTarotGameCardFaceData>,
    backFace:TTarotGameCardFaceData
}

export type TTarotGameDeck = Pick<TTarotGameDeckdData,
    'id' |
    'name'
>

export type TTarotGameDeckDataWithDeckSide = Omit<TTarotGameDeckdData,'frontFaces'> & {
    [key in keyof Pick<TTarotGameDeckdData,'frontFaces'>]:Array<TTarotGameCardFaceData & TTarotGameCardDeckSideData>
}

export type TTarotGameCardDrawningNumberLayout = Array<Array<any>>

export type TTarotGameDrawningNumbersEndingLayout = {
    [Key in TTarotGameCardDrawningNumber]:TTarotGameCardDrawningNumberLayout
} 

export type TTarotGameDeckPhases = 'startGame' | 'endGame' | null

export type TTarotGameDeckProps = {
    ref:React.RefObject<TTarotGameDeckRefProps | null>
    deckData:TTarotGameDeckDataWithDeckSide | null
    deckPhase: SharedValue<TTarotGameDeckPhases>
    deckMeasure: SharedValue<MeasuredDimensions | null>
    deckBottomSidePageCenter: DerivedValue<{
        pageX: number;
        pageY: number;
    } | null>
    deckCardDimensions: DerivedValue<{
        width: number;
        heigth: number;
    } | null>
    deckBottomSideFrontFacesIndexLength: DerivedValue<number | null>
    deckBottomSideCardsMinimumLeft: DerivedValue<number | null>
    deckBottomSideCardsPreviousMinimumLeft: DerivedValue<number | null>
    deckBottomSideSpaceBetweenCards: DerivedValue<number | null>
    deckBottomSidePreviousSpaceBetweenCards: DerivedValue<number | null>
    deckTopSidePageCenter: DerivedValue<{
        pageX: number;
        pageY: number;
    } | null>
    deckTopSideCardsMinimumLeft: DerivedValue<number | null>
    deckTopSideCardsPreviousMinimumLeft: DerivedValue<number | null>
    deckTopSideSpaceBetweenCards: DerivedValue<number | null>
    deckTopSidePreviousSpaceBetweenCards: DerivedValue<number | null>
    deckTopSideSelectedCardPage: DerivedValue<{
        x: number;
        y: number;
    } | null>
    deckBottomSideSelectedCardPage: DerivedValue<{
        x: number;
        y: number;
    } | null>
    tarotGameDeckTopSideCardEndingLayout: TTarotGameCardDrawningNumberLayout | null
    cardEndingLayoutAnimationDuration: number
}

export type TTarotGameDeckRefProps = {
    handleStartGame: () => void
    handleGetTarotGameDeckStartAnimation:()=>number
    handlePrepareCardsPhase:(
        deckBottomSideCardStoppedIndex:number
    )=>void
    handleReOrdinateCards:(
        deckTopSideSelectedCardIndex:number,
        deckBottomSideSelectedCardIndex:number
    )=>void
    handleTopSideDeckCardsZIndex:(
        deckBottomSideSelectedCardIndex:number,
        deckTopSideSelectedCardIndex:number
    )=>void
    handleMoveTarotCardFromBottomDeckToTopDeck:(
        selectedCardDeckIndex:number,
        cursorAndCardMoveToDeckTopSidekDuration:number
    )=>void
}

export type TTarotGameDeckHookProps = Pick<TTarotGameDeckProps,
    'ref' |
    'deckMeasure' |
    'deckBottomSideFrontFacesIndexLength' |
    'deckBottomSideSpaceBetweenCards'
>

export default {
    
}