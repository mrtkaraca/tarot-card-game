import { StateStorage } from "zustand/middleware";

import { TTarotGameCardFaceData } from "@/app/(app)/home/(tarotGameGroup)/tarotGame/components/TarotGameCardFace/type";
import { TTarotGameDeckdData } from "@/app/(app)/home/(tarotGameGroup)/tarotGame/components/TarotGameDeck/type";
import { 
    TarotGameImageQuality, 
    TTarotGameCardDrawningNumber 
} from "@/app/(app)/home/(tarotGameGroup)/tarotGame/components/TarotGameSelectionsPaginationContainer/type";
import { TTarotGameData } from "@/app/(app)/home/(tarotGameGroup)/tarotGame/type";


export type TTarotGameProviderProps = {
    children:React.ReactNode
}

export type TTarotGameStore={
    tarotGameData:TTarotGameData | null,
    tarotGameSelectionsPaginationSelectedItems:{
        tarotGameImageQuality:TarotGameImageQuality | null,
        tarotGameDrawningCardNumber: TTarotGameCardDrawningNumber | null
    };
    tarotGameCardModalData:{
        isModalVisible:false;
        cardData:null,
        deckData:null
    } | {
        isModalVisible:true;
        cardData:{
            frontFace:TTarotGameCardFaceData,
            backFace:TTarotGameCardFaceData
        }
        deckData:Pick<TTarotGameDeckdData,
            'id' |
            'name'
        >
    }
    setTarotGameData:(props:TTarotGameStore['tarotGameData'])=>void;
    setTarotGameSelectionsPaginationSelectedItems:<
        tarotGameSelectionsPaginationSelectedItems extends TTarotGameStore['tarotGameSelectionsPaginationSelectedItems'],
        tarotGameSelectionsPaginationSelectedItemKey extends keyof TTarotGameStore['tarotGameSelectionsPaginationSelectedItems']
    >(
        selectionPaginationName:tarotGameSelectionsPaginationSelectedItemKey,
        selection:tarotGameSelectionsPaginationSelectedItems[tarotGameSelectionsPaginationSelectedItemKey]
    )=>void
    setTarotGameCardModalData:(props:TTarotGameStore['tarotGameCardModalData'])=>void
}

export type TTarotEventPersistStorageConfig = {
    key:string,
    tarotGameZustandPersistStorage:StateStorage
}