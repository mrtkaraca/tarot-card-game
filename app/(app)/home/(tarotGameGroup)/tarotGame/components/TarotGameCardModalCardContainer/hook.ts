import { useSharedValue } from "react-native-reanimated";
import { Gesture } from "react-native-gesture-handler";

import { TTarotGameCardModalCardContainerHookProps } from "./type"
import { tarotGameCardModalCardSizes } from "./helper";

export const useTarotGameCardModalCardContainerHook = (props:TTarotGameCardModalCardContainerHookProps)=>{

    const imageAspectRatio = tarotGameCardModalCardSizes.width/tarotGameCardModalCardSizes.height
    
    const startRotateX = useSharedValue(0);
    const startRotateY = useSharedValue(0);
    const rotateX = useSharedValue(0);
    const rotateY = useSharedValue(0);

    const panGesture = Gesture.Pan()
    .onStart(() => {
        startRotateX.value = rotateX.value
        startRotateY.value = rotateY.value
    })
    .onChange((event)=>{
        rotateX.value = event.changeY
        rotateY.value = event.changeX
    })

    return{
        imageAspectRatio,
        panGesture,
        rotateX,
        rotateY
    }
}

export default {
    useTarotGameCardModalCardContainerHook
}