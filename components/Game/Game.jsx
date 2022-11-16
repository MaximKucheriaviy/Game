import { useCallback, useEffect, useRef, useState } from "react";
import { GameEngine } from "react-native-game-engine";

import {Text, useWindowDimensions, StyleSheet} from "react-native";

import { Sprite } from "../Sprite/Sprite";
import { ControlBox } from "../ControllBox/ControlBox";

import { options } from "../../service/options";
import { genereateStartEntitis } from "../../service/genereateStartEntitis";
import { viewportMove } from "../../systems/viewportMove";
import { weaponMove } from "../../systems/weaponMove";
import { pigGenerator } from "../../systems/pigGenerator";
import { missyleLifecycle } from "../../systems/missyleLifecycle";




const style = StyleSheet.create({
    button: {
        paddingLeft: 20
    },
    Game: {
        height: options.viewportHeight,
        backgroundColor: "blue",
        flex: null,
        position: "relative",
        // overflow: "hidden",
    }
})



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
        engine.current.dispatch({type: "fire"})
    }

    useEffect(() => {
        const id = setInterval(() => {
            engine.current.dispatch({type: "generatePigs"})
        }, 1000)
        return () => {
            clearInterval(id);
        }
    }, [])


    return <>    
        <GameEngine
            ref={(ref) => engine.current = ref}
            style={[style.Game, {width: width}]}
            entities={genereateStartEntitis()}
            systems={[viewportMove, pigGenerator, missyleLifecycle, weaponMove]}
        /> 
        <ControlBox onLeft={onLeft} onRight={onRight} onFire={onFire} onReliseLeft={onReliseLeft} onReliseRight={onReliseRight}/>  
    </>
}

