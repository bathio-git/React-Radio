import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import { useContext, useCallback } from "react";
import {useHistory} from 'react-router-dom';
import {Page, SquareRed, Titre, RadioLink, Animate, Bouton1, Bouton2, Bouton3, Bouton4, Bouton5 } from './homeStyle'
//import U from "./U";

function Home()
{
    let [focused, setFocused] = useState(0)
    let { names, slogans,  currentUser, setCurrentUser  } = useContext(AppContext)
    let history = useHistory();

    useEffect(() => { document.getElementById(focused).focus()}, [focused]); // console.log(focused); 

    /// up--- down --- luck
    let up = () => { focused > 0 ? setFocused(focused - 1) : setFocused(14) }
    let down =  () => { focused < 14 ? setFocused(focused + 1) : setFocused(0) }
    
    let luck =  () => { 
        let i = Math.floor(Math.random() * (12 + 1))
        history.push(`/stream/${i}/`)
    }

    function RadioList () {
        let xyz = names.map( (name, index) => {
                return  <RadioLink key={`${index}${name}`} id={index} to= {`/stream/${index}/`} >{`--> ${name}`}</RadioLink>
            })
            return xyz
    }

    function Display () {
        if (focused < 13) {
            return (
                <Link to= {`/stream/${focused}/`} >
                    <Bouton2  style={{fontSize:'13px'}}>{slogans[focused]}</Bouton2> 
                </Link>
            )
        } else if ( focused === 13) {
            return (
                <Link to= {`/mixes`} >
                    <Bouton2  style={{fontSize:'13px'}}>{'ﾉ*_^'}</Bouton2> 
                </Link>
            )
        } else {
            if(currentUser) {
                return( 
                    <Link to= {`/profile/${currentUser}`} >
                        <Bouton2  style={{fontSize:'13px'}}>{'ﾉ^_*'}</Bouton2> 
                    </Link>
                )
            } else {
                return(
                    <Link to= {`/connect`} >
                        <Bouton2  style={{fontSize:'13px'}}>{'ﾉ^_*'}</Bouton2> 
                    </Link>
                )
            }
        }
    }

    function U () {
        if(currentUser) {
            return( <RadioLink id={'14'} to={`/profile/${currentUser}`} style={{fontSize:'15px' }}>{`--> ${currentUser}`}</RadioLink> )
        }
        else{
            return(
                <div>
                    <RadioLink id={'14'} to={`/connect`} style={{fontSize:'15px' }}> {`--> connect`}</RadioLink>
                </div>
            )
        }
    }

    function Disconnect (){
        if (currentUser !== null){
            return (
                <div style={{marginLeft:'-100px'}} >
                    <Bouton5 type="button" onClick={ () => setCurrentUser(null) }  style={{fontSize:'14px', display:'relative', marginLeft:'-50px'}}> disconnect </Bouton5>
                </div>
            )
        }
        else return <div></div> 
    }
//<p>&nbsp;</p>

    return(
        <Page style={{zoom: '130%', display:'flex', flexDirection:'column'}}>
            
                <div>
                    <SquareRed>
                    
                    <div style={{display:'block'}}>
                    <Bouton1 onClick={up}>&#129045;</Bouton1>
                    <Display/> 
                    </div>
                    <div style={{display:'flex', gap:'10px'}}>
                    <Disconnect/>
                    <Titre>{`(ﾉ^_^) -->`}</Titre>
                    <Bouton4 onClick={luck}>luck</Bouton4>
                    </div>
                        <RadioList/>
                        <RadioLink id={13} to= {`/mixes/`} > {'--> mix∑s'} </RadioLink>
                        <U/>
                        
                        <div className='container'>
                            <Animate className='typed-out'>available audio streams</Animate>
                            <Bouton3 onClick={down}>&#129047;</Bouton3>
                        </div>
                    </SquareRed>
                </div>
                
        </Page>
    )
}
export default Home;

//// TO DO ---> animations for the luck !  + keyboard navigations

/* UX Draft


    function defaultFocus() {
        document.getElementById("0").focus();
    } 
    //defaultFocus();

    //document.onkeydown = function(event) 
       // { console.log(event.key) }
    
       */