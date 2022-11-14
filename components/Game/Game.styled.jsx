import styled from "styled-components/native"


export const GameStyled = styled.View`
    margin-top: 50px;
    position: relative;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    border: 2px solid black;
    overflow: hidden;
`

export const ControlBox = styled.View`
    width: 300px;
    flex-direction: row;
    justify-content: space-between;
`
export const ControlButton = styled.TouchableOpacity`
    background-color: gray;
    padding: 20px;
    display: flex;
`