import { View } from "react-native";
import { 
    GestureDetector 
} from "react-native-gesture-handler";

import { TarotGameSettingsTarotDeckScreenItemModalItem } from "../TarotGameSettingsTarotDeckScreenItemModalItem";

import { useTarotGameSettingsTarotDeckScreenItemModalItemContainerHook } from "./hook";
import { TarotGameSettingsTarotDeckScreenItemModalItemContainerStyle } from "./style";
import { TTarotGameSettingsTarotDeckScreenItemModalItemContainerProps } from "./type";

export const TarotGameSettingsTarotDeckScreenItemModalItemContainer = (props:TTarotGameSettingsTarotDeckScreenItemModalItemContainerProps)=>{
    const {
        data
    } = props

    const {
        panGesture,
        rotateX,
        rotateY,
    } = useTarotGameSettingsTarotDeckScreenItemModalItemContainerHook();

    return(
        <View 
            style={TarotGameSettingsTarotDeckScreenItemModalItemContainerStyle.TarotGameSettingsTarotDeckScreenItemModalContainer}
        >
            <GestureDetector 
                gesture={panGesture}
            >
                <View style={TarotGameSettingsTarotDeckScreenItemModalItemContainerStyle.TarotGameSettingsTarotDeckScreenItemModalInnerContainer} >
                    <TarotGameSettingsTarotDeckScreenItemModalItem
                        data={data.randomFrontFace}
                        isFrontFace={true}
                        rotateX={rotateX}
                        rotateY={rotateY}
                    />
                    <TarotGameSettingsTarotDeckScreenItemModalItem
                        data={data.backFace}
                        isFrontFace={false}
                        rotateX={rotateX}
                        rotateY={rotateY}
                    />
                </View>
            </GestureDetector>
        </View>

    )
}

export default {
    TarotGameSettingsTarotDeckScreenItemModalItemContainer
}