import { GameStyled } from "./Game.styled";
import { Sprite } from "../Sprite/Sprite";
import { useEffect, useRef, useState } from "react";


const tick = new Event("tick")

export const Game = () => {
    const isStarted = useRef(false);
    const [spriteMoveSpeed, setSpriteMoveSpeed] = useState(0);
    const [yPos] = useState(0);
    const [xPos, setXPos] = useState(10);
    const keyDown =  e =>{
        if(e.repeat){
            return;
        }
        if(e.key === "a"){
            setSpriteMoveSpeed(-5);
        }
        else if(e.key === "d"){
            console.log(e);
            setSpriteMoveSpeed(5);
        }
    };
    const keyUp =  e =>{
        console.log("released");
        setSpriteMoveSpeed(0)
    };

    useEffect(() => {
        isStarted.current = true;
        const tickHendler = () => {
            setXPos(prev => {
                const result = prev + spriteMoveSpeed;
                if(result >= 0){
                    return 0;
                }
                if(Math.abs(result - 300) > 3000){
                    return -2700;
                }
                return result;
            });
        }
        document.addEventListener('keydown', keyDown);
        document.addEventListener('keyup', keyUp);
        document.addEventListener('tick', tickHendler);
        isStarted.current = true;

        return () => {
            document.removeEventListener('tick',tickHendler)
            document.removeEventListener('keydown', keyDown);
            document.removeEventListener('keyup', keyUp);
        }

    }, [spriteMoveSpeed])

    useEffect(() => {
        isStarted.current = false;
        setInterval(() => {
            document.dispatchEvent(tick);
        }, 32);
    },[])
    
    return <GameStyled width={300} height={600}>
        <Sprite width={3000} height={600} x={xPos} y={yPos} moveSpeed={spriteMoveSpeed}/>
    </GameStyled>
}