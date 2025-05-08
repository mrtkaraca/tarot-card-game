import { TTarotGameSettingsScreens, TTarotGameSettingsScreensDefaultData } from "../type"

export type TTarotGameSettingsDefaultScreenItemModalItemContainerProps = {
    data: TTarotGameSettingsScreensDefaultData
    screenName:Exclude<TTarotGameSettingsScreens,'tarotDeck'>
}