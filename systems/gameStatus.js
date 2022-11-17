export const gameStatus = (entities) => {
    const setup = entities.findIndex(item => item.type === "setup");
    entities[setup].level = Math.floor(entities[setup].score / 10);
    if(entities[setup].level === 1){
        entities[setup].pigSpeed = 1;
    }
    return entities
}