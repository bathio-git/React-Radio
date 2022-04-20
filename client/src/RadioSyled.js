import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Page = styled.div`
    max-width: 100vw;
    max-height: 100vh;
    display: flex; align-items: center; justify-content: center; flex-direction: column;
    font-family: _Regular;
    color: #aaa;
    padding: 2%;
`
export const Square = styled.div`
    width: 600px;
    height: 600px;
    //border: white 1px solid;
    margin-top: 5%;
    //padding: 5%;
`
export const SquareRed = styled.div`
    //border: red 1px solid;
    margin: 10%;
    //padding: 5%;
    display: flex;
    flex-direction: column;
    justify-content: left;
`
export const Up = styled.div`
`
export const Titre = styled.p`
    font-family: _Semibold;
`
export const RadioLink = styled(NavLink)`
    margin-left: 5%;
    margin-bottom: 2%;
    font-family: _Regular;
`
export const Animate = styled.p`
    margin-left:5%;
    font-family: _Medium;
    margin-bottom: 2%;
`

export const Bouton1 = styled.button`
    position: relative;
    top : -4px;
    left: -2px;
    height: 50px;
    width: 50px;
    font-size: 24px;
    //border: red 1px solid;
`
export const Bouton2 = styled.button`
    position: relative;
    top : -4px;
    left: 193px;
    height: 60px;

    text-align: right;
    width: 350px;
    font-family: _Regular;
    
`
export const Bouton3 = styled.button`
    position: relative;
    top : 147px;
    left: -2px;
    height: 50px;
    width: 50px;
    font-family: _Regular;
    font-size: 24px;
    //border: red 1px solid;
`
export const Bouton4 = styled.button`
    position: relative;
    top : 12px;
    left: 494px;
    height: 50px;
    height: 50px;
    width: 50px;
    //border: red 1px solid;
`
export const Bouton = styled.button`

`
export const Video = styled.video`
    width: 100%;
    height: 30px;
    object-fit: cover;
    z-index: -100;
    -webkit-filter: invert(100%);
    filter: invert(100%);
`


