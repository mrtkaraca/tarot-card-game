import { PixelRatio } from "react-native"
import Animated from "react-native-reanimated"

import { Portal } from "components/Portal"
import { IconButton } from "components/IconButton"
import { InformationPopOver } from "components/InformationPopOver"

import { InformationPopOverButtonIcon } from "constants/icon"

import { TInformationPopoverButtonProps } from "./type"
import { useInformationPopoverButtonHook } from "./hook"


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
                iconColor="black"
                buttonSize={48/PixelRatio.get()}
                buttonOpacityColor="#d3d3d3"
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