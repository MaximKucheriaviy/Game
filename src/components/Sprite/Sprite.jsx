import styled from "styled-components"
import { useEffect, useState, useRef } from "react"

const SpriteStyled = styled.div`
    position: absolute;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    top: 0px;
    left: 0px;

    background-color: red;
`

export const Sprite = ({width, height, x, y, moveSpeed}) => {
    const [widthState] = useState(width);
    const [heightState] = useState(height);
    const [xState, setX] = useState(x);
    const [yState] = useState(y);
    const prevUpdate = useRef(Date.now());
    const suspenser = 10;

    useEffect(() => {
        setInterval(() => {
            const delay = Date.now() - prevUpdate.current;
            prevUpdate.current = Date.now();
            setX(prev => {
                if(delay === 0){
                    return prev;
                }
                return prev + (Math.ceil(moveSpeed * delay / suspenser));
            });
        }, 10);
    }, [moveSpeed])
    
    
    return <SpriteStyled style={{transform: `translate(${xState}px, ${yState}px)`}} width={widthState} height={heightState} x={xState} y={yState}>

    </SpriteStyled>
} 