import styled from "styled-components/native"
import { ImageBackground, Text, View } from "react-native";
// import { useEffect, useState, useRef } from "react"
import { options } from "../../service/options";

const image = { url:"./background.jpg"};

const SpriteStyled = styled.ImageBackground`
    position: absolute;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    top: ${props => props.y}px;
    left: ${props => props.x}px;
    background-image: url(${'./background.jpg'});
    background-size: cover;
    background-repeat: no-repeat;
    background-color: ${props => props.color || "red"};
    transform: scaleX(${props => {
            if(props.moveTurn === 0){
                return -1;
            }
            return 1;
        }
    });
`

export const Sprite = ({width, height, x, y, backgroundImage, color, moveTurn, type}) => {
    return <>
        {((x > -50 && x < options.viewportWidth + 50)) && 
        <SpriteStyled 
        source={backgroundImage} 
        x={x} 
        y={y} 
        width={width} 
        height={height} 
        color={color} 
        moveTurn={moveTurn}>
        </SpriteStyled>}
    </>
} 