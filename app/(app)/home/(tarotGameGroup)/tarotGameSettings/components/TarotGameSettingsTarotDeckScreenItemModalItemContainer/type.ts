import { TTarotGameSettingsScreens, TTarotGameSettingsTarotDeckScreenData } from "../type"

export type TTarotGameSettingsTarotDeckScreenItemModalItemContainerProps = {
    data: TTarotGameSettingsTarotDeckScreenData 
    screenName:Extract<TTarotGameSettingsScreens,'tarotDeck'>
}