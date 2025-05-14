import { Fragment } from "react"
import { Text } from "react-native"

export const TarotGameSettingsOnboardDefaultScreenInformationPopOverDescription = ()=>{
    return(
        <Fragment>
            <Text>
                {"One Tap: "}
                <Text>
                    {'Click once to the image that u wanna select it. \n'}
                </Text>
            </Text>
            <Text>
                {"Dobule Tap: "}
                <Text>
                    {'Click twice to the image that u show full screen image.'}
                </Text>
            </Text>
        </Fragment>
    )
}

export default {
    TarotGameSettingsOnboardDefaultScreenInformationPopOverDescription
}