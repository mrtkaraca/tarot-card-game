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
                {t('tarotGameSettings.tarotGameSettingsOnboardTarotDeckScreenInformationPopOverDescription.oneTap.title') + ' '}
                <Text>
                    {t('tarotGameSettings.tarotGameSettingsOnboardTarotDeckScreenInformationPopOverDescription.oneTap.description') + '\n'}
                </Text>
            </Text>
            <Text>
                {t('tarotGameSettings.tarotGameSettingsOnboardTarotDeckScreenInformationPopOverDescription.doubleTap.title') + ' '}
                <Text>
                    {t('tarotGameSettings.tarotGameSettingsOnboardTarotDeckScreenInformationPopOverDescription.doubleTap.description')}
                </Text>
            </Text>
        </Fragment>
    )
}

export default {
    TarotGameSettingsOnboardDefaultScreenInformationPopOverDescription
}