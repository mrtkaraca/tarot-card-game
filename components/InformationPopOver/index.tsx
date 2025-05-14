import { forwardRef, Fragment } from "react"
import { 
    PixelRatio, 
    ScrollView, 
    TouchableWithoutFeedback, 
    View 
} from "react-native"
import { 
    Canvas, 
    Points, 
    Vertices 
} from "@shopify/react-native-skia"
import Animated from "react-native-reanimated"

import { useInformationPopOverHook } from "./hook"
import { 
    TInformationPopOverProps
} from "./type"
import { InformationPopOverStyle } from "./style"


export const InformationPopOver = (props:TInformationPopOverProps)=>{

    const {
        ref,
        children,
        informationPopOverPosition
    } = props

    const {
        isInformationPopOverVisible,
        arrowVertices,
        arrowVerticesBorderLines,
        containerAnimStyle,
        arrowContainerAnimStyle,
        descriptionContainerAnimStyle,
        handleOnLayout,
        handleSetInformationPopOverInvisible,
    } = useInformationPopOverHook({
        ref,
        informationPopOverPosition
    });


    return(
        <Fragment>
            {(isInformationPopOverVisible) &&
                <TouchableWithoutFeedback 
                    onPress={handleSetInformationPopOverInvisible}
                >
                    <View 
                        style={InformationPopOverStyle.InformationPopOverContainer}
                    >
                        <Animated.View
                            onStartShouldSetResponder={()=>true}
                            pointerEvents={'box-none'}
                            onLayout={handleOnLayout}
                            style={[
                                InformationPopOverStyle.InformationPopOverInnerContainer,
                                containerAnimStyle
                            ]}
                        >
                            <Animated.View
                                style={[
                                    InformationPopOverStyle.InformationPopOverArrowContainer,
                                    arrowContainerAnimStyle
                                ]}
                            >
                                <Canvas
                                    style={InformationPopOverStyle.InformationPopOverArrowCanvasContainer}
                                >
                                    <Vertices 
                                        color={'white'} 
                                        vertices={arrowVertices} 
                                    />
                                    <Points 
                                        color={'#d4d4d4'} 
                                        mode={'lines'} 
                                        strokeWidth={2/PixelRatio.get()} 
                                        points={arrowVerticesBorderLines} 
                                    /> 
                                </Canvas>
                            </Animated.View>
                            <Animated.View
                                style={[
                                    InformationPopOverStyle.InformationPopOverDescriptionContainer,
                                    descriptionContainerAnimStyle,
                                ]}
                            >
                                <ScrollView>
                                    <View
                                        onStartShouldSetResponder={()=>true}
                                    >
                                        {children}
                                    </View>
                                </ScrollView>
                            </Animated.View>
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback>
            }
        </Fragment>
    )
}