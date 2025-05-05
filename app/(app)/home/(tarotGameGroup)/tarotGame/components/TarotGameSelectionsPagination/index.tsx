import { 
    forwardRef, 
    Fragment 
} from "react"
import { View } from "react-native"
import Animated from "react-native-reanimated"

import { TarotGameSelectionContainer } from "../TarotGameSelectionContainer"

import { 
    TTarotGameSelectionsPaginationProps, 
    TTarotGameSelectionsPaginationRefProps 
} from "./type"
import { useTarotGameSelectionsPaginationHook } from "./hook"


export default {}

export const TarotGameSelectionsPagination= forwardRef<TTarotGameSelectionsPaginationRefProps,TTarotGameSelectionsPaginationProps>((props,ref)=>{

    const {
        selectionsPaginationData,
        tarotGameSelectionPaginationCurrentIndex,
        tarotGameSelectionsPaginationDataIndexLength
    } = props

    const {
        tarotGameSelectionsPaginationContainerAnimatedStyle
    } = useTarotGameSelectionsPaginationHook({
        tarotGameSelectionPaginationCurrentIndex,
        tarotGameSelectionsPaginationDataIndexLength
    },ref)
    

    return(
        <View
            style={[
                {
                    flex:1,
                    flexDirection:'row'
                },
                tarotGameSelectionsPaginationContainerAnimatedStyle
            ]}
        >
            {selectionsPaginationData.map((selectionPaginationData)=>{
                return(
                    <Fragment
                        key={selectionPaginationData.id}
                    >
                        <Animated.View
                            style={[
                                {
                                    width:'100%',
                                    height:'100%'
                                },
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
})