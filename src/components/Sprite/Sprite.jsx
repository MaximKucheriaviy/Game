import styled from "styled-components"
// import { useEffect, useState, useRef } from "react"


const SpriteStyled = styled.div`
    position: absolute;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    top: 0px;
    left: 0px;
    background-image: url(${props => props.backgroundImage});
    background-size: cover;
    background-repeat: no-repeat;
    background-color: ${props => props.color || "red"};

`

export const Sprite = ({width, height, x, y, backgroundImage, color}) => {
        
    return <SpriteStyled style={{transform: `translate(${x}px, ${y}px)`}} width={width} height={height} backgroundImage = {backgroundImage} color={color}>

    </SpriteStyled>
} 