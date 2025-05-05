import { 
    View,
    Text, 
    PixelRatio 
} from "react-native"
import Animated from "react-native-reanimated"

import { IconButton } from "@/components/IconButton"
import { TextButton } from "@/components/TextButton"

import { Colors } from "@/constants/color"
import { Sizes } from "@/constants/size"
import { TarotGameSettingsIcons } from "@/constants/icon"

import { useTarotGameSettingsHeaderHook } from "./hook"
import { TarotGameSettingsHeaderStyle } from "./style"
import { TTarotGameSettingsHeaderProps } from "./type"


export const TarotGameSettingsHeader = (props:TTarotGameSettingsHeaderProps) =>{

    const { 
        leftSideRef,
        rightSideRef,
        leftSideAnimStyle,
        rightSideAnimStyle,
        isTarotGameSettingsDataReady,
        handleLeftButton,
        handleSkip,
    } = useTarotGameSettingsHeaderHook({
        onboardScreensPagination:props.onboardScreensPagination
    })

    return(
        <Animated.View 
            style={TarotGameSettingsHeaderStyle.TarotGameSettingsHeaderContainer}
        >
            <Animated.View
                ref={leftSideRef}
                style={[TarotGameSettingsHeaderStyle.TarotGameSettingsHeaderLeftButtonContainer,leftSideAnimStyle]}
            >
                <IconButton
                    icon={TarotGameSettingsIcons.back}
                    buttonSize={Sizes.TarotEvent.IconButtons.buttonSize}
                    iconColor={Colors.TarotEvent.IconButtons.iconColor}
                    buttonOpacityColor={Colors.TarotEvent.IconButtons.buttonOpacityColor}
                    handleOnPress={handleLeftButton}
                />
            </Animated.View>
            <View
                style={TarotGameSettingsHeaderStyle.TarotGameSettingsHeaderTextContainer}
            >
                <Text 
                        numberOfLines={1} 
                        style={TarotGameSettingsHeaderStyle.TarotGameSettingsHeaderTextLabel}
                    >
                        {props.textLabel}
                </Text>
            </View>
            <Animated.View
                ref={rightSideRef}
                style={[TarotGameSettingsHeaderStyle.TarotGameSettingsHeaderRightButtonContainer,rightSideAnimStyle]}
            >
                <TextButton
                    disabled={!isTarotGameSettingsDataReady}
                    numberOfLines={1}
                    style={{
                        color:isTarotGameSettingsDataReady ? 'blue' : 'grey',
                    }}
                    textButtonTextLabel="Skip"
                    textButtonOpacityColor="grey"
                    handleOnPress={handleSkip}
                />
            </Animated.View>
        </Animated.View>
    )
}