import { Sprite } from "../components/Sprite/Sprite"
import { options } from "../service/options";
import { getIntersection } from "../service/generateTargets";

export const missyleLifecycle = (entities = [], {events}) => {
    const missile = entities.findIndex(item => item.type === "missile");
    if(events.some(item => item.type === "fire")){
        if(missile === -1){
            const background = entities.find(item => item.type === "3000Back");
            const weapon = entities.find(item => item.type === "weapon");
            entities.push(createMissile(background.x * -1 + weapon.x, weapon.y));
        }
    }


    if(missile !== -1){
        entities[missile].y += entities[missile].moveSpeedY;
        const intersection = entities.findIndex(item => {
            if(item.type !== "pig"){
                return false;
            }
            if(getIntersection(item, entities[missile])){
                return true;
            }
            return false
        })
        if(entities[missile].y > options.viewportHeight){
            entities.splice(missile, 1);
        }
        if(intersection >= 0){
            entities.splice(missile, 1);
            entities.splice(intersection, 1);
        }
    }



    return entities;
}


function createMissile(x, y){
    return{
        x: x * -1,
        y: y,
        type: "missile",
        relX: x,
        relY: y,
        moveSpeedX: 0,
        moveSpeedY: 7,
        width: 30,
        height: 30,
        color: "yellow",
        renderer: <Sprite/>
    }
}