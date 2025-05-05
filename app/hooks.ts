import { useNavigation, useSegments } from "expo-router"
import { CommonActions } from "@react-navigation/native"


export const useCustomRoute = ()=>{
    const navigation = useNavigation();
    const segment = useSegments();

    const resetAndNavigate = (screenName:string)=>{
        return navigation.dispatch(CommonActions.reset({
            routes: [{name:screenName}],
        }))
    };

    return {
        resetAndNavigate
    }
}

