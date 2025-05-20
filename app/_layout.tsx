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
import { SafeAreaView } from 'react-native-safe-area-context';


SplashScreen.preventAutoHideAsync();

const RootLayout = () => {

    const segment = useSegments();

    useEffect(()=>{
        if(segment.length){
            SplashScreen.hideAsync();
        }
    },[segment])


    return (
        <SafeAreaView
            // some xiaomi problems
            edges={['bottom','right','left']}
            style={{
                flex:1,
                backgroundColor:'black'
            }}
        >
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
        </SafeAreaView>
    )
}

export default RootLayout