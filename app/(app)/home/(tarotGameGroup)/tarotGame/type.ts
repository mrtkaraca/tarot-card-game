import { TTarotGameBackgroundData } from "./components/TarotGameBackground/type";
import { TTarotGameCursorData } from "./components/TarotGameCursor/type";
import { TTarotGameDeckdData } from "./components/TarotGameDeck/type";

export default undefined

export type TTarotGameAsset = 'tarotDeck' | 'tarotBackground' | 'tarotCursor'

export type TTarotGameData = {
    tarotDeck:TTarotGameDeckdData,
    tarotBackground:TTarotGameBackgroundData,
    tarotCursor:TTarotGameCursorData
}