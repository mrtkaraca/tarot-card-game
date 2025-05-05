import { 
    TTarotGameSelectionsPaginationData,
    TTarotGameImageQualitysConfig,
    TTarotGameCardDrawningNumbersConfig
 } from "./type"


export const TarotGameImageQualitys:TTarotGameImageQualitysConfig = [
    {
        id:'veryLow',
        name:'Very Low',
        viewports:{
            tarotDeck:{
                width:120,
                height:200
            },
            tarotBackground:{
                width:180,
                height:320
            },
            tarotCursor:{
                width:128,
                height:128
            }
        }
    },
    {
        id:'low',
        name:'Low',
        viewports:{
            tarotDeck:{
                width:240,
                height:400
            },
            tarotBackground:{
                width:360,
                height:640
            },
            tarotCursor:{
                width:128,
                height:128
            }
        }
    },
    {
        id:'medium',
        name:'Medium',
        viewports:{
            tarotDeck:{
                width:360,
                height:600
            },
            tarotBackground:{
                width:630,
                height:1120
            },
            tarotCursor:{
                width:256,
                height:256
            }
        }
    },
    {
        id:'high',
        name:'High',
        viewports:{
            tarotDeck:{
                width:480,
                height:800
            },
            tarotBackground:{
                width:810,
                height:1440
            },
            tarotCursor:{
                width:256,
                height:256
            }
        }
    },
    {
        id:'veryHigh',
        name:'Very High',
        viewports:{
            tarotDeck:{
                width:600,
                height:1000
            },
            tarotBackground:{
                width:1080,
                height:1920
            },
            tarotCursor:{
                width:256,
                height:256
            }
        }
    }
]


export const TarotGameCardDrawningNumbers:TTarotGameCardDrawningNumbersConfig = [
    {
        id:1,
        name:'1'
    },
    {
        id:3,
        name:'3'
    },
    {
        id:5,
        name:'5'
    },
    {
        id:7,
        name:'7'
    },
    {
        id:9,
        name:'9'
    }
]

export const TarotGameSelectionsPaginationData:TTarotGameSelectionsPaginationData = [
    {
        id:'tarotGameImageQuality',
        data:TarotGameImageQualitys,
        title:'Select Quality of Images'
    },
    {
        id:'tarotGameDrawningCardNumber',
        data:TarotGameCardDrawningNumbers,
        title:'Select Number of Drawing Cards'
    }
]