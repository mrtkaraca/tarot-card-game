import { Stack} from "expo-router"

import { TarotGameSettingsProvider } from "@/contexts/tarotGameSettings"

const StackLayout = ()=>{

    return(
        <TarotGameSettingsProvider>
            <Stack
                screenOptions={{
                    headerShown:false,
                    animation:'fade_from_bottom'
                }}
            >
                <Stack.Screen
                    name="index"
                />
            </Stack>
        </TarotGameSettingsProvider>
    )
}

export default StackLayout