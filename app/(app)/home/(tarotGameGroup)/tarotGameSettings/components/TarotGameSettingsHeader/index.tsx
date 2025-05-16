import { 
    View,
    Text, 
    PixelRatio 
} from "react-native"
import Animated from "react-native-reanimated"

import { IconButton } from "@/components/IconButton"
import { TextButton } from "@/components/TextButton"

import { Colors, TarotGameSettingsColors } from "@/constants/color"
import { TarotGameSettingsSize } from "@/constants/size"
import { TarotGameSettingsIcons } from "@/constants/icon"

import { useTarotGameSettingsHeaderHook } from "./hook"
import { TarotGameSettingsHeaderStyle } from "./style"
import { TTarotGameSettingsHeaderProps } from "./type"


export const TarotGameSettingsHeader = (props:TTarotGameSettingsHeaderProps) =>{

    const { 
        t,
        leftSideRef,
        rightSideRef,
        leftSideAnimStyle,
        rightSideAnimStyle,
        isTarotGameSettingsDataReady,
        handleLeftButton,
        handleSkip,
        handleOnLayout,
    } = useTarotGameSettingsHeaderHook({
        onboardScreensPagination:props.onboardScreensPagination
    })

   
    return(
        <Animated.View 
            style={TarotGameSettingsHeaderStyle.TarotGameSettingsHeaderContainer}
            onLayout={handleOnLayout}
        >
            <Animated.View
                ref={leftSideRef}
                style={[
                    TarotGameSettingsHeaderStyle.TarotGameSettingsHeaderLeftButtonContainer,
                    leftSideAnimStyle
                ]}
            >
                <IconButton
                    icon={TarotGameSettingsIcons.back}
                    buttonSize={TarotGameSettingsSize.IconButtons.buttonSize}
                    iconColor={TarotGameSettingsColors.IconButtons.iconColor}
                    buttonOpacityColor={TarotGameSettingsColors.IconButtons.buttonOpacityColor}
                    handleOnPress={handleLeftButton}
                />
            </Animated.View>
            <View
                style={TarotGameSettingsHeaderStyle.TarotGameSettingsHeaderTextContainer}
            >
                <Text 
                        numberOfLines={1}
                        adjustsFontSizeToFit
                        style={TarotGameSettingsHeaderStyle.TarotGameSettingsHeaderTextLabel}
                    >
                        {props.textLabel}
                </Text>
            </View>
            <Animated.View
                ref={rightSideRef}
                style={[
                    TarotGameSettingsHeaderStyle.TarotGameSettingsHeaderRightButtonContainer,
                    rightSideAnimStyle
                ]}
            >
                <TextButton
                    disabled={!isTarotGameSettingsDataReady}
                    numberOfLines={1}
                    style={{
                        color:isTarotGameSettingsDataReady ? 
                            TarotGameSettingsColors.tarotGameSettingsHeader.skipDataReady 
                            : 
                            TarotGameSettingsColors.tarotGameSettingsHeader.skipDataNotReady ,
                    }}
                    textButtonTextLabel={t('tarotGameSettings.tarotGameSettingsHeader.skip')}
                    textButtonOpacityColor={TarotGameSettingsColors.TextButtons.buttonOpacityColor}
                    handleOnPress={handleSkip}
                />
            </Animated.View>
        </Animated.View>
    )
}

export default {
    TarotGameSettingsHeader
}
