import styled from "styled-components"
// import { useEffect, useState, useRef } from "react"
import backGround from "../../images/background.jpg"

const SpriteStyled = styled.div`
    position: absolute;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    top: 0px;
    left: 0px;
    background-image: url(${backGround});
    background-size: cover;
    background-repeat: no-repeat;
    background-color: red;

`

export const Sprite = ({width, height, x, y, backgroundImage}) => {
        
    return <SpriteStyled style={{transform: `translate(${x}px, ${y}px)`}} width={width} height={height} backgroundImage = "./background.jpg">

    </SpriteStyled>
} 