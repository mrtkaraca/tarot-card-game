import { 
    Fragment, 
    Suspense 
} from "react";
import { View } from "react-native";

import { TarotGameSettingsBackground } from "./components/TarotGameSettingsBackground";
import { TarotGameSettingsHeader } from "./components/TarotGameSettingsHeader";
import { TarotGameSettingsOnboardScreensContainer } from "./components/TarotGameSettingsOnboardScreensContainer";
import { TarotGameSettingsScreensItemModalContainer } from "./components/TarotGameSettingsScreensItemModalContainer";

import { useTarotGameSettingsHook } from "./hook";


const TarotGameSettingsOnboardScreens = ()=>{

    const {
        onboardScreensPagination
    } = useTarotGameSettingsHook();


    return(
        <Fragment>
            <TarotGameSettingsBackground>
                <TarotGameSettingsHeader
                    textLabel="Game Options"
                    onboardScreensPagination={onboardScreensPagination}
                />
                <TarotGameSettingsOnboardScreensContainer
                    onboardScreensPagination={onboardScreensPagination}
                />
            </TarotGameSettingsBackground>
            <TarotGameSettingsScreensItemModalContainer/>
        </Fragment>
    )
}

export default TarotGameSettingsOnboardScreens