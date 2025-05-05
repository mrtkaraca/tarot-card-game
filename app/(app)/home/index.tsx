import { 
    SafeAreaView,
    Text
} from "react-native"
import { router } from "expo-router"

import { TextButton } from "@/components/TextButton"

const Home = ()=>{

    const c = ()=>{
   
        router.navigate('/tarotEvent/tarotGameSettings')
    
    }

    return(
        <SafeAreaView style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <Text>(Home)</Text>
            <TextButton
                numberOfLines={1}
                textButtonTextLabel='git'
                handleOnPress={c}
                textButtonColor='red'
                textButtonOpacityColor='grey'
            />
        </SafeAreaView>
    )
}

export default Home