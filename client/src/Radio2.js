import {useParams, Link} from "react-router-dom";

import { AppContext } from "./AppContext";

import { useContext, useState } from "react";
import { Page, Square, SquareRed, Titre,  Bouton1, Bouton3, Button4, Button, Video} from "./RadioSyled.js"

import Login from "./Login";

import Textarea from "./Textarea";


function Radio()
{
    let { id } = useParams(); //console.log(id)

    let { names, slogans, streams, streamsType, radioUrl  } = useContext(AppContext)

    let [ playButtonState , setPlayButtonState ] = useState('play')

    let [ pageState , setPageState ] = useState('default')

    let [ userConnected , setUserConnected ] = useState(false)

    let [ audioState , setAudioState ] = useState('not_recording')

    let [ tape , setTape ] = useState(null)

    function volumeDown () 
    {
        let vid = document.getElementById("xxx");
        return vid.volume > 0 ? vid.volume = vid.volume-0.1 : null ;
    }

    function volumeUp () 
    {
        let vid = document.getElementById("xxx");
        return vid.volume < 1 ? vid.volume = vid.volume+0.1 : null ;
    }

    function record ()
    {
        let ac = new AudioContext();
        let osc = ac.createMediaElementSource(document.getElementById('xxx'));
        let dest = ac.createMediaStreamDestination();
        osc.connect(dest); // recorder
        osc.connect(ac.destination);   // speakers
        return dest
    } 

    let mediaRecorder = null; let clicked = false; let  chunks = [];

    function playPaused ()
    {
        let audio = document.getElementById('xxx')

        if (audioState === 'not_recording')
        {
            console.log('okoko')
            let dest = record()
            mediaRecorder = new MediaRecorder(dest.stream);
            mediaRecorder.start();
            mediaRecorder.ondataavailable = function(evt) {
                // push each chunk (blobs) in an array
                chunks.push(evt.data);
                console.log(chunks)
            };
        }

        else if (playButtonState ===  'play')
            { audio.play() ; setPlayButtonState('pause') }

        else if (playButtonState === 'pause')
            {   audio.pause() ; setPlayButtonState('play') }

            mediaRecorder.ondataavailable = function(evt) {
                // push each chunk (blobs) in an array
                chunks.push(evt.data);
                console.log(chunks)
            };

            const blobToBase64 = (blob) => {
                    return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onloadend = function () {
                        resolve(reader.result);
                    };
                });
            };

            mediaRecorder.onstop = async function(evt) {
                        // Make blob out of our blobs, and open it.
                        const blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
                        const passBlob = await blobToBase64(blob)
                        let mediaRecorder = null
                        document.querySelector("audio").src = passBlob;

                    //console.log(blob)
                    let downLoadLink = URL.createObjectURL(blob)

                    console.log(downLoadLink)
                    
                    var current = new Date();
                    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 
                            user: 'xxxx',
                            date: current.toLocaleDateString(undefined, options),
                            savedTime: current.toLocaleTimeString(), 
                            radio: id,
                            link: passBlob,
                            comment: 'Shanti Celeste | Boiler Room x Bass Coast Festival',
                        })
                    }
                    console.log(requestOptions)
                //fetch("/newmix", requestOptions)
            }
    }

    function save ()
    {
        //let mediaRecorder = tape;

        mediaRecorder?.stop();
    }
    

    function startSaving ()
    {
        setPageState('saving')
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////  J  S  X  ///////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if ( pageState === 'default')
    {
        return(
            <Page>
                <Square>
                
                    <Bouton1 onClick={volumeUp} >&#9650;</Bouton1>
                    <Titre style={{marginLeft:'60px'}}>{names[id]}</Titre>
                    <SquareRed>
                        <a href={radioUrl[id]}>{slogans[id]}</a>
                        <SquareRed>
                            <button onClick={playPaused}>{playButtonState}</button>
                        </SquareRed>
                    </SquareRed>
                    <Bouton3 onClick={volumeDown} >&#9660;</Bouton3>
                </Square>
                < audio controls></audio>
                <video id='xxx' controls={false} disabled= {false}   src={streams[id]} type={streamsType[id]} crossOrigin={"anonymous"} />
              
                <button 
                    onClick={ () => {setPageState('saving')} } 
                > 
                    {`--> save <--`}
                </button>
            </Page>
        )
    }

    else if ( pageState === 'saving' && userConnected === true)
    {
        return(
            <Page>
                <Square>
                    <Bouton1 onClick={volumeUp} >&#9650;</Bouton1>
                    <Titre style={{marginLeft:'60px'}}>{names[id]}</Titre>
                    <SquareRed>
                        <a href={radioUrl[id]}>{slogans[id]}</a>
                        <SquareRed>
                            <button onClick={playPaused}>{playButtonState}</button>
                        </SquareRed>
                    </SquareRed>
                    <Bouton3 onClick={volumeDown} >&#9660;</Bouton3>
                </Square>
                < audio controls></audio>
                <video id='xxx' controls={false} disabled= {false}   src={streams[id]} type={streamsType[id]} crossOrigin={"anonymous"} />

                    <Textarea/>
                    <button onClick={save}> {`--> save <--`}</button>

            </Page>
        )
    }

    else if ( pageState === 'saving' && userConnected === false)
    {
        return(
            <Page>
                <Link to= {`/`}> home </Link>

                <Square>
                    <Bouton1 onClick={volumeUp} >&#9650;</Bouton1>
                    <Titre style={{marginLeft:'60px'}}>{names[id]}</Titre>
                    <SquareRed>
                        <a href={radioUrl[id]}>{slogans[id]}</a>
                        <SquareRed>
                            <button onClick={playPaused}>{playButtonState}</button>
                        </SquareRed>
                    </SquareRed>
                    <Bouton3 onClick={volumeDown} >&#9660;</Bouton3>
                </Square>
                < audio controls></audio>
                <video id='xxx' controls={false} disabled= {false}   src={streams[id]} type={streamsType[id]} crossOrigin={"anonymous"} />

                <Login/>
                    <button onClick={save}> {`--> save <--`}</button>
                    

            </Page>
        )
    }
} 

