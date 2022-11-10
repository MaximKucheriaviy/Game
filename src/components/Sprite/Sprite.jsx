import styled from "styled-components"

const SpriteStyled = styled.div`
    position: absolute;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    top: ${props => props.y}px;
    left: ${props => props.x}px;
    background-color: red;
`

export const Sprite = ({width, height, x, y}) => {
    return <SpriteStyled width={width} height={height} x={x} y={y}>

    </SpriteStyled>
} 