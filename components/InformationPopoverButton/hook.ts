import { useCallback, useId, useRef } from "react";

import { TInformationPopoverButtonHookProps } from "./type";
import { TIconButtonProps } from "components/IconButton/types";
import { TInformationPopOverRefProps } from "components/InformationPopOver/type";
import { LayoutChangeEvent } from "react-native";

export const useInformationPopoverButtonHook = (props:TInformationPopoverButtonHookProps)=>{

    const portalId = useId();

    const informationPopOverRef = useRef<TInformationPopOverRefProps>(null)

    const handleInformationPopOverButtonOnPress:TIconButtonProps['handleOnPress'] = useCallback((event,measure)=>{
        if(measure){
            informationPopOverRef.current?.handleSetInformationPopOverVisible(measure)
        }
    },[])

    const handleInformationPopoverButtonOnLayout = useCallback((e:LayoutChangeEvent)=>{
        e.target.measure((x,y,w,h,px,py)=>{
            informationPopOverRef.current?.handleSetInformationPopOverOrientationChange({
                x:x,
                y:y,
                width:w,
                height:h,
                pageX:px,
                pageY:py
            })
        })
    },[])

    return{
        portalId,
        informationPopOverRef,
        handleInformationPopoverButtonOnLayout,
        handleInformationPopOverButtonOnPress
    }

}