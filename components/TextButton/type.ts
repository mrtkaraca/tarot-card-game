import { TextProps } from "react-native";

export type TTextButtonProps = {
    textButtonTextLabel?:string
    textButtonColor?:string
    textButtonOpacityColor?:string
    textButtonBorderRadius?:number
    handleOnPress?:()=>void;
} & TextProps

export type TTextButtonHookProps = {
    isButtonDisabled:boolean | undefined,
} & Pick<TTextButtonProps,
    'handleOnPress'
>