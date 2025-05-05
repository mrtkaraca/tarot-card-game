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

export default undefined

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
                    style={{
                        top:0,
                        left:0,
                        bottom:0,
                        right:0,
                        position:'absolute',
                        backgroundColor:'#000000cc',
                        justifyContent:'center'
                    }}
                >
                    <TouchableWithoutFeedback onPress={handleCloseModal} >
                        <View
                            style={{
                                flex:1,
                                justifyContent:'center',
                                alignItems:'center'
                            }}
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