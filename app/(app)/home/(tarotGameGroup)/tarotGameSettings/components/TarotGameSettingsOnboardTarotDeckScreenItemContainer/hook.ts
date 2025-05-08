import { PixelRatio } from "react-native"
import { useDerivedValue } from "react-native-reanimated"

import { imageSizeViewports } from "./helper"
import { TTarotGameSettingsOnboardScreenItemContainerHookProps } from "./type"

export const useTarotGameSettingsOnboardScreenItemContainerHook = (props:TTarotGameSettingsOnboardScreenItemContainerHookProps)=>{

    const {
        onboardScreenDimensions,
        screenName
    } = props

    const itemGap = Math.floor(4/PixelRatio.get())

    const numberOfColumns = useDerivedValue(()=>{
        return (onboardScreenDimensions.value.heigth && onboardScreenDimensions.value.width) ?
            onboardScreenDimensions.value.heigth > onboardScreenDimensions.value.width ? 
                3
                : 
                5
            : 
            3
    })

    const itemSize = useDerivedValue(()=>{
        return (onboardScreenDimensions.value.heigth && onboardScreenDimensions.value.width) ? 
            ((onboardScreenDimensions.value.width/numberOfColumns.value) - (itemGap*(numberOfColumns.value-1))/numberOfColumns.value)
            :
            0
    })


    const itemImageViewportSizes = imageSizeViewports[screenName]


    return{
        numberOfColumns,
        itemGap,
        itemSize,
        itemImageViewportSizes,
    }
}
