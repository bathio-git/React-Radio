import styled from "styled-components";
import { Link } from "react-router-dom";

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
    border: white 1px solid;
    margin-top: 10%;
    //padding: 5%;
    display: block;
`
export const SquareRed = styled.div`
   // border: #333 1px solid;
    height: 600px;
    //padding: 5%;
    margin-left: 0%;
`
export const Up = styled.div`
`
export const Titre = styled.p`
    font-family: _Semibold;
`
export const RadioLink = styled(Link)`
    text-decoration: none;
    display: block;
    margin-left: 5%;
    margin-bottom: 2%;
    font-family: _Regular;
    transform: scale(1.25);
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
export const Animate = styled.p`
    margin-left:5%;
    font-family: _Medium;
    margin-bottom: 2%;
    font-size: 14px;
`
export const Bouton1 = styled.button`
    height: 50px;
    width: 50px;
    font-size: 24px;
    //border: red 1px solid;
`
export const Bouton2 = styled.button`
    position: relative;
    top : -4px;
    left: 0px;
    height: 60px;
    text-align: right;
    width: 350px;
    font-family: _Regular;
`
export const Bouton3 = styled.button` 
    height: 50px;
    width: 50px;
    font-family: _Regular;
    font-size: 24px;
    //border: red 1px solid;
`
export const Bouton4 = styled.button`
    position: relative;
    top : -5px;
    left:  5px;
    width: 18px;
    //height: 50px;
    font-size: 14px;
    //border-left: #aaa 2px solid;
    //border-radius: 50%;
    font-family: _Semibold;
`
export const Bouton5 = styled.button`
    position: relative;
    top : -7px;
    left:  -55px;
    width: 18px;
    //height: 50px;
    font-size: 14px;
    //border-left: #aaa 2px solid;
    //border-radius: 50%;
    font-family: _Semibold;
`
/* UX Draft


    function defaultFocus() {
        document.getElementById("0").focus();
    } 
    //defaultFocus();

    //document.onkeydown = function(event) 
       // { console.log(event.key) }
    
       */