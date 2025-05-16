import { TTarotGameBackgroundData } from "./TarotGameBackground/type";
import { TTarotGameCursorData } from "./TarotGameCursor/type";
import { TTarotGameDeckdData } from "./TarotGameDeck/type";


export type TTarotGameAsset = 'tarotDeck' | 'tarotBackground' | 'tarotCursor'

export type TTarotGameData = {
    tarotDeck:TTarotGameDeckdData,
    tarotBackground:TTarotGameBackgroundData,
    tarotCursor:TTarotGameCursorData
}

export default {
    
}