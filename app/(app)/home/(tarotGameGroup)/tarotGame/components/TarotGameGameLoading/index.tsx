import { 
    View,
    Text,
    ActivityIndicator
} from "react-native"
import Animated from "react-native-reanimated"

import { TarotGameSizes } from "@/constants/size"

import { TTarotGameGameLoadingProps } from "./type"
import { useTarotGameGameLoadingHook } from "./hook"
import { TarotGameGameLoadingStyle } from "./style"

export const TarotGameGameLoading = (props:TTarotGameGameLoadingProps)=>{

    const {
        isDeckReady
    } = props

    const {
        preparingText,
        tarotGameGameLoadingAnimatedStyle
    } = useTarotGameGameLoadingHook({
        isDeckReady
    })


    return (
         <Animated.View 
            style={[
                TarotGameGameLoadingStyle.TarotGameGameLoadingContainer,
                tarotGameGameLoadingAnimatedStyle
            ]}
        >
            <View
                style={TarotGameGameLoadingStyle.TarotGameGameLoadingInnerContainer}
            >
                <Text 
                    style={TarotGameGameLoadingStyle.TarotGameGameLoadingText}
                >
                    {preparingText}
                    {' '}
                    <ActivityIndicator
                        size={TarotGameSizes.TarotGameGameLoading.activityIndicator}
                    />
                </Text>
            </View>
        </Animated.View> 
    )
}

export default {
    TarotGameGameLoading
}