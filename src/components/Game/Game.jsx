import { GameStyled } from "./Game.styled";
import { Sprite } from "../Sprite/Sprite";
import { useEffect, useRef, useState } from "react";


const tick = new Event("tick")

export const Game = () => {
    const isStarted = useRef(false);
    const [spriteMoveSpeed,setSpriteMoveSpeed] = useState(0);
    const keyDown =  e =>{
        console.log(e.key);
        if(e.key === "a"){
            setSpriteMoveSpeed(-2)
        }
        else if(e.key === "d"){
            setSpriteMoveSpeed(2)
        }
    };
    const keyUp =  e =>{
        if(e.key === "a"){
            setSpriteMoveSpeed(0)
        }
        else if(e.key === "d"){
            setSpriteMoveSpeed(0)
        }
    };
    useEffect(() => {
        if(isStarted.current){
            return;
        }
        isStarted.current = true;
        setInterval(() => {
            document.dispatchEvent(tick);
        }, 1000);
        document.addEventListener("keypress", keyDown);
        document.addEventListener("keyup", keyUp);
    }, []);

    
    return <GameStyled width={300} height={600}>
        <Sprite width={50} height={30} x={10} y={40} moveSpeed={spriteMoveSpeed}/>
    </GameStyled>
}