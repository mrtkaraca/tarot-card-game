import { View } from "react-native"

import { IconButton } from "@/components/IconButton"

import { TarotGameIcons } from "@/constants/icon"
import { TarotGameSizes } from "@/constants/size"
import { TarotGameColors } from "@/constants/color"

import { TTarotGameHeaderProps } from "./type"
import { TarotGameHeaderStyle } from "./style"
import { useTarotGameHeaderHook } from "./hook"

export const TarotGameHeader = (props:TTarotGameHeaderProps)=>{


    const {
        handleOnPress
    } = useTarotGameHeaderHook({})

    return (
        <View style={TarotGameHeaderStyle.TarotGameHeaderContainer}>
             <View style={TarotGameHeaderStyle.TarotGameHeaderInnerContainer}>
                <IconButton
                    icon={TarotGameIcons.back}
                    buttonSize={TarotGameSizes.IconButtons.buttonSize}
                    iconColor={TarotGameColors.IconButtons.iconColor}
                    buttonOpacityColor={TarotGameColors.IconButtons.buttonOpacityColor}
                    handleOnPress={handleOnPress}
                />
            </View>
        </View>
    )
}

export default {
    TarotGameHeader
}