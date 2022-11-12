import { GameStyled } from "./Game.styled";
import { Sprite } from "../Sprite/Sprite";
import { useCallback, useEffect, useRef, useState } from "react";
import backGround from "../../images/background.jpg"
import { generateTarget } from "../../service/generateTargets";
import { options } from "../../service/options";
import { Missile } from "../Missile/Missile";

const tick = new Event("tick")
const tergetGeneration = new Event("tergetGeneration")
const weponWidth = 20;
const weponHeight = 20;
const weponXPosition = options.viewportWidth / 2 - weponWidth / 2;
const weponYPosition = 30;

export const Game = () => {
    const isStarted = useRef(false);
    const [spriteMoveSpeed, setSpriteMoveSpeed] = useState(0);
    const [yPos] = useState(0);
    const [xPos, setXPos] = useState(-1500);
    const [targets, setTargets] = useState([]);
    const [missileFired, setMissileFired] = useState(false);
    const [missileStartPosition, setMissileStartPosition] = useState(0);
//// test comment
    const keyDown = useCallback(e =>{
        if(e.repeat){
            return;
        }
        if(e.key === "d"){
            setSpriteMoveSpeed(-10);
        }
        else if(e.key === "a"){
            setSpriteMoveSpeed(10);
        }
        else if(e.key === " " && !missileFired){
            e.preventDefault();
            setMissileStartPosition(xPos)
            setMissileFired(true);
        }
        
    }, [missileFired, xPos]);
    const keyUp =  e =>{
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
            setTargets(prev => [...prev, generateTarget(50, 50, prev)]);
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

    }, [spriteMoveSpeed, targets.length, keyDown])

    useEffect(() => {
        isStarted.current = false;
        setInterval(() => {
            document.dispatchEvent(tick);
        }, 16);
        setInterval(() => {
            document.dispatchEvent(tergetGeneration);
        }, 1000);
    },[])
    
    return <GameStyled width={options.viewportWidth} height={options.viewportHeight}>
        <Sprite width={options.gameFieldWidth} height={options.viewportHeight} x={xPos} y={yPos} backgroundImage={backGround}/>
        <Sprite width={weponWidth} height={weponHeight} x={weponXPosition} y={weponYPosition}/>;
        {targets.map(item => <Sprite 
                                key={item.id}
                                width={item.width} 
                                height={item.height} 
                                x={xPos + item.xPos} 
                                y={yPos + item.yPos}
                                color="blue"
                            />)}
        {missileFired && <Missile
                            x={weponXPosition}
                            y={weponYPosition}
                            xPos={xPos}
                            startPos={missileStartPosition}
                            remove={() => {setMissileFired(false)}}
                            targets={targets}
                            setTargets={setTargets}
                        />}
    </GameStyled>
}