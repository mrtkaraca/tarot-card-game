
import { Stack } from "expo-router";

import { TarotGameGroupProvider } from "@/contexts/tarotGameGroup";

const StackLayout = () => {

  return (
    <TarotGameGroupProvider>
        <Stack
            screenOptions={{
                headerShown:false,
                animation:'slide_from_right',
            }}
            >
            <Stack.Screen
                name='tarotGameSettings'
            />
            <Stack.Screen
                name='tarotGame'
            />
        </Stack>
    </TarotGameGroupProvider>
  )
}

export default StackLayout