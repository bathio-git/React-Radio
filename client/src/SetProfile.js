import styled from "styled-components";
import { useState } from "react";

function SetProfile ()
{
    let [pers1, setPers1] = useState('')
    let [pers2, setPers2] = useState('')

    // pers type [ text, photo, 10sec video, link, audio ]

    function submit()
    {
        /*
        let userInfo =
            {
                'username' : userName,
                "password" : password,
                "email" : email
            }
        console.log(userInfo)*/
    }
    return(
        <div style = {{width:'230px', margin:'10%'}}>
            <div >
                <button onClick={submit} >submit </button>
            </div>
        </div>
    )
}
export default SetProfile;

const TextInput = styled.input`
    background-color: black;
    color: #aaa;
    border: none ;
    margin: 1%;
    padding: 1%;
    font-size: 100%;
    border-width: 0px 0px 1px 0px; /* top right bottom left */
    border-style: none none groove none;
    border-color: #000 #000 #aaa #000;
    &:hover {color: white;}
    &:focus {color: white; outline:none; border-color: white}
`