import { GameStyled } from "./Game.styled";
import { Sprite } from "../Sprite/Sprite";
import { useEffect, useState } from "react";


export const Game = () => {
    const [val, setVal] = useState(100);
    useEffect(() => {
        setInterval(() => {
            setVal(Math.random());
        }, 30);
    }, []);
    
    return <GameStyled val={val} width={300} height={600}>
        <Sprite width={50} height={30} x={10} y={40}/>
    </GameStyled>
}