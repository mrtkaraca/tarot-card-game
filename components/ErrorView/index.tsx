import { Fragment } from "react"
import { 
    View,
    Text 
} from "react-native"

import { TextButton } from "@/components/TextButton"

import { TErrorViewProps } from "./type"
import { ErrorViewStyle } from "./style"



export const ErrorView = (props:TErrorViewProps)=>{


    const {
        isVisible,
        isButtonVisible,
        errorData,
        textButtonProps
    } = props


    return(
        <Fragment>
            {isVisible && (
                <View 
                    style={ErrorViewStyle.ErrorViewContainer} 
                >
                    <View
                        style={ErrorViewStyle.ErrorViewTitleContainer}
                    >
                        <Text 
                            numberOfLines={1} 
                            style={ErrorViewStyle.ErrorViewTitle}
                        >
                            {errorData?.errorTitleMessage}
                            <Text
                                style={ErrorViewStyle.ErrorViewCode}
                            >
                                {errorData?.errorCode && `(${errorData?.errorCode})`}
                            </Text>
                        </Text>
                    </View>
                    <View
                        style={ErrorViewStyle.ErrorViewDescriptionContainer}
                    >
                        <Text 
                            adjustsFontSizeToFit
                            style={ErrorViewStyle.ErrorViewDescription} 
                        >
                            {errorData?.errorDescriptionMessage}
                        </Text>
                    </View>
                    {(isButtonVisible || isButtonVisible === undefined) &&
                        <View style={ErrorViewStyle.ErrorViewButtonContainer}>
                            <TextButton
                                {...textButtonProps}
                            />
                        </View>
                    }
                </View>
            )}
        </Fragment>
    )
}
