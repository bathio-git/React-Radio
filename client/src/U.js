import { useContext } from "react"
import { AppContext } from "./AppContext"
import { Link } from "react-router-dom"
import styled from "styled-components"

function U (props)
{
    if(props.currentUser){
        return( <RadioLink id={props.id} to={`/profile/${props.currentUser}`} style={{fontSize:'15px' }}>{props.currentUser}</RadioLink> )
    }

    else{
        return(
            <div>
                <RadioLink id={props.id} to={`/connect`} style={{fontSize:'15px' }}> {`--> connect`}</RadioLink>
            </div>
        )
    }
}
export default U

export const RadioLink = styled(Link)`
    text-decoration: none;
    display: block;
    margin-left: 5%;
    margin-bottom: 2%;
    font-family: _Regular;
    //transform: scale(1.25);
    color: #aaa;
    transition: margin-left 200s;
    text-decoration: none;
    &:hover { color: #2f5869;margin-left: 9%; text-decoration: none;}
    &:focus {
        color: #2f5869;margin-left: 9%;  //background-color: yellow;
        //border-color: black;
        outline: none;
        text-decoration: none;
}
`