import {  
    TouchableWithoutFeedback, 
    View, 
    Text 
} from "react-native";

import Animated from "react-native-reanimated";

import { TarotGameSettingsDefaultScreenItemModalItemContainer } from "../TarotGameSettingsDefaultScreenItemModalItemContainer";
import { TarotGameSettingsTarotDeckScreenItemModalItemContainer } from "../TarotGameSettingsTarotDeckScreenItemModalItemContainer";

import { useTarotGameSettingsScreenItemModalContainerHook } from "./hook";
import { TarotGameSettingsScreenItemModalContainerStyle } from "./style";

export const TarotGameSettingsScreensItemModalContainer = ()=>{


    const {
        imageAspectRatio,
        imageMaxHeigth,
        tarotGameSettingsItemModal,
        handleModalVisibility
    } = useTarotGameSettingsScreenItemModalContainerHook();

    return(
        <>
            {tarotGameSettingsItemModal.modalVisibility && (
                <Animated.View style={[TarotGameSettingsScreenItemModalContainerStyle.TarotGameSettingsScreenItemModalContainer]}>
                    <TouchableWithoutFeedback onPress={handleModalVisibility}>
                        <View style={TarotGameSettingsScreenItemModalContainerStyle.TarotGameSettingsScreenItemModalInnerContainer}>
                            <View style={TarotGameSettingsScreenItemModalContainerStyle.TarotGameSettingsScreenItemModalItemContainer}>
                                <View 
                                    onStartShouldSetResponder={()=>true}
                                    style={[
                                        TarotGameSettingsScreenItemModalContainerStyle.TarotGameSettingsScreenItemModalItemInnerContainer,
                                        {
                                            aspectRatio:imageAspectRatio,
                                            maxHeight:imageMaxHeigth
                                        }
                                    ]}
                                >
                                    {tarotGameSettingsItemModal.screenName === 'tarotDeck' ? 
                                        <TarotGameSettingsTarotDeckScreenItemModalItemContainer
                                            screenName={tarotGameSettingsItemModal.screenName}
                                            data={tarotGameSettingsItemModal.item}
                                        />
                                        : 
                                        <TarotGameSettingsDefaultScreenItemModalItemContainer
                                            screenName={tarotGameSettingsItemModal.screenName}
                                            data={tarotGameSettingsItemModal.item}
                                        />        
                                    }
                                </View>
                                <View style={TarotGameSettingsScreenItemModalContainerStyle.TarotGameSettingsScreenItemModalItemInnerContaierTextContainer}>
                                    <Text style={TarotGameSettingsScreenItemModalContainerStyle.TarotGameSettingsScreenItemModalItemInnerContaierText}>{
                                        tarotGameSettingsItemModal.screenName === 'tarotDeck' ? 
                                            <Text>
                                                {tarotGameSettingsItemModal.item.name}
                                                {'\n'}
                                                {tarotGameSettingsItemModal.item.randomFrontFace.name}
                                            </Text>
                                            : 
                                            tarotGameSettingsItemModal.item.name
                                        }
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Animated.View>
            )}
        </>
    )
}

export default {
    TarotGameSettingsScreensItemModalContainer
}

