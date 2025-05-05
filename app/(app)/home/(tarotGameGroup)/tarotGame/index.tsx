import React from "react"

import { TarotGameBackground } from './components/TarotGameBackground';
import { TarotGameHeader } from './components/TarotGameHeader';
import { TarotGameContainer } from './components/TarotGameContainer';
import { useTarotGameHook } from "./hooks";
import {TarotGameCardModal} from "./components/TarotGameCardModal";

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