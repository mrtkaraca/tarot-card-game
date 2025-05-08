import { 
    lazy, 
    Suspense ,
    Fragment
} from "react";
import { 
    View, 
    ActivityIndicator, 
    PixelRatio,
    Text 
} from "react-native";

import { ErrorView } from "@/components/ErrorView";

import { TarotGameSettingsOnboardScreen } from "../TarotGameSettingsOnboardScreen";
import { TarotGameSettingsFooter } from "../TarotGameSettingsFooter";

import { useTarotGameSettingsOnboardScreensContainerHook } from "./hook";
import { TarotGameSettingsOnboardScreensContainerStyle } from "./style";
import { TTarotGameSettingsOnboardScreensContainerProps } from "./type";
import { TarotGameSettingsOnboardTarotDeckScreenItemContainer } from "../TarotGameSettingsOnboardTarotDeckScreenItemContainer";
import {TarotGameSettingsOnboardDefaultScreenItemContainer} from "../TarotGameSettingsOnboardDefaultScreenItemContainer";
import { TarotGameSettingsSize } from "@/constants/size";


export const TarotGameSettingsOnboardScreensContainer = (props:TTarotGameSettingsOnboardScreensContainerProps)=>{

    const {
        onboardScreensPagination
    } = props

    const {
        t,
        isPending,
        onboardScreensData,
        tarotGameSettingsData,
        errorViewData,
        onboardScreenDimensions,
        handleOnboardScreensDimensions,
    } = useTarotGameSettingsOnboardScreensContainerHook();


    if(isPending){
        return(
            <View 
                style={TarotGameSettingsOnboardScreensContainerStyle.TarotGameSettingsOnboardScreensContainerFallbackInnerContainer}
            >
                <ActivityIndicator size={TarotGameSettingsSize.tarotGameSettingsOnboardScreenContainer.activityIndicator} />
            </View>
        )
    }

    if(errorViewData){
        return(
            <Fragment>
                {errorViewData && 
                    <ErrorView
                        {...errorViewData}
                    />
                }
            </Fragment>
        )
    }

    if((tarotGameSettingsData)){
        if(tarotGameSettingsData.tarotBackground && tarotGameSettingsData.tarotCursor && tarotGameSettingsData.tarotDeck){
            return(
                <View
                    style={TarotGameSettingsOnboardScreensContainerStyle.TarotGameSettingsOnboardScreensContainerContainer}
                >
                    <View 
                        onLayout={handleOnboardScreensDimensions} 
                        style={TarotGameSettingsOnboardScreensContainerStyle.TarotGameSettingsOnboardScreensContainerInnerContainer}
                    >
                        {onboardScreensData.map((screen,index)=>{
                            return (
                                <TarotGameSettingsOnboardScreen 
                                    key={index}
                                    index={index}
                                    screenName={screen.name}
                                    screenTitle={screen.screenTitle}
                                    onboardScreenDimensions={onboardScreenDimensions}
                                    onboardScreensPagination={onboardScreensPagination}
                                >   
                                    {screen.name === 'tarotDeck' && 
                                        <TarotGameSettingsOnboardTarotDeckScreenItemContainer
                                            screenName={screen.name}
                                            data={tarotGameSettingsData[screen.name]!}
                                            onboardScreenDimensions={onboardScreenDimensions}
                                        />
                                    }
                                    {(screen.name === 'tarotBackground' || screen.name === 'tarotCursor')  && 
                                        <TarotGameSettingsOnboardDefaultScreenItemContainer
                                            screenName={screen.name}
                                            data={tarotGameSettingsData[screen.name]!}
                                            onboardScreenDimensions={onboardScreenDimensions}
                                        />
                                    }
    
                                </TarotGameSettingsOnboardScreen>
                            )})
                        }
                    </View>
                    <TarotGameSettingsFooter
                        onboardScreensData={onboardScreensData}
                        onboardScreensPagination={onboardScreensPagination}
                    />
                </View>
            )
        }
        else{
            return(
                <View style={TarotGameSettingsOnboardScreensContainerStyle.TarotGameSettingsOnboardScreensContainerFallbackInnerContainer}>
                    <Text style={TarotGameSettingsOnboardScreensContainerStyle.TarotGameSettingsOnboardScreensContainerFallbackInnerContainerText}>
                        {!tarotGameSettingsData?.tarotBackground && t('tarotGameSettings.tarotGameSettingsOnboardScreensContainer.noTarotBackground') + '\n\n'}
                        {!tarotGameSettingsData?.tarotCursor && t('tarotGameSettings.tarotGameSettingsOnboardScreensContainer.noTarotCursor') + '\n\n'}
                        {!tarotGameSettingsData?.tarotDeck && t('tarotGameSettings.tarotGameSettingsOnboardScreensContainer.noTarotDeck')}
                    </Text>
                </View>
            )
        }
    }

    return null

}