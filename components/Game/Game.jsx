import { useCallback, useEffect, useRef, useState } from "react";
import { GameEngine } from "react-native-game-engine";

import {Text, useWindowDimensions, StyleSheet} from "react-native";

import { Sprite } from "../Sprite/Sprite";
import { ControlBox } from "../ControllBox/ControlBox";

import { generateTarget } from "../../service/generateTargets";
import { options } from "../../service/options";


import backGround from "../../images/background.jpg"
import targetImage from "../../assets/Vector.png"

const style = StyleSheet.create({
    button: {
        paddingLeft: 20
    },
    Game: {
        height: options.viewportHeight,
        backgroundColor: "blue",
        flex: null,
        position: "relative",
    }
})

const viewportMove = (entities = [], {events}) => {
    
    events.forEach(item => {
        if(item.type === "leftMove" || item.type === "releaseRight"){
            entities.map(item => {
                item.moveSpeedX += options.rotationSpeed;
                return item;
            })
        }
        else if(item.type === "releaseLeft" || item.type === "rightMove"){
            entities.map(item => {
                item.moveSpeedX -= options.rotationSpeed;
                return item;
            })
        }
    })
    entities.map(item => {
        item.x += item.moveSpeedX;
        if(item.type === "3000Back"){
            if(item.x > 0){
                item.x = 0;
            }
            else if(options.gameFieldWidth < item.x * -1 + options.viewportWidth){
                item.x = (options.gameFieldWidth - options.viewportWidth) * -1;
            }
        }
        return item;
    })
    return entities
}

export const Game = () => {
    const {width, height} = useWindowDimensions();
    options.viewportWidth = width;
    const engine = useRef(null);
    const onLeft = () => {
        engine.current.dispatch({type: "leftMove"})
        return true;
    }
    const onRight = () => {
        engine.current.dispatch({type: "rightMove"})
        return true;
    }
    const onReliseLeft = () => {
        engine.current.dispatch({type: "releaseLeft"})
    }
    const onReliseRight = () => {
        engine.current.dispatch({type: "releaseRight"})
    }
    const onFire = () => {
        
    }
    return <>    
        <GameEngine
            ref={(ref) => engine.current = ref}
            style={[style.Game, {width: width}]}
            entities={
                [
                    {
                        type: "3000Back",
                        x: -1500, 
                        y: 0, 
                        width: options.gameFieldWidth, 
                        moveSpeedX: 0,
                        height: options.viewportHeight, 
                        backgroundImage: backGround,
                        renderer: <Sprite/>
                    }
                ]
            }
            systems={[viewportMove]}
        /> 
        <ControlBox onLeft={onLeft} onRight={onRight} onFire={onFire} onReliseLeft={onReliseLeft} onReliseRight={onReliseRight}/>  
    </>
}

