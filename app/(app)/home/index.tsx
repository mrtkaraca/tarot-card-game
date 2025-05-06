import { 
    Text,
    View
} from "react-native"
import { router } from "expo-router"

import { TextButton } from "@/components/TextButton"
import { useHomeHook } from "./hook"

const Home = ()=>{

   const {
    handleNavigateToTarotGameSettings
   } = useHomeHook({

   })

    return(
        <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:'white'}}>
            <Text>Tarot Card Game</Text>
            <View
                style={{
                    flex:0.5,
                    backgroundColor:'red'
                }}
            >

            </View>
            <TextButton
                numberOfLines={1}
                textButtonTextLabel='Start'
                handleOnPress={handleNavigateToTarotGameSettings}
                textButtonColor="purple"
                textButtonOpacityColor='grey'
                textButtonBorderRadius={9999}
                style={{
                    color:'white'
                }}
            />
        </View>
    )
}

export default Home