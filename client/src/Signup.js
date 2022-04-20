import styled from "styled-components";
import { useState } from "react";
import {useHistory} from 'react-router-dom';


function Signup ()
{
    let [userName, setUserName] = useState('')
    let [password, setPassword] = useState(null)
    let [cPassword, setCPassword] = useState(null)
    let [ email, setEmail] = useState('')

    let history = useHistory();


    function submit(event)
    {
        event.preventDefault()

        if ( password === cPassword && password !== null)
        {
            let userInfo =
            {
                'username' : userName,
                "password" : password,
                "email" : email
            }
            console.log(userInfo)

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    user: userInfo,
                })
            }

            console.log(requestOptions)
            fetch("/newuser", requestOptions)

            let i = document.getElementById('message')
            i.style.display= 'block'
            i.textContent = `welcome ${userName}`;

            setTimeout(() => { history.push(`/`) }, 3000);
        }
        else
        {
            let i = document.getElementById('message')
            i.style.display= 'block'
        }
    }
    
    return(
        <div style = {{width:'230px', margin:'10%', zoom: '150%'}}>
            <button 
                onClick={()=>history.goBack()}
                style = {{position:'absolute', top:'50px', left: '50px', fontSize:'28px'}}
            >ß</button>
            <div 
                style = {{display: 'flex', flexDirection: 'column', gap: '20px', fontFamily : '_Regular'}}>
                <h1>create account</h1>
                <form>
                    < TextInput type={"email"} placeholder={"email"} required autoComplete="true"
                        onChange = {(ev) => setEmail(ev.target.value)}
                        style = {{height : '20px', fontFamily : '_Regular'}}
                    />
                    < TextInput type={"text"} placeholder={"username"} required autoComplete="true"
                        onChange = {(ev) => setUserName(ev.target.value)}
                        style = {{height : '20px', fontFamily : '_Regular'}}
                    />
                    < TextInput type={"password"} placeholder={"password"} required autoComplete="true"
                        onChange = {(ev) => setPassword(ev.target.value)}
                        style = {{height : '20px', fontFamily : '_Regular'}}
                    />
                    < TextInput type={"password"} placeholder={"confirm password"} required autoComplete="true"
                        onChange = {(ev) => setCPassword(ev.target.value)}
                        style = {{height : '20px', fontFamily : '_Regular'}}
                    />
                    <Button type="submit" value="submit" onClick={submit}/>
                </form>
                <p id='message' style={{display:'none', margin:'10px', fontSize:'14px'}}> passwords don't match </p>
            </div>
        </div>
    )
}
export default Signup;

const TextInput = styled.input`
    background-color: black;
    color: #aaa;
    border: none ;
    margin: 3% 1%;
    padding: 1%;
    font-size: 100%;
    border-width: 0px 0px 1px 0px; /* top right bottom left */
    border-style: none none groove none;
    border-color: #000 #000 #aaa #000;
    &:hover {color: white;}
    &:focus {color: white; outline:none; border-color: white}
`

const Button =  styled.input`
    border: none;
    text-align: center;
    padding: 0px 0px;
    
    font-size: 14px;
    margin: 20px 40px;
    transition-duration: 0.1s;
    cursor: pointer;
    font-family: _Regular;
    background-color: black;
    color:rgb(170,170,170);

    &:hover {
    background-color: black;
    color: white;
    text-decoration: overline;
    }
`
/*

-- auth 0  --> sign up with google 
-- encript the password in the backend === hashing password with Bcrypt

*/