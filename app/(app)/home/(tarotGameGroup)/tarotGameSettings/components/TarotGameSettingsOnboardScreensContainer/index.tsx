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
import { TarotGameSettingsOnboardTarotDeckScreenItemContainer } from "../TarotGameSettingsOnboardTarotDeckScreenItemContainer";
import { TarotGameSettingsOnboardDefaultScreenItemContainer } from "../TarotGameSettingsOnboardDefaultScreenItemContainer";

import { onboardScreensData } from "./helper";
import { useTarotGameSettingsOnboardScreensContainerHook } from "./hook";
import { TarotGameSettingsOnboardScreensContainerStyle } from "./style";
import { TTarotGameSettingsOnboardScreensContainerProps } from "./type";


const LazyTarotGameSettingsOnboardTarotDeckScreenItemContainer = lazy(()=>import('../TarotGameSettingsOnboardTarotDeckScreenItemContainer').then((module)=>({default:module.TarotGameSettingsOnboardTarotDeckScreenItemContainer})))
const LazyTarotGameSettingsOnboardDefaultScreenItemContainer = lazy(()=>import('../TarotGameSettingsOnboardDefaultScreenItemContainer').then((module)=>({default:module.TarotGameSettingsOnboardDefaultScreenItemContainer})))

export const TarotGameSettingsOnboardScreensContainer = (props:TTarotGameSettingsOnboardScreensContainerProps)=>{

    const {
        isPending,
        tarotGameSettingsData,
        errorViewData,
        onboardScreenDimensions,
        handleOnLayout,
        handleOnboardScreensDimensions,
    } = useTarotGameSettingsOnboardScreensContainerHook();


    if(isPending || tarotGameSettingsData === null){
        return(
            <View 
                onLayout={handleOnLayout} 
                style={TarotGameSettingsOnboardScreensContainerStyle.TarotGameSettingsOnboardScreensContainerFallbackInnerContainer}
            >
                <ActivityIndicator size={32 * PixelRatio.get()} />
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

    if((tarotGameSettingsData && tarotGameSettingsData.tarotBackground && tarotGameSettingsData.tarotCursor && tarotGameSettingsData.tarotDeck)){
        return(
            <View
                style={TarotGameSettingsOnboardScreensContainerStyle.TarotGameSettingsOnboardScreensContainerContainer}
            >
                <View onLayout={handleOnboardScreensDimensions} style={TarotGameSettingsOnboardScreensContainerStyle.TarotGameSettingsOnboardScreensContainerInnerContainer}>
                    {onboardScreensData.map((screen,index)=>{
                        return (
                            <TarotGameSettingsOnboardScreen 
                                key={index}
                                index={index}
                                screenName={screen.name}
                                screenTitle={screen.screenTitle}
                                onboardScreenDimensions={onboardScreenDimensions}
                                onboardScreensPagination={props.onboardScreensPagination}
                            >   
                                <Suspense>
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
                                </Suspense>
                            </TarotGameSettingsOnboardScreen>
                        )})
                    }
                </View>
                <TarotGameSettingsFooter
                    onboardScreensPagination={props.onboardScreensPagination}
                />
            </View>
        )
    }
    else{
        return(
            <View style={TarotGameSettingsOnboardScreensContainerStyle.TarotGameSettingsOnboardScreensContainerFallbackInnerContainer}>
                <Text style={TarotGameSettingsOnboardScreensContainerStyle.TarotGameSettingsOnboardScreensContainerFallbackInnerContainerText}>
                    {!tarotGameSettingsData?.tarotBackground && 'Gorunuse gore kullanabilcegin arka plan yok!\n\n'}
                    {!tarotGameSettingsData?.tarotCursor && 'Gorunuse gore kullanabilcegin imlec yok!\n\n'}
                    {!tarotGameSettingsData?.tarotDeck && 'Gorunuse gore kullanabilcegin deste yok!'}
                </Text>
            </View>
        )
    }


}