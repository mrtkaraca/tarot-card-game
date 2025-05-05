import { LayoutRectangle, ViewStyle } from "react-native"
import { MeasuredDimensions } from "react-native-reanimated"


export type TInformationPopOverPositions = 'LEFT' | 'RIGHT' | 'TOP' | 'BOTTOM' | 'AUTO' 

export type TInformationPopOverPositionsStyles = {
    [key in Exclude<TInformationPopOverPositions,'AUTO'>]:{
        mainContainer:ViewStyle,
        arrowContainer:ViewStyle,
        descriptionContainer:ViewStyle
    }
}

export type TInformationPopOverProps = {
    children?:React.ReactNode;
    informationPopOverPosition?:TInformationPopOverPositions,
}

export type TInformationPopOverRefProps = {
    handleSetInformationPopOverVisible:(measure:MeasuredDimensions)=>void;
    handleSetInformationPopOverInvisible:()=>void;
    handleSetInformationPopOverOrientationChange:(measure:MeasuredDimensions)=>void
}

export type TInformationPopOverHookProps = Omit<TInformationPopOverProps,'children'>






