import { View } from "react-native"
import { useCustomRoute } from "./hooks"
import { router, Slot } from "expo-router"
import { useEffect } from "react"

export const Index =()=>{

  
    
   const {
      rootNavigate
   } = useCustomRoute()

   rootNavigate()

    
}

export default Index
