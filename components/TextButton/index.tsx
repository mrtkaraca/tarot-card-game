import {Text } from "react-native";
import { GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { useTextButtonHook } from "./hooks";
import { TTextButtonProps } from "./type";
import { TextButtonStyle } from "./style";

export const TextButton = (props:TTextButtonProps)=>{

    const { 
        textButtonColor,
        textButtonOpacityColor,
        textButtonTextLabel,
        textButtonBorderRadius,
        disabled,
        handleOnPress,
        style,
        ...textProps
    } = props;

    const {
        gesture,
        buttonOpacityStyle,
    } = useTextButtonHook({
        isButtonDisabled:disabled,
        handleOnPress:handleOnPress
    });


    return(
        <GestureDetector gesture={gesture}>
            <Animated.View
                pointerEvents={'box-none'}
                style={
                    [
                        TextButtonStyle.TextButtonStyleInnerContainer,
                        {
                            backgroundColor:textButtonColor,
                            borderRadius:textButtonBorderRadius
                        }
                    ]
                }
            >
                <Text
                    style={[
                        TextButtonStyle.TextButtonStyleInnerContainerDefaultText,
                        style
                    ]}
                    {...textProps}
                >
                    {textButtonTextLabel}
                </Text>
                <Animated.View
                    style={
                        [
                            buttonOpacityStyle,
                            TextButtonStyle.TextButtonStyleInnerContainerOpacity,
                            {
                                backgroundColor:textButtonOpacityColor
                            }
                        ]
                    }
                />
            </Animated.View>
        </GestureDetector>
    )
}
