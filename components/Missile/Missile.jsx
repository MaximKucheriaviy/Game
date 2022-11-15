import { Sprite } from "../Sprite/Sprite"
import EventEmitter from "react-native-eventemitter";
import { useEffect, useState, useCallback} from "react";
import { options } from "../../service/options";
import { getIntersection } from "../../service/generateTargets";

export const Missile = ({x, y, remove, xPos, startPos, targets, setTargets, setScore}) => {
    const width = 20;
    const height = 20;
    const color = "yellow";
    const [yPos, setYPos] = useState(y);

    const onTick = useCallback(() => {
        if(yPos > options.viewportHeight){
            remove();
            return;
        }
        const missileBlock = {
            x: x  + startPos * -1,
            width: width,
            y: yPos,
            height: height
        }
        for(let i = 0; i < targets.length; i++){
            const targetBloc = {
                x: targets[i].xPos,
                width: targets[i].width,
                y: targets[i].yPos,
                height: targets[i].height,
            }
            if(getIntersection(missileBlock, targetBloc)){
                setTargets(prev => {
                    return prev.filter((item, index) => index !== i);
                })
                setScore(prev => prev + 1);
                remove();
            }
        }
        setYPos(prev => prev + 5);
    }, [remove, setTargets, startPos, targets, x, yPos])

    useEffect(() => {
        EventEmitter.on("tick", onTick);
        return () => {
            EventEmitter.removeListener("tick", onTick);
        }
    }, [onTick])


    return <>
        <Sprite width={width} height={height} x={x + xPos + startPos * -1} y={yPos} color={color}/>
    </>
}