import Animated  from "react-native-reanimated";
import { 
    Canvas,
    DiffRect 
} from "@shopify/react-native-skia";

import { useTarotGameSettingsOnboardTarotDeckScreenItemPaginationIndicatorDotsHook } from "./hook";
import { TarotGameSettingsOnboardTarotDeckScreenItemPaginationIndicatorDotsStyle } from "./style";
import { TTarotGameSettingsOnboardTarotDeckScreenItemPaginationIndicatorDotsProps } from "./type";

export const TarotGameSettingsOnboardTarotDeckScreenItemPaginationIndicatorDots = (props:TTarotGameSettingsOnboardTarotDeckScreenItemPaginationIndicatorDotsProps)=>{

    const {
        innerC,
        outerC,
        animstyle
    } = useTarotGameSettingsOnboardTarotDeckScreenItemPaginationIndicatorDotsHook({
        index:props.index,
        pagingIndicatorSize:props.pagingIndicatorSize,
        currentImageIndex:props.currentImageIndex
    });

 
    return(
        <Animated.View 
            style={[
                animstyle,
                TarotGameSettingsOnboardTarotDeckScreenItemPaginationIndicatorDotsStyle.TarotGameSettingsOnboardTarotDeckScreenItemPaginationIndicatorDotsContainer
            ]}
        >
            <Canvas 
                style={TarotGameSettingsOnboardTarotDeckScreenItemPaginationIndicatorDotsStyle.TarotGameSettingsOnboardTarotDeckScreenItemPaginationIndicatorDotsInnerContainer}
            >                      
                <DiffRect
                    color={TarotGameSettingsOnboardTarotDeckScreenItemPaginationIndicatorDotsStyle.TarotGameSettingsOnboardTarotDeckScreenItemPaginationIndicatorDots.color}
                    inner={innerC}
                    outer={outerC}     
                />     
            </Canvas> 
        </Animated.View>
    )
}

export default {
    TarotGameSettingsOnboardTarotDeckScreenItemPaginationIndicatorDots
}