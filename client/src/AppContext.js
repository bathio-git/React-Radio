import { createContext, useContext, useState } from "react";
//

export const AppContext = createContext(null);

function AppProvider ({ children })
{
    let names =  
        [
            'antenas', 'balamii', 'cashmere', 'ckut' , 
            'kledu', 'lot','nts', 'nts2', 'raheem',
            'rinse_fr', 'soho_ldn', 'veneno',
            'worldwide'
        ]

    let slogans =  
        [
            'n10.as', 
            ' Togetherness Through Music', 
            'Berlin-Wedding', 
            'Montreal Campus Community Radio' , 
            'FM 101.2 - Bamako', 
            'Nassau Ave, Brooklyn',
            'Live on 1', 
            'Live on 2',  
            'Triennale di Milano',
            'verrouillé', 
            'Music', 
            'bulletin',
            '🌐'
        ]

        let streams = 
        [
            'https://n10as.out.airtime.pro/n10as_a',
            'https://balamii.out.airtime.pro/balamii_a',
            'https://cashmereradio.out.airtime.pro/cashmereradio_b',
            'https://ckut.out.airtime.pro/ckut_a',
            'http://stream.zenolive.com/f38bxpt3v2quv',
            'https://streamingv2.shoutcast.com/the-lot-radio',
            'https://stream-relay-geo.ntslive.net/stream',
            'https://stream-relay-geo.ntslive.net/stream2',
            'https://streams.radio.co/s63f12ebcb/listen',
            'https://radio10.pro-fhi.net/flux-trmqtiat/stream',
            'https://sohoradiomusic.doughunt.co.uk:8010/320mp3',
            'https://veneno.out.airtime.pro/veneno_b',
            'https://worldwidefm.out.airtime.pro/worldwidefm_b'
        ]

    let streamsType =
        [
            'audio/mpeg',
            'audio/aac',
            'audio/mp3',
            'audio/mpeg',
            'audio/aac',
            'audio/aac',
            'audio/mpeg',
            'audio/mpeg',
            'audio/mp3',
            'audio/aac',
            'audio/mp3',
            'audio/mp3',
            'audio/mp3'
        ]
        

    let radioUrl = 
        [
            'https://n10.as/', 
            'https://www.balamii.com/',
            'https://cashmereradio.com/', 
            'https://ckut.ca/en',
            'https://www.google.com/maps/place/Radio+Kledu/@12.6365868,-7.9764856,15z',
            'https://www.thelotradio.com/', 
            'https://www.nts.live/1',
            'https://www.nts.live/2', 
            'https://www.radioraheem.it/about-us/',
            'https://rinse.fr/',
            'https://sohoradiolondon.com/', 
            'https://veneno.live/bulletin/',
            'https://worldwidefm.net/'
        ]


        /////////////////////////////

        let [ currentUser, setCurrentUser ] = useState(JSON.parse(localStorage.getItem('currentUser')) )

    return (
        <AppContext.Provider
            value={
                { names, slogans, streams, streamsType, radioUrl, currentUser, setCurrentUser }
            }>{children}
        </AppContext.Provider>
    );
};
export default AppProvider;