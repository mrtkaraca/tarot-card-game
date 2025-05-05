import { TTarotGameSettingsScreens } from "../../type"

export const screenTitles = {
    tarotBackground:'Tarot Arka Planını Seç',
    tarotCursor:'Tarot İmleçini Seç',
    tarotDeck:'Tarot Desteni Seç'
}

export type  TOnboardScreenData = {
    id:number
    name:Exclude<TTarotGameSettingsScreens,'tarotDeck'>,
    screenTitle:string,
} | {
    id:number
    name:Extract<TTarotGameSettingsScreens,'tarotDeck'>,
    screenTitle:string,
}

export type TOnboardScreensData = Array<TOnboardScreenData>

export const onboardScreensData:TOnboardScreensData = [
    {
        id:0,
        name:"tarotBackground",
        screenTitle:screenTitles['tarotBackground'],
    },
    {
        id:1,
        name:'tarotCursor',
        screenTitle:screenTitles['tarotCursor'],
    },
    {
        id:2,
        name:'tarotDeck',
        screenTitle:screenTitles['tarotDeck'],
    }
]