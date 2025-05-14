import { Fragment } from "react"
import {
    TouchableWithoutFeedback,
    View,
    Text
} from "react-native"

import { TarotGameCardModalCardContainer } from "../TarotGameCardModalCardContainer"

import { TTarotGameCardModal } from "./type"
import { useTarotGameCardModalHook } from "./hook"
import { TarotGameCardModalStyle } from "./style"

export const TarotGameCardModal = (props:TTarotGameCardModal)=>{
    const {

    } = props

    const {
        tarotGameCardModalData,
        handleCloseModal
    } = useTarotGameCardModalHook({
        
    })

    return(
        <Fragment>
            {tarotGameCardModalData.isModalVisible &&
                <View
                    style={TarotGameCardModalStyle.TarotGameCardModalContainer}
                >
                    <TouchableWithoutFeedback onPress={handleCloseModal} >
                        <View
                            style={TarotGameCardModalStyle.TarotGameCardModalInnerContainer}
                        >
                            <TarotGameCardModalCardContainer
                                cardData={tarotGameCardModalData.cardData}
                            />
                            <View style={TarotGameCardModalStyle.TarotGameCardModalTextContainer}>
                                <Text style={TarotGameCardModalStyle.TarotGameCardModalText}>
                                    {tarotGameCardModalData.deckData.name}
                                    {'\n'}
                                    {tarotGameCardModalData.cardData.frontFace.name}
                                </Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            }
        </Fragment>
   
    )
}

export default {
    TarotGameCardModal
}