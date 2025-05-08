import { memo } from "react"
import { 
    View ,
    Text 
} from "react-native"
import Animated from "react-native-reanimated"

import { InformationPopoverButton } from "@/components/InformationPopoverButton"

import { TarotGameSettingsOnboardTarotDeckScreenInformationPopOverDescription } from "../TarotGameSettingsOnboardTarotDeckScreenInformationPopOverDescription"
import { TarotGameSettingsOnboardDefaultScreenInformationPopOverDescription } from "../TarotGameSettingsOnboardDefaultScreenInformationPopOverDescription"

import { useTarotGameSettingsOnboardScreenHook } from "./hook"
import { TarotGameSettingsOnboardScreenStyle } from "./style"
import { TTarotGameSettingsOnboardScreenProps } from "./type"

export const TarotGameSettingsOnboardScreen = memo((props:TTarotGameSettingsOnboardScreenProps)=>{

    const {
        children,
        index,
        screenName,
        screenTitle,
        onboardScreenDimensions,
        onboardScreensPagination
    } = props

    const {
        animateStyle,
    } = useTarotGameSettingsOnboardScreenHook({
        index,
        onboardScreenDimensions,
        onboardScreensPagination
    })


    return(
        <Animated.View
            style={
                [
                    TarotGameSettingsOnboardScreenStyle.TarotGameSettingsOnboardScreenContainer,
                    animateStyle
                ]
            }
        >
            <View 
                style={[TarotGameSettingsOnboardScreenStyle.TarotGameSettingsOnboardScreenHeaderContainer]}
            >
                <View
                   style={TarotGameSettingsOnboardScreenStyle.TarotGameSettingsOnboardScreenTitleContainer}
                >
                    <Text 
                        numberOfLines={1}
                        adjustsFontSizeToFit
                        style={TarotGameSettingsOnboardScreenStyle.TarotGameSettingsOnboardScreenTitleLabel}
                    >
                        {screenTitle}
                    </Text>
                </View>
                <InformationPopoverButton
                    informationPopOverPosition="AUTO"
                >
                    {(screenName === 'tarotDeck') && 
                        <TarotGameSettingsOnboardTarotDeckScreenInformationPopOverDescription/>
                    }
                    {(screenName === 'tarotBackground' || screenName === 'tarotCursor') &&
                        <TarotGameSettingsOnboardDefaultScreenInformationPopOverDescription/>
                    }
                </InformationPopoverButton>
            </View>
            { children }
        </Animated.View>
    )
})