import { Fragment } from "react"
import { Text } from "react-native"

import { useTarotGameSettingsOnboardDefaultScreenInformationPopOverDescription } from "./hook"

export const TarotGameSettingsOnboardDefaultScreenInformationPopOverDescription = ()=>{

    const {
        t
    } = useTarotGameSettingsOnboardDefaultScreenInformationPopOverDescription()

    return(
        <Fragment>
            <Text>
                {t('tarotGameSettings.tarotGameSettingsOnboardTarotDeckScreenInformationPopOverDescription.oneTap.title') + '\n'}
                <Text>
                    {t('tarotGameSettings.tarotGameSettingsOnboardTarotDeckScreenInformationPopOverDescription.oneTap.description') + '\n'}
                </Text>
            </Text>
            <Text>
                {t('tarotGameSettings.tarotGameSettingsOnboardTarotDeckScreenInformationPopOverDescription.doubleTap.title') + '\n'}
                <Text>
                    {t('tarotGameSettings.tarotGameSettingsOnboardTarotDeckScreenInformationPopOverDescription.doubleTap.description') + '\n'}
                </Text>
            </Text>
        </Fragment>
    )
}

export default {
    TarotGameSettingsOnboardDefaultScreenInformationPopOverDescription
}