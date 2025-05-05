import { useEffect } from 'react';
import { 
    Slot,
    useSegments 
} from 'expo-router'
import * as SplashScreen from 'expo-splash-screen';

import { AlertModalProvider } from '@/contexts/alertModal';
import { PortalProvider } from '@/contexts/portal';

import { AlertModal } from '@/components/AlertModal';

import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GlobalMMKVProvider } from '@/contexts/globalMMKV';


SplashScreen.preventAutoHideAsync();

const RootLayout = () => {

    const segment = useSegments();

    useEffect(()=>{
        if(segment.length){
            SplashScreen.hideAsync();
        }
    },[segment])


    return (
        <GlobalMMKVProvider>
            <AlertModalProvider>
                <PortalProvider>
                    <GestureHandlerRootView>
                        <StatusBar style='auto' />
                        <Slot/>
                        <AlertModal/>
                    </GestureHandlerRootView>
                </PortalProvider>
            </AlertModalProvider>
        </GlobalMMKVProvider>
    )
}

export default RootLayout