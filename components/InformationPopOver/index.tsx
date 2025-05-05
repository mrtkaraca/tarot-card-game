import { forwardRef, Fragment } from "react"
import { 
    PixelRatio, 
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
    TInformationPopOverProps, 
    TInformationPopOverRefProps 
} from "./type"
import { InformationPopOverStyle } from "./style"


export const InformationPopOver = forwardRef<TInformationPopOverRefProps,TInformationPopOverProps>((props,ref)=>{
    const {
        isInformationPopOverVisible,
        arrowVertices,
        arrowVerticesBorderLines,
        containerAnimStyle,
        arrowContainerAnimStyle,
        descriptionContainerAnimStyle,
        handleOnLayout,
        handleSetInformationPopOverInvisible,
    } = useInformationPopOverHook(props,ref);


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
                            onLayout={handleOnLayout}
                            onStartShouldSetResponder={()=>true}
                            pointerEvents={'box-none'}
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
                                    descriptionContainerAnimStyle
                                ]}
                            >
                                {props.children}
                            </Animated.View>
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback>
            }
        </Fragment>
    )
}) 