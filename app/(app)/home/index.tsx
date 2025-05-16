import { 
    Text,
    View
} from "react-native"
import { Image } from "expo-image"
import { useTranslation } from "react-i18next"

import { TextButton } from "@/components/TextButton"
import { HomeIcons } from "@/constants/icon"
import { HomeColors } from "@/constants/color"
import { HomeSizes } from "@/constants/size"

import { useHomeHook } from "./hook"
import { HomeStyle } from "./style"

const Home = ()=>{

    const{
        handleNavigateToTarotGameSettings
    } = useHomeHook({

    })

    const {
        t
    } = useTranslation()

    
    return(
        <View style={HomeStyle.HomeContainer}>
            <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={HomeStyle.HomeTitle}
            >
                {t('home.title')}
            </Text>
            <View
                style={HomeStyle.HomeLogoContainer}
            >
                <Image
                    source={HomeIcons.logo}
                    contentFit="contain"
                    style={HomeStyle.HomeLogo}
                />
            </View>
            <TextButton
                numberOfLines={1}
                textButtonTextLabel={t('home.startTextButton')}
                handleOnPress={handleNavigateToTarotGameSettings}
                textButtonOpacityColor={HomeColors.startTextButton.textButtonOpacityColor}
                textButtonBorderRadius={HomeSizes.startTextButton.borderRadius}
               
            />
        </View>
    )
}

export default Home