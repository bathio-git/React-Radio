import {useParams} from "react-router-dom";
import React, { useEffect, useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./AppContext";
import styled from "styled-components";
import {useHistory} from 'react-router-dom';
import Loading from "./Loading";

function Profile ()
{
    let { id } = useParams(); //console.log(id)
    let [ specific, setSpecific ] = useState(null)
    let [ mixes, setMixes ] = useState(null)
    let { names, slogans, streams, streamsType, radioUrl, currentUser, setCurrentUser  } = useContext(AppContext)
    let history = useHistory();

    useEffect(() => {//to get fetch a specific user
        fetch(`/getOneUser/${id}`)
            .then((res) => res.json())
                .then((data) => { setSpecific(data.data.obj); setMixes(data.mixes) })
        .catch((err) => { console.log(err) })
    }, [id])

    function ListOfMixes ()
    {
        if(mixes !== null)
        {
            let z = mixes?.map( (element, index) => {
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
                            style={{margin:'20px', fontSize:'16px'}} onClick={ (e) => {
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
        else{
            return(
                <Loading/>
            )
        }
    }
    return(
        <div style = {{fontFamily : '_Regular', margin:'100px'}}>
            <button 
                onClick={()=>history.goBack()}
                style = {{position:'absolute', top:'50px', left: '50px', fontSize:'28px'}}
            >ß</button>
            <div style = {{border : 'solid 1px #AAA', width:'350px', padding:'30px', borderRadius:'50%'}}>
                <p style={{fontFamily:'_Semibold', fontSize:'20px', margin:'0px 0px 8px 0px'}}>{id}</p>
                <a href={`mailto:${specific?.email}`} >
                    {specific?.email}
                </a>
            </div>
            <ListOfMixes/>
        </div>
    )
}
export default Profile 