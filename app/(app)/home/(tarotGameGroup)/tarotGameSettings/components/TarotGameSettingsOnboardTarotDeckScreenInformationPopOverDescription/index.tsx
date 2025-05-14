import { Fragment } from "react"
import { 
    ScrollView, 
    Text 
} from "react-native"

export const TarotGameSettingsOnboardTarotDeckScreenInformationPopOverDescription = ()=>{
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
                    {'Click twice to the image that u show full screen image. \n'}
                </Text>
            </Text>
            <Text>
                {"Slide Image: "}
                <Text>
                    {'Slide image to see next image.'}
                </Text>
            </Text>
        </Fragment>
    )
}

export default {
    TarotGameSettingsOnboardTarotDeckScreenInformationPopOverDescription
}