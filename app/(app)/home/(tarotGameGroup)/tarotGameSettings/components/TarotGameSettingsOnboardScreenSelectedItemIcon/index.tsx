import Animated  from "react-native-reanimated"
import { Image } from "expo-image"

import { TarotGameSettingsIcons } from "@/constants/icon"

import { useTarotGameSettingsOnboardScreenSelectedItemIconHook } from "./hook"
import { TarotGameSettingsOnboardScreenSelectedItemIconStyle } from "./style"
import { TTarotGameSettingsOnboardTarotDeckScreenSelectedItemProps } from "./type"



export const  TarotGameSettingsOnboardScreenSelectedItemIcon = (props:TTarotGameSettingsOnboardTarotDeckScreenSelectedItemProps)=>{

    

    const {
        animStyle,
    } = useTarotGameSettingsOnboardScreenSelectedItemIconHook({
        itemSelectedIconSize:props.itemSelectedIconSize
    })
 
    return(
        <>
            {props.isSelected &&
                <Animated.View 
                    style={[
                        TarotGameSettingsOnboardScreenSelectedItemIconStyle.TarotGameSettingsOnboardScreenSelectedItemIconContainer,
                        animStyle,
                    ]}
                >
                    <Image
                        source={TarotGameSettingsIcons.filledCheckCircle}
                        style={
                            [
                                TarotGameSettingsOnboardScreenSelectedItemIconStyle.TarotGameSettingsOnboardScreenSelectedItemIconImage,
                            ]
                        }
                    />
                </Animated.View>
            }
        </>
    )
}