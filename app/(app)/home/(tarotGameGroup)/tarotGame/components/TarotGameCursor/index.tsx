import { forwardRef, memo } from "react"
import Animated, { FadeOut } from "react-native-reanimated"
import { Image } from 'expo-image'

import { TTarotGameCursorProps, TTarotGameCursorRefProps } from "./type"
import { useTarotGameCursorHook } from "./hook"
import { TarotGameCursorStyle } from "./style"

export default undefined

export const TarotGameCursor = memo(forwardRef<TTarotGameCursorRefProps,TTarotGameCursorProps>((props,ref)=>{


    const {
        cursorData,
        cursorMeasure,
        cursorDimensions,
        cursorMaximumRight,
        cursorPreviousMaximumRight,
        cursorCenterToDeckBottomSidePage,
        cardsMinimumLeft,
        cardsPreviousMinimumLeft,
        spaceBetweenCards,
        topDeckSelectedCardPage,
        bottomDeckSelectedCardPage,
        bottomDeckFrontFacesIndexLength,
        bottomDeckPreviousFrontFacesIndexLength,
    } = props

    const {
        cursorViewRef,
        cursorAnimatedStyle,
        handleOnLayout
    } = useTarotGameCursorHook({
        cursorMeasure,
        cursorDimensions,
        cursorMaximumRight,
        cursorPreviousMaximumRight,
        cardsMinimumLeft,
        cardsPreviousMinimumLeft,
        spaceBetweenCards,
        cursorCenterToDeckBottomSidePage,
        topDeckSelectedCardPage,
        bottomDeckSelectedCardPage,
        bottomDeckFrontFacesIndexLength,
        bottomDeckPreviousFrontFacesIndexLength
    },ref)


    return(
        <Animated.View
            ref={cursorViewRef}
            exiting={FadeOut.duration(500)}
            onLayout={handleOnLayout}
            style={[
                TarotGameCursorStyle.TarotGameCursorContainer,
                cursorAnimatedStyle
            ]}
        >
            <Image
                source={cursorData.image.url}
                allowDownscaling={false}
                style={TarotGameCursorStyle.TarotGameCursorImage}
                contentFit="cover"
            />
        </Animated.View>
    )
}))