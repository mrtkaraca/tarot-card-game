import { 
    TTarotGameData 
} from "../type"


export type TTarotGameInnerContainerProps = {
    tarotGameDataWithoutBackground:Pick<TTarotGameData,
        'tarotCursor' |
        'tarotDeck'
    >
}

export type TTarotGameInnerContainerHookProps = TTarotGameInnerContainerProps

export default {
    
}