import { options } from "../service/options"


export const viewportMove = (entities = [], {events}) => {
    const backgroundIndex = entities.findIndex(item => item.type === "3000Back") ;
    events.forEach(item => {
        if(item.type === "leftMove" || item.type === "releaseRight"){
            entities[backgroundIndex].moveSpeedX += options.rotationSpeed;
        }
        else if(item.type === "releaseLeft" || item.type === "rightMove"){
            entities[backgroundIndex].moveSpeedX -= options.rotationSpeed;
        }
    })

    entities[backgroundIndex].x += entities[backgroundIndex].moveSpeedX;
    if(entities[backgroundIndex].x > 0){
        entities[backgroundIndex].x = 0;
    }
    else if(options.gameFieldWidth < entities[backgroundIndex].x * -1 + options.viewportWidth){
        entities[backgroundIndex].x = (options.gameFieldWidth - options.viewportWidth) * -1;
    }

   
    entities.map(item => {
        if(item.type === "weapon" || item.type === "3000Back"){
            return item;
        }
        item.x = entities[backgroundIndex].x + item.relX;
        return item;
    })
    return entities
}