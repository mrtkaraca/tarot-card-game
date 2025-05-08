import { View } from "react-native";

import { TextButton } from "@/components/TextButton";

import { useTarotGameSettingsFooterHook } from "./hook";
import { TarotGameSettingsFooterStyle } from "./style";
import { TTarotGameSettingsFooterProps } from "./type";
import { TarotGameSettingsColors } from "@/constants/color";

export const TarotGameSettingsFooter = (props:TTarotGameSettingsFooterProps)=>{

    const {
        onboardScreensData,
        onboardScreensPagination
    } = props

    const {
        t,
        currentScreenIndex,
        isCurrentScreenItemSelected,
        handlePreviousScreen,
        handleNextScreen,
        handleNavigateToTarotGame
    } = useTarotGameSettingsFooterHook({
        onboardScreensData,
        onboardScreensPagination
    });


    return(
        <View style={TarotGameSettingsFooterStyle.TarotGameSettingsFooterContainer}>
            <View>
                {currentScreenIndex !== 0 ?
                    <TextButton
                        textButtonTextLabel={t('tarotGameSettings.tarotGameSettingsFooter.leftButtonTextLabel')}
                        handleOnPress={handlePreviousScreen}
                        textButtonOpacityColor={TarotGameSettingsColors.TextButtons.buttonOpacityColor}
                        numberOfLines={1}
                    />
                    : null
                }
            </View>
            <View>
                <TextButton
                    disabled={!isCurrentScreenItemSelected}
                    textButtonTextLabel={currentScreenIndex  !== onboardScreensData.length-1 ? 
                        t('tarotGameSettings.tarotGameSettingsFooter.rightButtonTextLabel')
                        : 
                        t('tarotGameSettings.tarotGameSettingsFooter.rightButtonEndTextLabel')
                    }
                    handleOnPress={currentScreenIndex !== onboardScreensData.length-1 ? handleNextScreen : handleNavigateToTarotGame}
                    textButtonOpacityColor={TarotGameSettingsColors.TextButtons.buttonOpacityColor}
                    numberOfLines={1}
                    style={{
                        color:isCurrentScreenItemSelected ? 
                            TarotGameSettingsColors.TarotGameSettingsFooter.currentScreenItemIsSelected 
                            : 
                            TarotGameSettingsColors.TarotGameSettingsFooter.currentScreenItemIsNotSelected,
                    }}
                />
            </View>
        </View>
    )
}