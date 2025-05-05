import { 
    useCallback, 
    useEffect 
} from "react";
import { 
    BackHandler, 
    LayoutChangeEvent, 
    PixelRatio 
} from "react-native";
import {
    useAnimatedStyle, 
    useSharedValue 
} from "react-native-reanimated";

import { useAlertModalContext } from "@/contexts/alertModal"

import { TTextButtonProps } from "@/components/TextButton/type";

export const useAlertModalHook = ()=>{
    const {
        alertModalProps,
        setAlertModalProps
    } = useAlertModalContext();

    const alertModalViewDimensions = useSharedValue<{
        width:number,
        height:number,
    } | null>(null)

    const enteringDuration = 250;
    const existingDuration = 250;

    const {
        leftButton,
        rightButton,
        ...restAlertModalProps
    } = {...alertModalProps}

    const {style:rightButtonStyle, ...restLeftButtonProps} = {...leftButton}
    const {style:leftButtonStyle, ...restRightButtonProps} = {...rightButton}

    const textButtonDefaultProps:TTextButtonProps = {
        textButtonOpacityColor:'grey',
        style:{
            color:'blue',
            fontSize:28/PixelRatio.get(),
            paddingHorizontal:24/PixelRatio.get(),
            paddingVertical:16/PixelRatio.get()
        }
    }

    const alertModalViewAnimStyle = useAnimatedStyle(()=>({
        borderRadius:alertModalViewDimensions.value ? alertModalViewDimensions.value.height/20 : undefined
    }))

    const handleTouchOutsideView = useCallback(()=>{
        setAlertModalProps(null)
    },[])

    const handleAlertModalViewOnLayout =useCallback((e:LayoutChangeEvent)=>{
        alertModalViewDimensions.value = {
            height:e.nativeEvent.layout.height,
            width:e.nativeEvent.layout.width
        }
    },[])

    useEffect(()=>{
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            ()=>{
                if(alertModalProps?.isAlertModalVisible){
                    setAlertModalProps(null);
                    return true
                }
                return false
            },
        );
    
        return () => {
            backHandler.remove()
        };
    
    },[alertModalProps?.isAlertModalVisible])


    return {
        restAlertModalProps,
        leftButtonStyle,
        rightButtonStyle,
        restLeftButtonProps,
        restRightButtonProps,
        textButtonDefaultProps,
        enteringDuration,
        existingDuration,
        alertModalViewAnimStyle,
        handleTouchOutsideView,
        handleAlertModalViewOnLayout
    }
}