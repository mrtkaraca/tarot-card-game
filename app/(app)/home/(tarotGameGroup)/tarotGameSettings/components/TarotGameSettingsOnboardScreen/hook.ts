import { useDimensionSize } from "@/constants/hook";
import {
    useSharedValue,
    useDerivedValue, 
    interpolate, 
    Extrapolation, 
    useAnimatedStyle, 
    withTiming, 
    useAnimatedReaction 
} from "react-native-reanimated";

import { TTarotGameSettingsOnboardScreenHookProps } from "./type";

export const useTarotGameSettingsOnboardScreenHook = (props:TTarotGameSettingsOnboardScreenHookProps)=>{

    const { dimension } = useDimensionSize();

    const animateTranslateX = useSharedValue(0);
    const displayScreen = useSharedValue<'flex' | 'none'>('none');
    const oapcitySCreen = useSharedValue(0);
    const isAnimationFinished = useSharedValue<boolean>(false)

    const animationDuration = 500

    const currentPaginationScreenTranslateX = useDerivedValue(()=>{
        return interpolate(
            props.index,
            [(props.onboardScreensPagination.value.curr-1),(props.onboardScreensPagination.value.curr),(props.onboardScreensPagination.value.curr+1)],
            [(-dimension.value.width),0,(dimension.value.width)],
            Extrapolation.EXTEND
        )
    })
    const previousPaginationScreenTranslateX = useDerivedValue(()=>{
        return interpolate(
            props.index,
            [(Number(props.onboardScreensPagination.value.pre)-1),(Number(props.onboardScreensPagination.value.pre)),(Number(props.onboardScreensPagination.value.pre)+1)],
            [(-dimension.value.width),0,(dimension.value.width)],
            Extrapolation.EXTEND
        )
    })

    const animateStyle = useAnimatedStyle(()=>(
        {
            height:props.onboardScreenDimensions.value.heigth,
            width:props.onboardScreenDimensions.value.width,
            opacity:oapcitySCreen.value,
            transform:[
                {translateX:animateTranslateX.value},
            ]
        }
    ))

    const handleOutsidePaginationScreen = ()=>{
        'worklet';
        if(props.index !== props.onboardScreensPagination.value.curr && props.index !== props.onboardScreensPagination.value.pre){
            isAnimationFinished.value = false
            displayScreen.value = 'none'
            oapcitySCreen.value = 0;
            animateTranslateX.value = currentPaginationScreenTranslateX.value
        }
    }
    const handleIsAnimationFinished = () =>{
        'worklet';
        if(isAnimationFinished.value){
            isAnimationFinished.value = false;
        }
        else{
            animateTranslateX.value = previousPaginationScreenTranslateX.value
        }
    }
    const handleCurrentPaginationScreen = ()=>{
        'worklet';
        if(props.index === props.onboardScreensPagination.value.curr){
            displayScreen.value = 'flex'
            oapcitySCreen.value = 1;
            animateTranslateX.value = withTiming(
                currentPaginationScreenTranslateX.value,
                {
                    duration:animationDuration
                },
                (finished)=>{
                    if(finished){
                        isAnimationFinished.value = true
                    }
                    else{
                        isAnimationFinished.value = false
                    }
                }
            )
        }
    }
    const handlePreviousPaginationScreen = ()=>{
        'worklet';
        if(props.index === props.onboardScreensPagination.value.pre){
            animateTranslateX.value = withTiming(
                currentPaginationScreenTranslateX.value,
                {
                    duration:animationDuration
                },
                (finished)=>{
                    if(finished){
                        isAnimationFinished.value = true
                        displayScreen.value = 'none';
                        oapcitySCreen.value = 0;
                    }
                    else{
                        isAnimationFinished.value = false
                    }
                }
            )
        }
    }

    useAnimatedReaction(
        ()=>props.onboardScreensPagination.value,
        ()=>{
            handleOutsidePaginationScreen();
            handleIsAnimationFinished();
            handlePreviousPaginationScreen();
            handleCurrentPaginationScreen();
        }
    )

    return {
        animateStyle,
    }
}
