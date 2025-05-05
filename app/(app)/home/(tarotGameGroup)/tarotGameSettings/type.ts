export type TTarotGameSettingsScreens = 'tarotBackground' | 'tarotCursor' | 'tarotDeck'

export type TTarotGameSettingsScreensDefaultData = {
    id:string;
    name:string;
    image:{
        url:string,
        blurhash:string,
        ext:string
    };
}

export type TTarotGameSettingsTarotDeckScreenData = {
    id:string;
    name:string;
    backFace:{
        image:{
            blurhash:string,
            url:string,
            ext:string
        }
    },
    randomFrontFace:{
        id:string,
        name:string,
        image:{
            blurhash:string,
            url:string,
            ext:string
        }
    }
}

export type TTarotGameSettingsDefaultData = Array<TTarotGameSettingsScreensDefaultData>

export type TTarotGameSettingsTarotDeckData = Array<TTarotGameSettingsTarotDeckScreenData>

export type TTarotGameSettingsData = {
    tarotBackground:TTarotGameSettingsDefaultData | null,
    tarotCursor:TTarotGameSettingsDefaultData | null,
    tarotDeck:TTarotGameSettingsTarotDeckData | null
}




