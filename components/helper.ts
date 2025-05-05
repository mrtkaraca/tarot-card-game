import { 
    Platform ,
    Keyboard
} from "react-native";

export const handleKeyboardDismiss= ()=>{
    if(Platform.OS !='web'){
        Keyboard.dismiss();
    }
}

export const workletClamp = (val:number, min:number, max:number)=>{
    'worklet';
    return Math.min(Math.max(val, min), max)
}

export const workletDegreeToRadiand = (degree:number)=>{
    'worklet';
    return degree * (Math.PI/180)
}