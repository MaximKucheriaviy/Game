import { useCallback, useEffect, useRef, useState } from "react";

import {Text, useWindowDimensions} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import EventEmitter from "react-native-eventemitter";

import { Sprite } from "../Sprite/Sprite";
import { Missile } from "../Missile/Missile";

import { generateTarget } from "../../service/generateTargets";
import { options } from "../../service/options";

import { GameStyled, ControlBox, ControlButton } from "./Game.styled";

import backGround from "../../images/background.jpg"

const style = EStyleSheet.create({
    button: {
        paddingLeft: 20
    }
})



export const Game = () => {
    const isStarted = useRef(false);
    const [spriteMoveSpeed, setSpriteMoveSpeed] = useState(0);
    const [yPos] = useState(0);
    const [xPos, setXPos] = useState(-1500);
    const [targets, setTargets] = useState([]);
    const [missileFired, setMissileFired] = useState(false);
    const [missileStartPosition, setMissileStartPosition] = useState(0);
    const {height, width} = useWindowDimensions();
    options.viewportWidth = width;

    const weponWidth = 20;
    const weponHeight = 20;
    const weponXPosition = options.viewportWidth / 2 - weponWidth / 2;
    const weponYPosition = 30;

    const onLeft = () => {
        setSpriteMoveSpeed(options.rotationSpeed);
    }
    const onRight = () => {
        setSpriteMoveSpeed(options.rotationSpeed * -1);
    }
    const onRelise = () => {
        setSpriteMoveSpeed(0);
    }
    const onFire = () => {
        if(!missileFired){
            setMissileStartPosition(xPos)
            setMissileFired(true);
        }
    }

    const tickHendler = useCallback(() => {
        setXPos(prev => {
            const result = prev + spriteMoveSpeed;
            if(result >= 0){
                return 0;
            }
            if(Math.abs(result) + options.viewportWidth > options.gameFieldWidth){
                return (options.gameFieldWidth - options.viewportWidth) * -1;
            }
            return result;
        });
    }, [spriteMoveSpeed]);

    const targetGenerationHendler = useCallback(() => {
        if(targets.length > 5){
            return;
        }
        setTargets(prev => [...prev, generateTarget(50, 50, prev)]);
    }, [targets.length]);

    useEffect(() => {
        EventEmitter.on('tick', tickHendler);
        EventEmitter.on('tergetGeneration', targetGenerationHendler);
        return () => {
            EventEmitter.removeListener('tick',tickHendler)
            EventEmitter.removeListener('tergetGeneration', targetGenerationHendler);
        }

    }, [tickHendler, targetGenerationHendler])

    useEffect(() => {
        isStarted.current = false;
        const tickIntervalId = setInterval(() => {
            EventEmitter.emit('tick');
        }, 16);
        const TDIntervalID = setInterval(() => {
            EventEmitter.emit('tergetGeneration');
        }, 1000);
        return () => {
            clearInterval(tickIntervalId);
            clearInterval(TDIntervalID);
        }
    },[])
    
    return <>
        <GameStyled width={options.viewportWidth} height={options.viewportHeight}>
            <Sprite width={options.gameFieldWidth} height={options.viewportHeight} x={xPos} y={yPos} backgroundImage={backGround}/>
            <Sprite width={weponWidth} height={weponHeight} x={weponXPosition} y={weponYPosition}/>
            {targets.map((item, index) => <Sprite 
                                key={index}
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
        <ControlBox>
            <ControlButton onPressIn={onLeft} onPressOut={onRelise}>
                <Text>Left</Text>
            </ControlButton>
            <ControlButton onPressIn={onFire}>
                <Text>FIRE</Text>
            </ControlButton>
            <ControlButton onPressIn={onRight} onPressOut={onRelise}>
                <Text>Right</Text>
            </ControlButton>
        </ControlBox>
        
    </>
}

