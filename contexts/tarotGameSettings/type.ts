import { StateStorage } from "zustand/middleware";

import { 
    TTarotGameSettingsData, 
    TTarotGameSettingsScreens,
    TTarotGameSettingsScreensDefaultData,
    TTarotGameSettingsTarotDeckScreenData
} from "@/app/(app)/home/(tarotGameGroup)/tarotGameSettings/type";



export type TTarotEventProviderProps = {
    children:React.ReactNode
}

export type TTarotGameSettingsStore={
    tarotGameSettingsData:TTarotGameSettingsData | null | undefined,
    tarotGameSettingsItemModal:({
        modalVisibility:true,
    } & ({
        screenName:Exclude<TTarotGameSettingsScreens,'tarotDeck'>,
        item:TTarotGameSettingsScreensDefaultData
    } | {
        screenName:Extract<TTarotGameSettingsScreens,'tarotDeck'>,
        item: TTarotGameSettingsTarotDeckScreenData
    })) | ({
        modalVisibility:false,
        screenName:null | undefined,
        item:null | undefined
    });
    setTarotGameSettingsData:(props:TTarotGameSettingsStore['tarotGameSettingsData'])=>void
    setTarotGameSettingsItemModal:(props: TTarotGameSettingsStore['tarotGameSettingsItemModal'])=>void;
}

export type TTarotEventPersistStorageConfig = {
    key:string,
    tarotGameSettingsZustandPersistStorage:StateStorage
}