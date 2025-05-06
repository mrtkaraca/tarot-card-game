import {
    useCallback,
    useImperativeHandle, 
    useState
} from "react";
import { 
    LayoutChangeEvent,
    LayoutRectangle,
    PixelRatio, 
} from "react-native";
import { 
    useSharedValue, 
    useAnimatedStyle, 
    runOnUI, 
    runOnJS, 
    withTiming, 
    StyleProps,
    MeasuredDimensions,
    useAnimatedReaction,
} from "react-native-reanimated";
import {
    vec 
} from "@shopify/react-native-skia";

import { workletClamp } from "@/components/helper";

import { useDimensionSize } from "@/constants/hook";

import { informationPopOverPositionStyles } from "./helper";
import { 
    TInformationPopOverHookProps,
    TInformationPopOverRefProps, 
} from "./type";


export const useInformationPopOverHook = (props:TInformationPopOverHookProps,ref:React.ForwardedRef<TInformationPopOverRefProps>)=>{

    const { dimension } = useDimensionSize();

    const [isInformationPopOverVisible,setIsInformationPopOverVisible] = useState<boolean>(false)

    const staticArrowDimensions = {
        width:100/PixelRatio.get(),
        height:200/PixelRatio.get()
    }

    const animationDuration = 250

    const informationPopOverPosition = useSharedValue<Exclude<TInformationPopOverHookProps['informationPopOverPosition'],'AUTO'> | null>(null)
    const informationPopOverTriggeredComponentMeasure = useSharedValue<MeasuredDimensions | null>(null)
    const informationPopOverContainerMeasure = useSharedValue<LayoutRectangle | null>(null)
    const informationPopOverOpeningMode = useSharedValue<'orientation' | 'click' | null>(null)


    const informationPopOverContainerOpacity = useSharedValue(0);
    const informationPopOverContainerScale = useSharedValue(0);
    const informationPopOverContainerTransformOrigin = useSharedValue<StyleProps['transformOrigin']>(undefined)
    const informationPopOverContainerTranslateX = useSharedValue(0);
    const informationPopOverContainerTranslateY = useSharedValue(0);

    
    const arrowDimensions = useSharedValue({
        width:0,
        height:0
    })
    const arrowVertices = useSharedValue([
        vec(0,0),vec(0,0),vec(0,0)
    ])
    const arrowVerticesBorderLines = useSharedValue([
        vec(0,0),vec(0,0,),vec(0,0),vec(0,0)
    ])
    const arrowContainerTranslateX = useSharedValue(0)
    const arrowContainerTranslateY = useSharedValue(0)

    const containerAnimStyle = useAnimatedStyle(()=>{
        return{
            ...(informationPopOverPosition.value && informationPopOverPositionStyles[informationPopOverPosition.value].mainContainer),
            opacity:informationPopOverContainerOpacity.value,
            transformOrigin:informationPopOverContainerTransformOrigin.value,
            transform:[
                {translateX:informationPopOverContainerTranslateX.value},
                {translateY:informationPopOverContainerTranslateY.value},
                {scale:informationPopOverContainerScale.value}
            ]
        }
    })

    const arrowContainerAnimStyle = useAnimatedStyle(()=>{
        return {
            ...(informationPopOverPosition.value && informationPopOverPositionStyles[informationPopOverPosition.value].arrowContainer),
            width:arrowDimensions.value.width,
            height:arrowDimensions.value.height,
            transform:[
                {translateX:arrowContainerTranslateX.value},
                {translateY:arrowContainerTranslateY.value}
            ]
        } 
    })

    const descriptionContainerAnimStyle = useAnimatedStyle(()=>{
        return {
            ...(informationPopOverPosition.value && informationPopOverPositionStyles[informationPopOverPosition.value].descriptionContainer),
            maxWidth:dimension.value.width/2,
            maxHeight:dimension.value.height/2
        }
    })
   

    const handleInformationPopOverContainerBottomTransform = ()=>{
        'worklet';
        if(informationPopOverTriggeredComponentMeasure.value && informationPopOverContainerMeasure.value){
            informationPopOverContainerTranslateX.value = (
                informationPopOverTriggeredComponentMeasure.value.pageX 
            ) -
            (
                informationPopOverContainerMeasure.value.width/2 - 
                informationPopOverTriggeredComponentMeasure.value.width/2
            );

            const centerOfTriggeredComponentX = informationPopOverTriggeredComponentMeasure.value.pageX + informationPopOverTriggeredComponentMeasure.value.width/2
            const centerOfScreenX = dimension.value.width/2
    
            if(centerOfScreenX > centerOfTriggeredComponentX){
                if(0 > informationPopOverContainerTranslateX.value){
                    informationPopOverContainerTranslateX.value = 0
                }
            }
            else{
                const informationPopOverContainerRightCornerPageX = informationPopOverContainerTranslateX.value + informationPopOverContainerMeasure.value.width
                if(dimension.value.width < informationPopOverContainerRightCornerPageX){
                    informationPopOverContainerTranslateX.value -= informationPopOverContainerRightCornerPageX - dimension.value.width
                }
            }
    
            informationPopOverContainerTranslateY.value = informationPopOverTriggeredComponentMeasure.value.pageY + informationPopOverTriggeredComponentMeasure.value.height
        }
        
    }
    const handleInformationPopOverContainerTopTransform = ()=>{
        'worklet';
        if(informationPopOverTriggeredComponentMeasure.value && informationPopOverContainerMeasure.value){

            informationPopOverContainerTranslateX.value = (
                informationPopOverTriggeredComponentMeasure.value.pageX
            ) - 
            (
                informationPopOverContainerMeasure.value.width/2 - 
                informationPopOverTriggeredComponentMeasure.value.width/2
            );

            const centerOfTriggeredComponentX = informationPopOverTriggeredComponentMeasure.value.pageX + informationPopOverTriggeredComponentMeasure.value.width/2
            const centerOfScreenX = dimension.value.width/2

            if(centerOfScreenX > centerOfTriggeredComponentX){
                if(0 > informationPopOverContainerTranslateX.value){
                    informationPopOverContainerTranslateX.value = 0
                }
            }
            else{
                const informationPopOverContainerRightCornerPageX = informationPopOverContainerTranslateX.value + informationPopOverContainerMeasure.value.width
                if(dimension.value.width < informationPopOverContainerRightCornerPageX){
                    informationPopOverContainerTranslateX.value -= informationPopOverContainerRightCornerPageX - dimension.value.width
                }
            }
    
            informationPopOverContainerTranslateY.value = informationPopOverTriggeredComponentMeasure.value.pageY - informationPopOverContainerMeasure.value.height
        }
        
    }
    const handleInformationPopOverContainerLeftTransform = ()=>{
        'worklet';
        if(informationPopOverTriggeredComponentMeasure.value && informationPopOverContainerMeasure.value){

            informationPopOverContainerTranslateY.value = (
                informationPopOverTriggeredComponentMeasure.value.pageY
            ) - 
            (
                informationPopOverContainerMeasure.value.height/2 - 
                informationPopOverTriggeredComponentMeasure.value.height/2
            );
            
            const centerOfTriggeredComponentY = informationPopOverTriggeredComponentMeasure.value.pageY + informationPopOverTriggeredComponentMeasure.value.height/2
            const centerOfScreenY = dimension.value.height/2
    
            if(centerOfScreenY > centerOfTriggeredComponentY){
                if(0 > informationPopOverContainerTranslateY.value){
                    informationPopOverContainerTranslateY.value = 0
                }
            }
            else{
                const informationPopOverContainerBottomCornerPageY = informationPopOverContainerTranslateY.value + informationPopOverContainerMeasure.value.height
                if(dimension.value.height < informationPopOverContainerBottomCornerPageY){
                    informationPopOverContainerTranslateY.value -= informationPopOverContainerBottomCornerPageY - dimension.value.height
                }
            }
    
            informationPopOverContainerTranslateX.value = informationPopOverTriggeredComponentMeasure.value.pageX - informationPopOverContainerMeasure.value.width
        }
    }
    const handleInformationPopOverContainerRightTransform = ()=>{
        'worklet';
        if(informationPopOverTriggeredComponentMeasure.value && informationPopOverContainerMeasure.value){
            informationPopOverContainerTranslateY.value = (
                informationPopOverTriggeredComponentMeasure.value.pageY
            ) - 
            (
                informationPopOverContainerMeasure.value.height/2 - 
                informationPopOverTriggeredComponentMeasure.value.height/2
            );
            
            const centerOfTriggeredComponentY = informationPopOverTriggeredComponentMeasure.value.pageY + informationPopOverTriggeredComponentMeasure.value.height/2
            const centerOfScreenY = dimension.value.height/2
    
            if(centerOfScreenY > centerOfTriggeredComponentY){
                if(0 > informationPopOverContainerTranslateY.value){
                    informationPopOverContainerTranslateY.value = 0
                }
            }
            else{
                const informationPopOverContainerBottomCornerPageY = informationPopOverContainerTranslateY.value + informationPopOverContainerMeasure.value.height
                if(dimension.value.height < informationPopOverContainerBottomCornerPageY){
                    informationPopOverContainerTranslateY.value -= informationPopOverContainerBottomCornerPageY - dimension.value.height
                }
            }
    
            informationPopOverContainerTranslateX.value = informationPopOverTriggeredComponentMeasure.value.pageX + informationPopOverTriggeredComponentMeasure.value.width
        }
    }

    const handleInformationPopOverContainerBottomTransformOrigin = ()=>{
        'worklet';
        informationPopOverContainerTransformOrigin.value = [
            arrowContainerTranslateX.value + arrowDimensions.value.width/2,
            0,
            0
        ]
    }
    const handleInformationPopOverContainerTopTransformOrigin = ()=>{
        'worklet';
        informationPopOverContainerTransformOrigin.value = [
            arrowContainerTranslateX.value + arrowDimensions.value.width/2,
            '100%',
            0
        ]  
    }
    const handleInformationPopOverContainerRightTransformOrigin = ()=>{
        'worklet';
        informationPopOverContainerTransformOrigin.value = [
            0,
            arrowContainerTranslateY.value + arrowDimensions.value.height/2,
            0
        ]
    }
    const handleInformationPopOverContainerLeftTransformOrigin = ()=>{
        'worklet';    
        informationPopOverContainerTransformOrigin.value = [
            '100%',
            arrowContainerTranslateY.value + arrowDimensions.value.height/2,
            0
        ]
    }

    const handleInformationPopOverArrowContainerHorizontalTransform = ()=>{
        'worklet';
        if(informationPopOverTriggeredComponentMeasure.value){
            arrowContainerTranslateY.value = 0
            arrowContainerTranslateX.value = (
                informationPopOverTriggeredComponentMeasure.value.pageX - 
                informationPopOverContainerTranslateX.value
            ) + 
            (
                informationPopOverTriggeredComponentMeasure.value.width/2 -
                arrowDimensions.value.width/2
            )
        }
    }
    const handleInformationPopOverArrowContainerVerticalTransform = ()=>{
        'worklet';
        if(informationPopOverTriggeredComponentMeasure.value){
            arrowContainerTranslateX.value = 0
            arrowContainerTranslateY.value= (
                informationPopOverTriggeredComponentMeasure.value.pageY - 
                informationPopOverContainerTranslateY.value
            ) + 
            (
                informationPopOverTriggeredComponentMeasure.value.height/2 - 
                arrowDimensions.value.height/2
            )
        }
    }

    const handleHorizontalArrowDimensions = ()=>{
        'worklet';
        if(informationPopOverTriggeredComponentMeasure.value){
            arrowDimensions.value = {
                width:workletClamp(staticArrowDimensions.width,0,informationPopOverTriggeredComponentMeasure.value.width/2),
                height:workletClamp(staticArrowDimensions.height,0,informationPopOverTriggeredComponentMeasure.value.height/2)
            }
        }
    }
    const handleVerticalArrowDimensions = ()=>{
        'worklet';
        if(informationPopOverTriggeredComponentMeasure.value){
            arrowDimensions.value = {
                width:workletClamp(staticArrowDimensions.height,0,informationPopOverTriggeredComponentMeasure.value.height/2),
                height:workletClamp(staticArrowDimensions.width,0,informationPopOverTriggeredComponentMeasure.value.width/2)
            }
        }
    }

    const handleInformationPopOverBottomTransformArrowShape = ()=>{
        'worklet';
        arrowVertices.value = [vec(arrowDimensions.value.width/2, 0), vec(arrowDimensions.value.width, arrowDimensions.value.height), vec(0, arrowDimensions.value.height)]
        arrowVerticesBorderLines.value =[vec(0,arrowDimensions.value.height),vec(arrowDimensions.value.width/2,0),vec(arrowDimensions.value.width/2,0),vec(arrowDimensions.value.width,arrowDimensions.value.height)]
    }
    const handleInformationPopOverTopTransformArrowShape  = ()=>{
        'worklet';
        arrowVertices.value = [vec(0, 0), vec(arrowDimensions.value.width, 0), vec(arrowDimensions.value.width/2, arrowDimensions.value.height)]
        arrowVerticesBorderLines.value = [vec(0,0),vec(arrowDimensions.value.width/2,arrowDimensions.value.height),vec(arrowDimensions.value.width/2,arrowDimensions.value.height),vec(arrowDimensions.value.width,0)]
    }
    const handleInformationPopOverLeftTransformArrowShape  = ()=>{
        'worklet';
        arrowVertices.value = [vec(0, 0), vec(arrowDimensions.value.width, arrowDimensions.value.height/2), vec(0, arrowDimensions.value.height)]
        arrowVerticesBorderLines.value = [vec(0,0),vec(arrowDimensions.value.width,arrowDimensions.value.height/2),vec(arrowDimensions.value.width,arrowDimensions.value.height/2),vec(0,arrowDimensions.value.height)]
        
    }
    const handleInformationPopOverRightTransformArrowShape  = ()=>{
        'worklet';
        arrowVertices.value = [vec(0, arrowDimensions.value.height/2), vec(arrowDimensions.value.width, 0), vec(arrowDimensions.value.width, arrowDimensions.value.height)]
        arrowVerticesBorderLines.value = [vec(arrowDimensions.value.width,0),vec(0,arrowDimensions.value.height/2),vec(0,arrowDimensions.value.height/2),vec(arrowDimensions.value.width,arrowDimensions.value.height)]
    }

    const handleInformationPopOverPosition = ()=>{
        'worklet';
        if(informationPopOverTriggeredComponentMeasure.value){
            if(props.informationPopOverPosition === 'AUTO' || props.informationPopOverPosition === undefined){
                if(dimension.value.height > dimension.value.width){
                    const centerOfTriggeredComponentY = informationPopOverTriggeredComponentMeasure.value.pageY + informationPopOverTriggeredComponentMeasure.value.height/2
                    const centerOfScreenY = dimension.value.height/2
    
                    if(centerOfScreenY > centerOfTriggeredComponentY){
                        informationPopOverPosition.value = 'BOTTOM'
                    }
                    else{
                       informationPopOverPosition.value = 'TOP'
                    }
                }
                else{
                    const centerOfTriggeredComponentX = informationPopOverTriggeredComponentMeasure.value.pageX + informationPopOverTriggeredComponentMeasure.value.width/2
                    const centerOfScreenX = dimension.value.width/2
    
                    if(centerOfScreenX > centerOfTriggeredComponentX){
                        informationPopOverPosition.value = 'RIGHT'
                    }
                    else{
                        informationPopOverPosition.value = 'LEFT'
                    }
                }
            }
            else{
                informationPopOverPosition.value = props.informationPopOverPosition
            }
        }
    }
    const handleInformationPopOverArrowShape = ()=>{
        'worklet';
        if(informationPopOverPosition.value === 'BOTTOM'){
            handleHorizontalArrowDimensions();
            handleInformationPopOverBottomTransformArrowShape();
        }
        if(informationPopOverPosition.value === 'TOP'){
            handleHorizontalArrowDimensions();
            handleInformationPopOverTopTransformArrowShape();
        }
        if(informationPopOverPosition.value === 'RIGHT'){
            handleVerticalArrowDimensions();
            handleInformationPopOverRightTransformArrowShape();
        }
        if(informationPopOverPosition.value === 'LEFT'){
            handleVerticalArrowDimensions();
            handleInformationPopOverLeftTransformArrowShape();
        }
    }
    const handleInformationPopOverTransforms = ()=>{
        'worklet';
        if(informationPopOverPosition.value === 'BOTTOM'){
            handleInformationPopOverContainerBottomTransform()
            handleInformationPopOverArrowContainerHorizontalTransform()
            handleInformationPopOverContainerBottomTransformOrigin();
        }
        if(informationPopOverPosition.value === 'TOP'){
            handleInformationPopOverContainerTopTransform()
            handleInformationPopOverArrowContainerHorizontalTransform()
            handleInformationPopOverContainerTopTransformOrigin();
        }
        if(informationPopOverPosition.value === 'RIGHT'){
            handleInformationPopOverContainerRightTransform()
            handleInformationPopOverArrowContainerVerticalTransform()
            handleInformationPopOverContainerRightTransformOrigin();
        }
        if(informationPopOverPosition.value === 'LEFT'){
            handleInformationPopOverContainerLeftTransform()
            handleInformationPopOverArrowContainerVerticalTransform()
            handleInformationPopOverContainerLeftTransformOrigin();
        }
    }

    const handleOnLayout = useCallback((e:LayoutChangeEvent)=>{
        informationPopOverContainerMeasure.value = e.nativeEvent.layout
    },[])

    const handleSetInformationPopOverVisible:TInformationPopOverRefProps['handleSetInformationPopOverVisible'] = useCallback((measure)=>{
        runOnUI(()=>{
            informationPopOverTriggeredComponentMeasure.value = measure
            informationPopOverContainerOpacity.value = 0
            informationPopOverContainerScale.value = 0
            informationPopOverOpeningMode.value = 'click'
            runOnJS(setIsInformationPopOverVisible)(true)
        })()
    },[props])
    const handleSetInformationPopOverInvisible = useCallback(()=>{
        informationPopOverContainerScale.value = withTiming(
            0,
            {duration:animationDuration},
            ()=>{
                runOnJS(setIsInformationPopOverVisible)(false)
            }
        );     
    },[])
    const handleSetInformationPopOverOrientationChange:TInformationPopOverRefProps['handleSetInformationPopOverOrientationChange'] = useCallback((measure)=>{
        if(isInformationPopOverVisible){
            runOnUI(()=>{
                informationPopOverOpeningMode.value = 'orientation'
                informationPopOverTriggeredComponentMeasure.value = measure
            })()
        }
    },[isInformationPopOverVisible])

    const handlePopOverClickAnimation = ()=>{
        'worklet';
        handleInformationPopOverPosition()
        handleInformationPopOverArrowShape();
        handleInformationPopOverTransforms()

        informationPopOverContainerOpacity.value = 1
        informationPopOverContainerScale.value = withTiming(
            1,
            {duration:animationDuration}
        ) ;
    }
    const handlePopOverOrientationAnimation = ()=>{
        'worklet';
        handleInformationPopOverPosition()
        handleInformationPopOverArrowShape();
        handleInformationPopOverTransforms()
    }
    

    useAnimatedReaction(
        ()=>[informationPopOverTriggeredComponentMeasure.value,informationPopOverContainerMeasure.value],
        ()=>{
            if(isInformationPopOverVisible){
                if(informationPopOverOpeningMode.value === 'click'){
                    handlePopOverClickAnimation()
                }
                if(informationPopOverOpeningMode.value === 'orientation'){
                    handlePopOverOrientationAnimation();
                }
            }
        }
    )


    useImperativeHandle(ref,()=>{
        return{
            handleSetInformationPopOverVisible,
            handleSetInformationPopOverInvisible,
            handleSetInformationPopOverOrientationChange
        }
    })

    return{
        isInformationPopOverVisible,
        arrowVertices,
        arrowVerticesBorderLines,
        containerAnimStyle,
        arrowContainerAnimStyle,
        descriptionContainerAnimStyle,
        handleOnLayout,
        handleSetInformationPopOverInvisible,
    }
}