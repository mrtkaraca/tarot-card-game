import { HomeSizes } from "@/constants/size";
import { StyleSheet } from "react-native";

export const HomeStyle = StyleSheet.create({
    HomeContainer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:'white'
    },
    HomeTitle:{
        fontSize:HomeSizes.homeTitle,
        fontWeight:'500'
    },
    HomeLogoContainer:{
        flex:0.5,
        width:'100%'
    },
    HomeLogo:{
        height:'100%',
        width:'100%',
    }
})

export default {
    HomeStyle
}