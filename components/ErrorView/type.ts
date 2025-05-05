import { TErrorApiResponseObject } from "@/api/type"
import { TTextButtonProps } from "@/components/TextButton/type";

export type TErrorViewProps = {
    isVisible?:boolean;
    isButtonVisible?:boolean,
    errorData?:TErrorApiResponseObject
    textButtonProps?:TTextButtonProps
}