import React from "react"

import { TarotGameBackground } from './components/TarotGameBackground';
import { TarotGameHeader } from './components/TarotGameHeader';
import { TarotGameContainer } from './components/TarotGameContainer';
import {TarotGameCardModal} from "./components/TarotGameCardModal";

import { useTarotGameHook } from "./hooks";

const TarotGame= () => {

    const {

    } = useTarotGameHook()

    return(
        <TarotGameBackground>
            <TarotGameHeader/>
            <TarotGameContainer/>
            <TarotGameCardModal/>
        </TarotGameBackground>
    )

}

export default TarotGame