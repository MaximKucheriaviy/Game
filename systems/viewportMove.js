import { options } from "../service/options"


export const viewportMove = (entities = [], {events, time}) => {
    events.forEach(item => {
        if(item.type === "leftMove" || item.type === "releaseRight"){
            entities.back3000.moveSpeedX += options.rotationSpeed;
        }
        else if(item.type === "releaseLeft" || item.type === "rightMove"){
            entities.back3000.moveSpeedX -= options.rotationSpeed;
        }
    })

    entities.back3000.x += entities.back3000.moveSpeedX * time.delta / 16;
    if(entities.back3000.x > 0){
        entities.back3000.x = 0;
    }
    else if(options.gameFieldWidth < entities.back3000.x * -1 + options.viewportWidth){
        entities.back3000.x = (options.gameFieldWidth - options.viewportWidth) * -1;
    }

   
    // entities.map(item => {
    //     if(item.type === "weapon" || item.type === "3000Back"){
    //         return item;
    //     }
    //     item.x = entities[backgroundIndex].x + item.relX;
    //     return item;
    // })
    return entities
}