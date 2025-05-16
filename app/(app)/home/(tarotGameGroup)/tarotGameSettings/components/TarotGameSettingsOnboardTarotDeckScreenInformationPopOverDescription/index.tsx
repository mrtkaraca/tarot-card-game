import { Fragment } from "react"
import {  
    Text 
} from "react-native"
import { useTarotGameSettingsOnboardTarotDeckScreenInformationPopOverDescriptionHook } from "./hook"

export const TarotGameSettingsOnboardTarotDeckScreenInformationPopOverDescription = ()=>{
    const {
        t
    } = useTarotGameSettingsOnboardTarotDeckScreenInformationPopOverDescriptionHook()
    
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
            <Text>
                {t('tarotGameSettings.tarotGameSettingsOnboardTarotDeckScreenInformationPopOverDescription.slideImage.title') + '\n'}
                <Text>
                    {t('tarotGameSettings.tarotGameSettingsOnboardTarotDeckScreenInformationPopOverDescription.slideImage.description')}
                </Text>
            </Text>
        </Fragment>
    )
}

export default {
    TarotGameSettingsOnboardTarotDeckScreenInformationPopOverDescription
}