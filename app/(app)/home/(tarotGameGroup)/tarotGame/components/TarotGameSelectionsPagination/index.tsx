import { 
    forwardRef, 
    Fragment 
} from "react"
import { View } from "react-native"
import Animated from "react-native-reanimated"

import { TarotGameSelectionContainer } from "../TarotGameSelectionContainer"

import { 
    TTarotGameSelectionsPaginationProps
} from "./type"
import { useTarotGameSelectionsPaginationHook } from "./hook"
import { TarotGameSelectionsPaginationStyle } from "./style"


export const TarotGameSelectionsPagination = (props:TTarotGameSelectionsPaginationProps)=>{

    const {
        ref,
        tarotGameSelectionsPaginationData,
        tarotGameSelectionPaginationCurrentIndex,
        tarotGameSelectionsPaginationDataLength
    } = props

    const {
        tarotGameSelectionsPaginationContainerAnimatedStyle
    } = useTarotGameSelectionsPaginationHook({
        ref,
        tarotGameSelectionPaginationCurrentIndex,
        tarotGameSelectionsPaginationDataLength
    })
    

    return(
        <View
            style={[
                TarotGameSelectionsPaginationStyle.TarotGameSelectionsPaginationContainer,
                tarotGameSelectionsPaginationContainerAnimatedStyle
            ]}
        >
            {tarotGameSelectionsPaginationData.map((selectionPaginationData)=>{
                return(
                    <Fragment
                        key={selectionPaginationData.id}
                    >
                        <Animated.View
                            style={[
                                TarotGameSelectionsPaginationStyle.TarotGameSelectionsPaginationAnimationContainer,
                                tarotGameSelectionsPaginationContainerAnimatedStyle
                            ]}
                        > 
                            <TarotGameSelectionContainer
                                selectionPaginationData={selectionPaginationData}
                            />
                        </Animated.View>
                    </Fragment>
                )
            })}
        </View>
    )
}

export default {
    TarotGameSelectionsPagination
}