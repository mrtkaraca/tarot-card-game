import { 
    View, 
    Text
 } from "react-native"

import Animated from "react-native-reanimated"

import { 
    GestureDetector
} from "react-native-gesture-handler"

import { TTarotGameSelectionSectionProps } from "./type"
import { useTarotGameSelectionSectionHook } from "./hook"
import { TarotGameSelectionSectionStyle } from "./style"

export const TarotGameSelectionSection = (props:TTarotGameSelectionSectionProps)=>{

    const {
        selection,
        isSelected,
        selectionOpacitiyColor,
        handleOnSelect
    } = props

    const {
        tapGesture,
        boxAnimatedStyle,
        selectionAnimatedStyle
    } = useTarotGameSelectionSectionHook({
        isSelected,
        handleOnSelect
    })

    return(
        <GestureDetector gesture={tapGesture} >
            <View>
                <View
                    style={TarotGameSelectionSectionStyle.TarotGameSelectionSectionInnerContainer}
                >
                    <View
                        style={TarotGameSelectionSectionStyle.TarotGameSelectionSectionTextContainer}
                    >
                        <Text
                            adjustsFontSizeToFit
                            numberOfLines={1}
                            style={TarotGameSelectionSectionStyle.TarotGameSelectionSectionText}
                        >
                            {selection.name}
                        </Text>
                    </View>
                    <View
                        style={TarotGameSelectionSectionStyle.TarotGameSelectionSectionBoxContainer}
                    >
                        <Animated.View 
                            style={[
                                TarotGameSelectionSectionStyle.TarotGameSelectionSectionBox,
                                boxAnimatedStyle,
                            ]}
                        />
                    </View>
                </View>
                <Animated.View 
                    style={[
                        selectionAnimatedStyle,
                        TarotGameSelectionSectionStyle.TarotGameSelectionSectionOpacityContainer,
                        {
                            backgroundColor:selectionOpacitiyColor
                        }
                    ]} 
                />
            </View>
        </GestureDetector>
    )
}

export default {
    TarotGameSelectionSection
}