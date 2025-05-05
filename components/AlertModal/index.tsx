import { 
    TouchableWithoutFeedback, 
    View,
    Text,
} from "react-native"
import Animated, { 
    FadeIn, 
    FadeOut 
} from "react-native-reanimated"

import { useAlertModalHook } from "./hook"

import { AlertModalStyle } from "./style"
import { TextButton } from "@/components/TextButton"


export const AlertModal = ()=>{

    const {
        enteringDuration,
        existingDuration,
        restAlertModalProps,
        leftButtonStyle,
        rightButtonStyle,
        restLeftButtonProps,
        restRightButtonProps,
        textButtonDefaultProps,
        alertModalViewAnimStyle,
        handleTouchOutsideView,
        handleAlertModalViewOnLayout
    } = useAlertModalHook();

    return(
        <>
            {restAlertModalProps.isAlertModalVisible &&
                <TouchableWithoutFeedback onPress={handleTouchOutsideView} >
                    <View style={AlertModalStyle.AlertModalContainerWrapper} >
                        <Animated.View 
                            entering={FadeIn.duration(enteringDuration)} 
                            exiting={FadeOut.duration(existingDuration)}
                            style={AlertModalStyle.AlertModalContainer}
                        >
                            <Animated.View 
                                onStartShouldSetResponder={() => true}
                                onLayout={handleAlertModalViewOnLayout}
                                style={[alertModalViewAnimStyle,AlertModalStyle.AlertModalInnerContainer]}
                            >
                                <View>
                                    <Text style={AlertModalStyle.AlertModalTitleText}>
                                        {restAlertModalProps.alertModalTitle}
                                    </Text>
                                </View>
                                <View style={AlertModalStyle.AlertModalDescriptionContainer}>
                                    <Text style={AlertModalStyle.AlertModalDescriptionText}>
                                        {restAlertModalProps.alertModalDescription}
                                    </Text>
                                </View>
                                <View style={AlertModalStyle.AlertModalTextButtonsContainer}>
                                    <View style={AlertModalStyle.AlertModalTextButtonsLeftButtonContainer}>
                                        <TextButton
                                            textButtonOpacityColor={textButtonDefaultProps.textButtonOpacityColor}
                                            style={[
                                                textButtonDefaultProps.style,
                                                leftButtonStyle
                                            ]}
                                            {...restLeftButtonProps}
                                        />
                                    </View>
                                    <View>
                                        <TextButton
                                            textButtonOpacityColor={textButtonDefaultProps.textButtonOpacityColor}
                                            style={[
                                                textButtonDefaultProps.style,
                                                rightButtonStyle
                                            ]}
                                            {...restRightButtonProps}
                                        />
                                    </View>
                                </View>
                            </Animated.View>
                        </Animated.View>
                    </View>
              </TouchableWithoutFeedback>
            }
        </>
    )
}