export default Radio;

/*

----- Keyboard navigation draft  -----------
    useEffect(()=>{
        /// effect
        function handleKeydown (event)
        {
            event.preventDefault()
            console.log(event.code);
            if (event.code === 'ArrowUp') volumeUp(); 
            else if (event.code === 'ArrowDown') volumeDown ();  
            //else if (event.code === 'ArrowRight') volumeDown ()
            //else if (event.code === 'ArrowLeft') volumeDown ()
        }
        document.addEventListener('keydown' , handleKeydown) 
        ///////

        return () => document.removeEventListener('keydown', handleKeydown) // cleanup function runs after the effect
    }, [] ) */
/*
    function handleKeydown (event)
    {
        event.preventDefault()
        console.log(event.code);
        if (event.code === 'ArrowUp') volumeUp(); 
        else if (event.code === 'ArrowDown') volumeDown ();  
        //else if (event.code === 'ArrowRight') volumeDown ()
        //else if (event.code === 'ArrowLeft') volumeDown ()
    }

    document.addEventListener('keydown' , handleKeydown) 


     <Square>
                 <button onClick={save} > save </button>
            <Bouton1 onClick={volumeUp} >&#9650;</Bouton1>
            <Titre style={{marginLeft:'60px'}}>{names[id]}</Titre>
                <SquareRed>
                <a href={radioUrl[id]}>{slogans[id]}</a>
                    <button onClick={playRadio}>{playButtonState} </button>
                </SquareRed>
            <Bouton3 onClick={volumeDown} >&#9660;</Bouton3>
            </Square>

            */



        /* filter draft 
            let [ frequency, setFrequency ] = useState(500) 
            let [ gain, setGain ] = useState(25)
            let [ q, setQ ] = useState(25)
            let filter = ac.createBiquadFilter();
            osc.connect(filter); //and of course connect it
            filter.type = "peaking"; //this is a lowshelffilter (try excuting filter1.LOWSHELF in your console)
            filter.frequency.value = 500; //as this is a lowshelf filter, it strongens all sounds beneath this frequency
            filter.gain.value = 25;
            filter.Q.value = 0.4;
        */

        /*
         ---> you could just send a link to download it in the backend 
        const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ link: downLoadLink })
                    };

                    */

                    /*

                    import Bouton from "./Bouton";

function Scream ()
{
    const { feed, setFeed, erreur, setErreur, charCount, setCharCount, profile, setProfile, screamm, setScreamm } = useContext(GContext);

    function ChrCnt ()
    {
        if(charCount === 0) return <></>;
        else return(
            <>
                <Format><Bouton/></Format>
                <Cct> {charCount} </Cct>
            </>
        )
    }

    return (<>
        <TextSpace 
            placeholder="What's happening ?" 
            onChange={e =>{ setCharCount(e.target.value.length); setScreamm(e.target.value) }}
            maxLength="240"
        />
        <ChrCnt/>
    </>)

}; export default Scream;

// ∂  

let Format = styled.div`
    position : absolute;
    top : 145px;
    left :50px;
    border-bottom : solid 2px black;
    transform : scale(0.5);
`

let TextSpace = styled.textarea`
    width : 725px;
    height : 95px;
    padding : 1%;
    margin : 1%;
    box-sizing : border-box;
    border : 1px solid #aaa;
    border-style : solid none none solid;
    border-radius : 1px;
    font-size : 16px;
    resize : none;
    font-family : DMSans-Regular; font-size: 110%;
    margin-bottom : 30px;
    &:focus{outline: none;}
`

let Cct = styled.p`
    position : absolute;
    top : 185px;
    left : 775px;
    padding : 5px 10px;
    box-sizing : border-box;
    border : 1px solid #aaa;
    border-style : none solid solid none;
    border-radius : 1px;
`
*/