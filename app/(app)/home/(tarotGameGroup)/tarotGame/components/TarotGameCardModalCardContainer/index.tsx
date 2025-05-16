import { Fragment } from "react"
import {
    TouchableWithoutFeedback,
    View,
    Text
} from "react-native"
import { TTarotGameCardModalCardContainerProps } from "./type"
import { useTarotGameCardModalCardContainerHook } from "./hook"
import { GestureDetector } from "react-native-gesture-handler"
import { TarotGameCardModalCard } from "../TarotGameCardModalCard"


export const TarotGameCardModalCardContainer = (props:TTarotGameCardModalCardContainerProps)=>{
    const {
        cardData
    } = props

    const {
        panGesture,
        rotateX,
        rotateY
    } = useTarotGameCardModalCardContainerHook({
        
    })

    return(
        <GestureDetector
            gesture={panGesture}
        >
            <View
                onStartShouldSetResponder={()=>true}
                style={{flex:0.75,aspectRatio:600/1000,justifyContent:'center',alignItems:'center'}}
            >
                <TarotGameCardModalCard
                    isFrontFace={true}
                    data={cardData.frontFace}
                    rotateX={rotateX}
                    rotateY={rotateY}
                />
                <TarotGameCardModalCard
                    isFrontFace={false}
                    data={cardData.backFace}
                    rotateX={rotateX}
                    rotateY={rotateY}
                />
            </View>
        </GestureDetector>
    )
}

export default {
    TarotGameCardModalCardContainer
}