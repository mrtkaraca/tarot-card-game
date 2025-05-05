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
        animateStyle,
    } = useTarotGameSettingsOnboardScreenHook({
        index:props.index,
        onboardScreenDimensions:props.onboardScreenDimensions,
        onboardScreensPagination:props.onboardScreensPagination
    })


    return(
        <Animated.View
            style={
                [animateStyle,TarotGameSettingsOnboardScreenStyle.TarotGameSettingsOnboardScreenContainer]
            }
        >
            <View 
                style={[TarotGameSettingsOnboardScreenStyle.TarotGameSettingsOnboardScreenTitleContainer]}
            >
                <Text style={TarotGameSettingsOnboardScreenStyle.TarotGameSettingsOnboardScreenTitleLabel}>{props.screenTitle}</Text>
                <InformationPopoverButton
                    informationPopOverPosition="AUTO"
                >
                    {(props.screenName === 'tarotDeck') && 
                        <TarotGameSettingsOnboardTarotDeckScreenInformationPopOverDescription/>
                    }
                    {(props.screenName === 'tarotBackground' || props.screenName === 'tarotCursor') &&
                        <TarotGameSettingsOnboardDefaultScreenInformationPopOverDescription/>
                    }
                </InformationPopoverButton>
            </View>
            { props.children }
        </Animated.View>
    )
})