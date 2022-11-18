import Matter from "matter-js";
import { options } from "../service/options";

export const Movement = (entities, {events, time}) => {
    events.forEach(item => {
        if(item.type === "rightMove" || item.type === "releaseLeft"){
            entities.setup.viewportMoveSpeed -= options.rotationSpeed;
        }
        else if(item.type === "leftMove" || item.type === "releaseRight"){
            entities.setup.viewportMoveSpeed += options.rotationSpeed;
        }
    });

    const engine = entities.phisics.engine
    Matter.Engine.update(engine, time.delta);
    Matter.Body.translate(entities.backgound3000.body, {x: entities.setup.viewportMoveSpeed, y: 0})

    return entities;
}