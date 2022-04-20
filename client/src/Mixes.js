import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "./AppContext";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Loading from "./Loading";

function Mixes ()
{
    let [ mixes, setMixes ] = useState(null)

    let { names, slogans, radioUrl, currentUser } = useContext(AppContext)
    let history = useHistory();

    useEffect(() => {
        //console.log("fetching")
        fetch("/allMixes/")
            .then((res) => res.json())
            .then((data) => { setMixes(data.data) })
        .catch((err) => { console.log(err) })
    }, []);

    let luck =  () => { 
        let i = Math.floor(Math.random() * (mixes.length))

        let nextTrack = document.getElementById(mixes[i]._id)
        nextTrack.play() ;
        let nextTrackText =  document.getElementById(`b${mixes[i]._id}`)
        nextTrackText.textContent = `${mixes[i].magic.date} __${names[mixes[i].magic.radio]} _//`
        
    }

    function ListOfMixes ()
    {
        let z = mixes.map( (element, index) => {
            //console.log(mixes[index]._id)
            return(
                <div style={{ margin:'30px' }} key={`listOfMixes${index}`}>

                    <audio id={mixes[index]._id} audioautobuffer="autobuffer" 
                        onEnded={() => 
                            {
                                let audio = document.getElementById(`b${mixes[index]._id}`)
                                audio.style.textDecoration  = 'line-through'
                                console.log('audio ended')
                                let nextTrack = document.getElementById(mixes[index+1]._id)
                                nextTrack.play() ;
                                let nextTrackText =  document.getElementById(`b${mixes[index+1]._id}`)
                                nextTrackText.textContent = `${mixes[index+1].magic.date} __${names[mixes[index+1].magic.radio]} _//`
                            }
                        }
                    >
                        <source src={mixes[index].magic.link} />
                    </audio>

                    <button
                        id={`b${mixes[index]._id}`} 
                        style={{margin:'20px'}} onClick={ (e) => {
                            let audio = document.getElementById(mixes[index]._id)
                            if (e.target.textContent === `${mixes[index].magic.date} __ ${names[mixes[index].magic.radio]} >__`)
                            {
                                e.target.textContent = `${mixes[index].magic.date} __${names[mixes[index].magic.radio]} _//`
                                audio.play() ;
                            }
                            else
                            {
                                e.target.textContent = `${mixes[index].magic.date} __ ${names[mixes[index].magic.radio]} >__`
                                audio.pause() ;
                            }
                        } }
                    >
                        {mixes[index].magic.date} {`__ ${names[mixes[index].magic.radio]} >__`}
                    </button>

                    <div style={{ margin:'0% 10%'}}  id={`s${mixes[index]._id}`}>
                        <a href={radioUrl[mixes[index].magic.radio]} target={'blank'}><p> {slogans[mixes[index].magic.radio]} </p></a>
                    </div>

                    <p style={{margin:'0% 10%'}}>
                        saved at {mixes[index].magic.savedTime} by&nbsp;
                        <Link 
                            style={{ fontSize:'15px', margin:'0%' }}
                            to={`/profile/${mixes[index].magic.user}`}>
                                {mixes[index].magic.user} 
                        </Link>
                    </p>

                    <p style={{margin:'10px 10%', padding: '10px', borderLeft:'solid 1px #aaa'}} >
                        {mixes[index].magic.comment}
                    </p>

                    <input id={`v${mixes[index]._id}`} type="range" orient="vertical" min="0" max="100" 
                        onChange={(e) => {
                            let newVolume = document.getElementById(`v${mixes[index]._id}`).value / 100
                            let audio = document.getElementById(mixes[index]._id)
                            audio.volume = newVolume
                        }}
                    />
                </div>
            )
        })
        return z
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
    if(mixes === null) return <Loading />

    else
    { //console.log(mixes[0].magic.radio)
        return( 
            <div style={{fontFamily: '_Regular', margin:'10%'}}>
                <button 
                onClick={()=>history.goBack()}
                style = {{position:'absolute', top:'50px', left: '50px', fontSize:'28px'}}
                >ß</button>
                <Link to={`/profile/${currentUser}`} style={{fontSize:'20px' }}>u</Link>
                <ListOfMixes/>
                <Button onClick={luck}>&nbsp;luck</Button>
            </div>
        )
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
}
export default Mixes;

let Button = styled.button`
    width: 18px;
    //height: 50px;
    font-size: 17px;
    border-left: #aaa 2px solid;
    border-radius: 50%;
`