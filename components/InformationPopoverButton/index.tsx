import { PixelRatio } from "react-native"
import Animated from "react-native-reanimated"

import { Portal } from "@/components/Portal"
import { IconButton } from "@/components/IconButton"
import { InformationPopOver } from "@/components/InformationPopOver"

import { InformationPopOverButtonIcon } from "@/constants/icon"

import { TInformationPopoverButtonProps } from "./type"
import { useInformationPopoverButtonHook } from "./hook"
import { InformationPopoverButtonColors } from "@/constants/color"
import { InformationPopoverButtonSizes } from "@/constants/size"


export const InformationPopoverButton = (props:TInformationPopoverButtonProps)=>{

    const {
        portalId,
        informationPopOverRef,
        handleInformationPopoverButtonOnLayout,
        handleInformationPopOverButtonOnPress
    } = useInformationPopoverButtonHook({});

    return(
        <Animated.View
            onLayout={handleInformationPopoverButtonOnLayout}
        >
            <IconButton
                icon={InformationPopOverButtonIcon.question}
                iconColor={InformationPopoverButtonColors.IconButton.iconColor}
                buttonSize={InformationPopoverButtonSizes.IconButton.buttonSize}
                buttonOpacityColor={InformationPopoverButtonColors.IconButton.buttonOpacityColor}
                handleOnPress={handleInformationPopOverButtonOnPress}
            />
            <Portal
                id={`informationPopOver-${portalId}`}
            >
                <InformationPopOver
                    ref={informationPopOverRef}
                    informationPopOverPosition={props.informationPopOverPosition}
                >
                    {props.children}
                </InformationPopOver>
            </Portal>
        </Animated.View>
    )
}