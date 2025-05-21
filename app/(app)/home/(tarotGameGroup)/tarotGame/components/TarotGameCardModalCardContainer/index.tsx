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
import { TarotGameCardModalCardContainerStyle } from "./style"


export const TarotGameCardModalCardContainer = (props:TTarotGameCardModalCardContainerProps)=>{
    const {
        cardData
    } = props

    const {
        imageAspectRatio,
        panGesture,
        rotateX,
        rotateY
    } = useTarotGameCardModalCardContainerHook({
        
    })
    
    console.log(cardData,'here')

    return(
        <GestureDetector
            gesture={panGesture}
        >
            <View
                onStartShouldSetResponder={()=>true}
                style={[
                    TarotGameCardModalCardContainerStyle.tarotGameCardModalCardContainer,
                    {
                        aspectRatio:imageAspectRatio
                    }
                ]}
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