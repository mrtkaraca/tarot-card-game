export const en = {
    home:{
        title:'Tarot Card Game',
        startTextButton:'Start'
    },
    tarotGameSettings:{
        tarotGameSettingsHeader:{
            title:'Game Options',
            skip:'Skip',
            skipAlertModal:{
                alertModalTitle:'Alert',
                leftButtonTextLabel:'Cancel',
                rightButtonTextLabel:'Contiune'
            },
            alertModalDescription:{
                tarotBackground:'Tarot Background',
                tarotCursor:'Tarot Cursor',
                tarotDeck:'Tarot Deck',
                descriptionPart:'will choosen randomly.'
            }
        },
        tarotGameSettingsOnboardScreensContainer:{
            reFetch:'Try Again',
            noTarotCursor:'Seems like no cursor to use!',
            noTarotDeck:'Seems like no deck to use!',
            noTarotBackground:'Seems like no background to use!'
        },
        tarotGameSettingsOnboardScreen:{
            title:{
                tarotBackground:'Choose Tarot Background',
                tarotCursor:'Choose Tarot Cursor',
                tarotDeck:'Choose Tarot Deck'
            }
        },
        tarotGameSettingsOnboardTarotDeckScreenInformationPopOverDescription:{
            oneTap:{
                title:"One Tap:",
                description:"Click once to the image that u wanna select it."
            },
            doubleTap:{
                title:"Dobule Tap:",
                description:"Click twice to the image that u show full screen image."
            },
            slideImage:{
                title:"Slide Image:",
                description:"Slide image to see next image."
            }
        },
        tarotGameSettingsFooter:{
            leftButtonTextLabel:'Prev',
            rightButtonTextLabel:'Next',
            rightButtonEndTextLabel:'Okay'
        }
    },
    tarotGame:{
        tarotGameSelectionsPaginationContainer:{
            tarotGameImageQualitys:{
                veryLow:'Very Low',
                low:'Low',
                medium:'Medium',
                high:'High',
                veryHigh:'Very High'
            },
            tarotGameCardDrawningNumbers:{
                1:'1',
                3:'3',
                5:'5',
                7:'7',
                9:'9'
            },
            tarotGameSelectionsPaginationData:{
                tarotGameImageQualityTitle:'Select Quality of Images',
                tarotGameCardDrawningNumbersTitle:'Select Number of Drawing Cards'
            }
        },
        tarotGameDataFetch:{
            noTarotCursor:'Seems like no cursor to use!',
            noTarotDeck:'Seems like no deck to use!',
            noTarotBackground:'Seems like no background to use!',
            tarotGameDataLoadingDataTitles:{
                fetchData:'Fetching Data',
                loadingAssets:'Loading Assets'
            }
        },
        tarotGameSelectionsFooterContainer:{
            leftButtonTextLabel:'Prev',
            rightButtonTextLabel:'Next',
            rightButtonEndTextLabel:'Okay'
        },
        tarotGameGameLoading:{
            preparingText:'Preparing the game'
        }
    },
    errorResponseHandler:{
        unknownError:{
            errorTitleMessage:'Unexpected error code!',
            errorDescriptionMessage:'Error was unexpected, try later!'
        },
        networkError:{
            '0':{
                errorTitleMessage:'No Connection!',
                errorDescriptionMessage:'Reconnect to net!'
            }
        },
        tarotGameSettings:{
            '400':{
                errorTitleMessage:"Hmm...",
                errorDescriptionMessage:"Bad request to server!"
            },
            '401':{
                errorTitleMessage:"Oh no...",
                errorDescriptionMessage:"My middleware dont like you!"
            },
            '503':{
                errorTitleMessage:"Ups...",
                errorDescriptionMessage:"Something really wrong. Try Later!"
            }
        },
        tarotGame:{
            '400':{
                errorTitleMessage:"Hmm...",
                errorDescriptionMessage:"Bad request to server!"
            },
            '401':{
                errorTitleMessage:"Oh no...",
                errorDescriptionMessage:"My middleware dont like you!"
            },
            '503':{
                errorTitleMessage:"Ups...",
                errorDescriptionMessage:"Something really wrong. Try Later!"
            }
        }
    }
}