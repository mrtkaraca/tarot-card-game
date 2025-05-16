import { 
    useEffect, 
    useLayoutEffect, 
    useState 
} from "react";
import { useNavigation} from "expo-router" 
import { CommonActions } from "@react-navigation/native"


export const useCustomRoute = ()=>{
    const navigation = useNavigation();

    const [isNavigationReady,setIsNavigationReady] = useState(false)

    const resetAndNavigate = (screenName:string)=>{
        return navigation.dispatch(CommonActions.reset({
            routes: [{
                name:screenName
            }],
        }))
    };

    const rootNavigate = ()=>{
        useLayoutEffect(()=>{
            if(isNavigationReady){
                return resetAndNavigate('(app)')
            }
        },[isNavigationReady])
    }

    useEffect(()=>{
        if(navigation.getState()){
            setIsNavigationReady(true)
        }
    },[navigation])

    return {
        resetAndNavigate,
        rootNavigate
    }
}

export default {
    useCustomRoute
}

