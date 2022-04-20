import styled from "styled-components";
import { Link } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";


////////////////////////////////////////////
function RadioLink (props)
{
    let ref = useRef(null);

    useEffect(() => { //document.getElementById(focused).focus()
        if (props.focused === props.index ) 
            {ref.current.focus() } 
    }, [props.focused]); 

    return(
        <StyledLink ref={ref} to= {`/r/${props.index}/`} >{`--> ${props.name}`}</StyledLink>
    )
}
export default RadioLink
////////////////////////////////////////////

let StyledLink = styled(Link)`
    text-decoration: none;
    display: block;
    margin-left: 5%;
    margin-bottom: 2%;
    font-family: _Regular;
    color: #aaa;
    transition: margin-left 200s;
    &:hover { color: #2f5869;margin-left: 9%;}
    &:focus {
        color: #2f5869;margin-left: 9%;  //background-color: yellow;
        //border-color: black;
        outline: none;
}
`