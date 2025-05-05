import { TextButton } from "@/components/TextButton";
import { View, PixelRatio } from "react-native";
import { useTarotGameSettingsFooterHook } from "./hook";
import { TarotGameSettingsFooterStyle } from "./style";
import { TTarotGameSettingsFooterProps } from "./type";

export const TarotGameSettingsFooter = (props:TTarotGameSettingsFooterProps)=>{

    const {
        currentScreenIndex,
        isCurrentScreenItemSelected,
        handlePreviousScreen,
        handleNextScreen,
        handleNavigateToTarotGame
    } = useTarotGameSettingsFooterHook(props);


    return(
        <View style={TarotGameSettingsFooterStyle.TarotGameSettingsFooterContainer}>
            <View>
                {currentScreenIndex !== 0 ?
                    <TextButton
                        textButtonTextLabel="Geri"
                        handleOnPress={handlePreviousScreen}
                        textButtonOpacityColor="#00000055"
                        numberOfLines={1}
                    />
                    : null
                }
            </View>
            <View>
                <TextButton
                    disabled={!isCurrentScreenItemSelected}
                    textButtonTextLabel={currentScreenIndex  !== 2 ? 'İleri' : 'Tamam'}
                    handleOnPress={currentScreenIndex !== 2 ? handleNextScreen : handleNavigateToTarotGame}
                    textButtonOpacityColor="#00000055"
                    numberOfLines={1}
                    style={{
                        color:isCurrentScreenItemSelected ? 'blue' : 'grey',
                    }}
                />
            </View>
        </View>
    )
}