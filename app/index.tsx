import { useCustomRoute } from "./hooks"

// services
import "@/services/i18n"

export const Index =()=>{

   const {
      rootNavigate
   } = useCustomRoute()

   rootNavigate()
    
}

export default Index
