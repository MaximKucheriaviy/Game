import { options } from "../service/options"


export const viewportMove = (entities = [], {events}) => {
    events.forEach(item => {
        if(item.type === "leftMove" || item.type === "releaseRight"){
            entities.map(item => {
                if(item.type !== "3000Back") {
                    return item;
                }
                item.moveSpeedX += options.rotationSpeed;
                return item;
            })
        }
        else if(item.type === "releaseLeft" || item.type === "rightMove"){
            entities.map(item => {
                if(item.type !== "3000Back") {
                    return item;
                }
                item.moveSpeedX -= options.rotationSpeed;
                return item;
            })
        }
    })
    entities.map(item => {
        if(item.type !== "3000Back"){
            return item;
        }
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
    const background = entities.find(item => item.type === "3000Back") ;
    entities.map(item => {
        if(item.type === "weapon" || item.type === "3000Back"){
            return item;
        }
        item.x = background.x + item.relX;
        return item;
    })
    return entities
}