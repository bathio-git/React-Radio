import { useState } from "react";
import styled from "styled-components";

function Textarea (props)
{
    return (<>
        <TextSpace 
            placeholder="comment" 
            maxLength="240"
            value={props.comment}
            onChange={(e) => props.setComment(e.currentTarget.value) }
        />
        </>
    )

} 
        export default Textarea;

// ∂  


let TextSpace = styled.textarea`
    width : 400px;
    height : 200px;
    padding : 1%;
    margin : 1%;
    background-color: black;
    color: #aaa;
    box-sizing : border-box;
    border : 1px solid #aaa;
    border-style : solid none none solid;
    border-radius : 1px;
    font-size : 16px;
    resize : none;
    font-family : _Regular; font-size: 110%;
    margin-bottom : 30px;
    &:focus{outline: none;}
`