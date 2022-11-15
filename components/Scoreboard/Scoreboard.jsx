import { Text, View } from "react-native"
import styled from "styled-components/native"

const ScoreboardStyled = styled.View`
    border: 2px solid white;
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    min-width: 100px;
`

const ScoreboardText = styled.Text`
    font-size: 20px;
    color: white;
    text-align:center;
`

export const Scoreboard = ({Score}) =>{
    return <>
        <ScoreboardStyled>
            <ScoreboardText>{Score}</ScoreboardText>
        </ScoreboardStyled>
    </>
}