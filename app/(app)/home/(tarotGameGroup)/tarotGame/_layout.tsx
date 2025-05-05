import React from 'react'
import { Stack } from "expo-router";
import { TarotGameProvider } from '@/contexts/tarotGame';


const StackLayout = () => {

    return (
        <TarotGameProvider>
            <Stack 
                initialRouteName="index"
                screenOptions={{
                    headerShown:false,            
                }}
            >
                <Stack.Screen name="index" />
            </Stack>
        </TarotGameProvider>
    )
}

export default StackLayout