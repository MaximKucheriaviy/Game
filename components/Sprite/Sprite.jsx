import styled from "styled-components/native"
import { ImageBackground, Text, View } from "react-native";
// import { useEffect, useState, useRef } from "react"
import { options, } from "../../service/options";

const image = { url:"./background.jpg"};



export const Sprite = ({width, height, body, backgroundImage, color, moveTurn, type}) => {
    return <ImageBackground
    source={backgroundImage}
    style={{
        width,
        height,
        position: "absolute",
        top: body.position.y,
        left: body.position.x,
        backgroundColor: color,
    }
    }>

    </ImageBackground>
} 
