import styled from "styled-components/native"


export const GameStyled = styled.View`
    margin-top: 50px;
    position: relative;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    border: 2px solid black;
    overflow: hidden;
`


