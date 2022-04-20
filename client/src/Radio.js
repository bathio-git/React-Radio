import {useParams} from "react-router-dom";
import { AppContext } from "./AppContext";
import { useContext, useState } from "react";
import { Page, Square, Titre,  Bouton1, Bouton3, Animate, } from "./RadioSyled.js"
import styled from "styled-components";
import { Link } from "react-router-dom";
import {useHistory} from 'react-router-dom';


function Radio()
{
    let { id } = useParams(); //console.log(id)
    let { names, slogans, streams, streamsType, radioUrl, currentUser } = useContext(AppContext)
    let [ playButtonState , setPlayButtonState ] = useState('>__')
    let [ frequence, setFrequence ] = useState(500)
    let [ qq, setQq ] = useState(0.4)
    let [ gg, setGg ] = useState(15)

    let history = useHistory();



    //let [ clicked, setClicked ] = useState(1)
    //let [ mediaRecorder, setMediaRecorder ] = useState(null)
    var clicked = false;
    var  chunks = []; 
    var mediaRecorder;

    function volumeDown () 
    { 
        let vid = document.getElementById("video");
        if (vid.volume > 0 ) vid.volume = vid.volume/1.5

        let vol = document.getElementById('volume')
        let x = vid.volume
        vol.textContent = x.toString().substring(0,4);
    }

    function volumeUp () 
    {
        let vid = document.getElementById("video");
        if (vid.volume < 1) 
            {
                vid.volume*1.5 <1 
                ? vid.volume = vid.volume*1.5 
                : vid.volume = 1
            }

        let vol = document.getElementById('volume')
        let x = vid.volume
        vol.textContent = x.toString().substring(0,4);
    }

    function playPaused ()
    {
        let audio = document.getElementById('video')
        if(playButtonState ===  '>__')
            {   audio.play() ; setPlayButtonState('_//') }

        else if (playButtonState === '_//')
            {   audio.pause() ; setPlayButtonState('>__') }
    }
    
    function blobToBase64 (blob) 
    {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function () {
                resolve(reader.result);
            }
        })
    }

    async function ok (e) 
    {    
        if (!clicked) 
        {
            let ac = new AudioContext();
            let osc = ac.createMediaElementSource(document.getElementById('video'));
            let dest = ac.createMediaStreamDestination();
            var filter = ac.createBiquadFilter();
            osc.connect(filter); //and of course connect it
            filter.type = "peaking"; //this is a lowshelffilter (try excuting filter1.LOWSHELF in your console)
            filter.frequency.value = frequence; //as this is a lowshelf filter, it strongens all sounds beneath this frequency
            filter.gain.value = qq;
            filter.Q.value = gg;

            filter.connect(dest); // recorder
            filter.connect(ac.destination);   // speakers

            mediaRecorder = await new MediaRecorder(dest.stream)
            mediaRecorder.start();
            //console.log(mediaRecorder)
            e.target.textContent = "Save";
            clicked = true
            let text = document.getElementById('textArea')
            text.style.display = 'block' 

            let peaking = document.getElementById('peaking')
            peaking.style.visibility = 'visible'

            let freq = document.getElementById('freq')
            freq.addEventListener("click", () => {
                let newf = document.getElementById(`freq`).value
                filter.frequency.value = newf
                document.getElementById('freqN').textContent = newf;
            }) 

            let gain = document.getElementById('gain')
            gain.addEventListener("click", () => {
                let newG = document.getElementById(`gain`).value -30
                filter.gain.value = newG
                document.getElementById('gN').textContent = newG;
            })

            let qqq = document.getElementById('qqq')
            qqq.addEventListener("click", () => {
                let newQ = document.getElementById(`qqq`).value
                filter.Q.value = newQ
                document.getElementById('qN').textContent = newQ;
            }) 

        }

        else 
        {
            console.log(mediaRecorder)
            mediaRecorder?.stop();
            e.target.disabled = true;
            var text = document.getElementById('textArea')
            text.style.display = 'none'
        }

        mediaRecorder.ondataavailable = function(evt) {
            // push each chunk (blobs) in an array
            chunks.push(evt.data);
            console.log(chunks)
        };

        mediaRecorder.onstop = async function(evt) {
            console.log('oui')
            // Make blob out of our blobs, and open it.
            var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
            var passBlob = await blobToBase64(blob)
            e.target.textContent = "";
            document.querySelector("audio").src = passBlob;

            //console.log(blob)
            //let downLoadLink = URL.createObjectURL(blob)

            //console.log(comment)

            var current = new Date();
            var x = document.getElementById("myTextarea").value;

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    comment: x,
                    user: currentUser,
                    date: current.toLocaleDateString('en-GB'),
                    savedTime: current.toLocaleTimeString(), 
                    radio: id,
                    link: passBlob,
                })
            }
            console.log(requestOptions)
            fetch("/newmix", requestOptions)
        }
    }

    function ClickMe () {
        if (currentUser){
            return (
                <button onClick={ok} style={{marginLeft:'275px'}}>record</button>
            )
        }
        else{
            return (
                <Link to={`/connect`} target="_blank"> 
                    <p style={{fontSize: '18px', marginLeft:'150px'}}>
                        record
                    </p>
                </Link>
            )
        } 
    }

    return(
        <Page style={{zoom: '150%'}}>
            <button 
                onClick={()=>history.goBack()}
                style = {{position:'absolute', top:'50px', left: '50px', fontSize:'28px'}}
            >ß</button>

                
            <Square>

            <div style={{width: '500px', marginLeft: '220px', marginTop: '100px', visibility:'hidden'}} id={'peaking'}>
                <div style={{margin: '5px'}}>
                    <p id='freqN'></p>
                    <input style={{marginLeft: '50px'}} id={`freq`} type="range" orient="vertical" min="20" max="6000" 
                        /> hz
                </div>
                <div style={{margin: '5px'}}>
                    <p id='qN'></p>
                    <input style={{marginLeft: '50px'}} id={`qqq`} type="range" orient="vertical" min="0" max="18" 
                        /> q
                </div>
                <div style={{margin: '5px'}}>
                    <p id='gN'></p>
                    <input style={{marginLeft: '50px'}} id={`gain`} type="range" orient="vertical" min="0" max="60"
                        /> db
                </div>
            </div>
    
                <div>
                    <Bouton1 onClick={volumeUp}  style={{marginRight: '150px'}} >&#9650;</Bouton1>
                </div>
                <p id={'volume'}></p>
                <button onClick={playPaused}> 
                    <Titre style={{marginLeft:'60px'}}>{`${playButtonState} `}{names[id]} {playButtonState} </Titre> 
                </button>
                <div>
                <Bouton3 onClick={volumeDown} >&#9660;</Bouton3>
                <ClickMe/>
                </div>
                <div className='container'>
                <Animate className='typed-out'><a href={radioUrl[id]} target={'blank'}>{slogans[id]}</a></Animate>
                <div style={{display:'none', margin:'40px 80px'}} id={'textArea'}>
                <TextSpace id={'myTextarea'}
                    placeholder="comment" 
                    maxLength="240"
                />
            </div>
            </div>
            </Square>

            < audio></audio>
            <video id='video' controls={false} disabled= {false} src={streams[id]} type={streamsType[id]} crossOrigin={"anonymous"} />
        </Page>
    )
} 

export default Radio;

let TextSpace = styled.textarea`
    width : 400px;
    height : 200px;
    padding : 1%;
    margin : 1%;
    background-color: black;
    color: #aaa;
    box-sizing : border-box;
    border : 1px solid #aaa;
    border-style : solid none none solid;
    border-radius : 1px;
    font-size : 16px;
    resize : none;
    font-family : _Regular; font-size: 110%;
    margin-bottom : 30px;
    &:focus{outline: none;}
`
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
        /*

        ---> you could just send a link to download it in the backend 
        const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ link: downLoadLink })
                    };

                    */
