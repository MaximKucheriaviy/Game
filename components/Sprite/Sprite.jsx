import styled from "styled-components/native"
import { ImageBackground, Text } from "react-native";
// import { useEffect, useState, useRef } from "react"

const image = { url:"./background.jpg"};

const SpriteStyled = styled.ImageBackground`
    position: absolute;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    top: 0px;
    left: 0px;
    transform: translate(${props => props.x}px, ${props => props.y}px);
    /* background-image: url(${'./background.jpg'}); */
    background-size: cover;
    background-repeat: no-repeat;
    background-color: ${props => props.color || "red"};

`

export const Sprite = ({width, height, x, y, backgroundImage, color}) => {
 
    return <SpriteStyled source={backgroundImage} x={x} y={y} width={width} height={height} color={color}>
        </SpriteStyled>
} 