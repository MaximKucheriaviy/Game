import { generateTarget } from "../service/generateTargets";

export const pigGenerator = (entities, {events = []}) => {
    if(events.some(item => item.type === "generatePigs")){
        const targets = entities.filter(item => item.type === "pig");
        if(targets.length > 5){
            return entities;
        }
        const newTarget = generateTarget(68, 50, targets);
        entities.push(newTarget);
    }
    return entities
}