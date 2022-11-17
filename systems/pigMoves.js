export const pigMoves = (entities, {time}) => {
    const setup = entities.find(item => item.type === "setup");
    entities.map(item => {
        if(item.type !== "pig"){
            return item;
        }
        if(item.moveTurn === 1){
            item.relX += setup.pigSpeed * time.delta / 16;
            if(item.relX > item.moveMax){
                item.relX = item.moveMax
                item.moveTurn = 0;
            }
        }
        else{
            item.relX -= setup.pigSpeed * time.delta / 16;
            if(item.relX < item.moveMin){
                item.relX = item.moveMin
                item.moveTurn = 1;
            }
        }
    })
    return entities
}