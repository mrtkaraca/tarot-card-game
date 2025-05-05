import { TTextButtonProps } from "@/components/TextButton/type"
import React from "react"

export type TAlertModalProviderProps = {
    children:React.ReactNode
}

export type TAlertModalContextProps = {
    alertModalProps:{
        isAlertModalVisible:boolean,
        alertModalTitle:string,
        alertModalDescription:string,
        leftButton:TTextButtonProps,
        rightButton:TTextButtonProps
    } | null
    setAlertModalProps:React.Dispatch<React.SetStateAction<TAlertModalContextProps['alertModalProps']>>
}