import { GameStyled } from "./Game.styled";
import { Sprite } from "../Sprite/Sprite";
import { useEffect, useRef, useState } from "react";
import backGround from "../../images/background.jpg"
import { generateTarget } from "../../service/generateTargets";

const tick = new Event("tick")
const tergetGeneration = new Event("tergetGeneration")

export const Game = () => {
    const isStarted = useRef(false);
    const [spriteMoveSpeed, setSpriteMoveSpeed] = useState(0);
    const [yPos] = useState(0);
    const [xPos, setXPos] = useState(-1500);
    const [targets, setTargets] = useState([]);

    const keyDown =  e =>{
        if(e.repeat){
            return;
        }
        if(e.key === "a"){
            setSpriteMoveSpeed(-10);
        }
        else if(e.key === "d"){
            console.log(e);
            setSpriteMoveSpeed(10);
        }
    };
    const keyUp =  e =>{
        console.log("released");
        setSpriteMoveSpeed(0)
    };

    useEffect(() => {
        const tickHendler = () => {
            setXPos(prev => {
                const result = prev + spriteMoveSpeed;
                if(result >= 0){
                    return 0;
                }
                if(Math.abs(result) + 300 > 3000){
                    return -2700;
                }
                return result;
            });
        }
        const targetGenerationHendler = () => {
            if(targets.length > 5){
                return;
            }
            setTargets(prev => [...prev, generateTarget(50, 50)]);
        }
        document.addEventListener('keydown', keyDown);
        document.addEventListener('keyup', keyUp);
        document.addEventListener('tick', tickHendler);
        document.addEventListener('tergetGeneration', targetGenerationHendler);
        return () => {
            document.removeEventListener('tick',tickHendler)
            document.removeEventListener('keydown', keyDown);
            document.removeEventListener('tergetGeneration', targetGenerationHendler);
        }

    }, [spriteMoveSpeed, targets.length])

    useEffect(() => {
        isStarted.current = false;
        setInterval(() => {
            document.dispatchEvent(tick);
        }, 32);
        setInterval(() => {
            document.dispatchEvent(tergetGeneration);
        }, 5000);
    },[])
    
    return <GameStyled width={300} height={600}>
        <Sprite width={3000} height={600} x={xPos} y={yPos} backgroundImage={backGround}/>
        <Sprite width={20} height={20} x={300 / 2 - 20 / 2} y={30}/>;
        {targets.map(item => <Sprite 
                                width={item.width} 
                                height={item.height} 
                                x={xPos + item.xPos} 
                                y={yPos + item.yPos}
                                color="blue"
                            />)}
    </GameStyled>
}