import { useCallback, useEffect, useRef, useState } from "react";
import { GameEngine } from "react-native-game-engine";

import {Text, useWindowDimensions, StyleSheet} from "react-native";

import { Sprite } from "../Sprite/Sprite";
import { ControlBox } from "../ControllBox/ControlBox";

import { generateTarget } from "../../service/generateTargets";
import { options } from "../../service/options";
import { genereateStartEntitis } from "../../service/genereateStartEntitis";
import { viewportMove } from "../../systems/viewportMove";
import { weaponMove } from "../../systems/weaponMove";



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
            entities={genereateStartEntitis()}
            systems={[viewportMove, weaponMove]}
        /> 
        <ControlBox onLeft={onLeft} onRight={onRight} onFire={onFire} onReliseLeft={onReliseLeft} onReliseRight={onReliseRight}/>  
    </>
}

