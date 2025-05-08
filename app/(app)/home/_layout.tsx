import { Stack } from "expo-router";


const StackLayout = () => {

  return (
    <Stack
      initialRouteName="index"
         screenOptions={{
            headerShown:false,
            animation:'fade'
        }
    }>
        <Stack.Screen name="index"/>
    </Stack>
  )
}

export default StackLayout