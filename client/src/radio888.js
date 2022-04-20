import {useParams} from "react-router-dom";
import { AppContext } from "./AppContext";
import { useContext, useState } from "react";
import { Page, Square, SquareRed, Animate, Titre,  Bouton1, Bouton3, Button4, Button, Video} from "./RadioSyled.js"
import Textarea from "./Textarea";

function Radio()
{
    let { id } = useParams(); //console.log(id)

    let { names, slogans, streams, streamsType, radioUrl  } = useContext(AppContext)

    let [ playButtonState , setPlayButtonState ] = useState('>__')

    let [ user, setUser ] = useState('xxxx')

    let [ comment, setComment ] = useState('')

    let [ pageState, setPageState ] = useState(null)

    let [clicked, setClicked ] = useState(false);

    let [tape, setTape ] = useState(null);

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

    function playPaused ()
    {
        let audio = document.getElementById('xxx')
        if(playButtonState ===  '>__')
            {   audio.play() ; setPlayButtonState('_//') }

        else if (playButtonState === '_//')
            {   audio.pause() ; setPlayButtonState('>__') }
    }


    let mediaRecorder; let  chunks = []; 

    function record ()
    {
        let ac = new AudioContext();
        let osc = ac.createMediaElementSource(document.getElementById('xxx'));
        let dest = ac.createMediaStreamDestination();
        osc.connect(dest); // recorder
        osc.connect(ac.destination);   // speakers
        return dest
    } 


    function ok (e) 
    {
        console.log(clicked)
        if (clicked === false) {
            console.log('okoko')
            let dest = record()
            mediaRecorder = new MediaRecorder(dest.stream);
            mediaRecorder.start();
            e.target.textContent = "save";
            setPageState('recording')
            //console.log(pageState)
            setClicked(true)
            setTape(mediaRecorder)
        }
        /*
        else if (pageState === 'recording') {
            e.target.textContent = "confirm";
            setPageState('saving')
            console.log(pageState)
            let text = document.getElementById('textArea')
            text.style.display = 'block'
        } 
        (pageState === 'saving')
        */
        else  {
            tape?.stop();
            e.target.disabled = true;
            //console.log(comment)
        }

        tape.ondataavailable = function(evt) {
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

        tape.onstop = async function(evt) {
                    // Make blob out of our blobs, and open it.
                    const blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
                    const passBlob = await blobToBase64(blob)
                    let mediaRecorder = null
                    e.target.textContent = "";
                    document.querySelector("audio").src = passBlob;
                    document.querySelector("audio").controls = true;

                //console.log(blob)
                let downLoadLink = URL.createObjectURL(blob)

                console.log(downLoadLink)
                
                var current = new Date();
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        user: user,
                        date: current.toLocaleDateString('en-GB'),
                        savedTime: current.toLocaleTimeString(), 
                        radio: id,
                        link: passBlob,
                        comment: comment,
                    })
                }
                console.log(requestOptions)
            //fetch("/newmix", requestOptions)
        }
    };
    

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////  J  S  X  ///////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
    
        return(
            <Page style={{zoom: '100%'}}>
                <Square>
                    <div>
                        <Bouton1 onClick={volumeUp}  style={{marginRight: '150px'}} >&#9650;</Bouton1>
                    </div>
                    <button onClick={playPaused}> 
                        <Titre style={{marginLeft:'60px'}}>{`${playButtonState} `}{names[id]} {playButtonState} </Titre> 
                    </button>
                    <div>
                    <Bouton3 onClick={volumeDown} >&#9660;</Bouton3>
                    <button onClick={ok} style={{marginLeft:'275px'}}>Record</button>
                    </div>
                    
                </Square>
                <div style={{display:'none'}} id={'textArea'}>
                <Textarea 
                    
                    onChange={e =>{ setComment(e.target.value) }}
                />
                </div>
                <div className='container'>
                    <Animate className='typed-out'><a href={radioUrl[id]}>{slogans[id]}</a></Animate>
                </div>
                
                < audio></audio>
                <video id='xxx' controls={false} disabled= {false}   src={streams[id]} type={streamsType[id]} crossOrigin={"anonymous"} />

            </Page>
        )
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
