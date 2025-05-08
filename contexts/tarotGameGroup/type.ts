import { StateStorage } from "zustand/middleware";

import { TTarotGameSettingsScreens } from "@/app/(app)/home/(tarotGameGroup)/tarotGameSettings/components/type";

export type TTarotGameGroupProviderProps = {
    children:React.ReactNode
}

export type TTarotGameGroupStore={
    tarotGameSettingsSelectedItems:{
        tarotBackground:string | null,
        tarotCursor:string | null,
        tarotDeck:string | null
    };
    setTarotGameSettingsSelectedItems:(screenName:TTarotGameSettingsScreens,itemId:string | null)=>void
    getReadOnlyTarotGameSettingsSelectedItems:()=>TTarotGameGroupStore['tarotGameSettingsSelectedItems'];
}

export type TTarotGameGroupPersistStorageConfig = {
    key:string,
    tarotGameGroupsZustandPersistStorage:StateStorage
}