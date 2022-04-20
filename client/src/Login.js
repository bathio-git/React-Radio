import styled from "styled-components"
import { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"
import { AppContext } from "./AppContext"
import {useHistory} from 'react-router-dom';


function Login ()
{
    let { names, slogans, streams, streamsType, radioUrl, currentUser, setCurrentUser  } = useContext(AppContext)

    let [userName, setUserName] = useState('')
    let [password, setPassword] = useState('')

    let [ usersNames, setUserNames ] = useState(null)

    let history = useHistory();

    async function arrayOfPossibleUsers ()
    {
        let response = await fetch(`/getAllUser`)
        let data = await response.json()
        let array =  await data.data.map( element => {return element.obj.username })
        //console.log(array)
        await setUserNames(array)
        await console.log(usersNames)
    }

    useEffect( arrayOfPossibleUsers, []); 

    function submit(event)
    {
        event.preventDefault()

        if(usersNames.includes(userName))
        {
            let userInfo =
            {
                'username' : userName,
                "password" : password,
            }
        
    
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    user: userInfo,
                })
            }

            console.log(requestOptions)
            fetch("/login", requestOptions)
            .then((res) => res.json())  
            .then((data) => { setCurrentUser(data.data.obj.username) })  
            .then(()=> { history.push(`/`) })    
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
                <h1>login</h1>
                <form>
                    < TextInput type={"text"} placeholder={"username"} required autoComplete="true"
                        onChange = {(ev) => setUserName(ev.target.value)}
                        style = {{height : '20px', fontFamily : '_Regular'}}
                    />
                    < TextInput type={"password"} placeholder={"password"} required autoComplete="true"
                        onChange = {(ev) => setPassword(ev.target.value)}
                        style = {{height : '20px', fontFamily : '_Regular'}}
                    />
                    <Button type="submit" value=" --> connect" onClick={submit} />
                    <br/> 
                    <Link to= {'/1rstTime'} >{`new user <--`}</Link>
                </form>
                <div id='message' style={{display:'none'}}>
                    <p style={{ margin:'10px', fontSize:'14px', overflow: 'visible'}}> unknown user </p>
                    <Link to= {'/1rstTime'} >{`new user <--`}</Link>
                </div>
            </div>
        </div>
    )
}
export default Login;

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