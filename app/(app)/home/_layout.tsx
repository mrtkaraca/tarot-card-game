import { Stack } from "expo-router";


const StackLayout = () => {

  return (
    <Stack
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