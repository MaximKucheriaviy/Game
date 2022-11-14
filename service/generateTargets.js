import { options } from "./options";

export const generateTarget = (width, height, targets = []) => {
    const maxField = 500;
    const minField = 300;

    const generationLeftOffset = 200;
    const generetionRightOffset = options.gameFieldWidth - generationLeftOffset;
    
    const xPos = getRndInteger(generationLeftOffset, generetionRightOffset);
    const yPos = getRndInteger(minField, maxField);
    const result = {
        xPos, 
        yPos,
        width: Math.round(width / (options.viewportHeight - yPos) * 200), 
        height: Math.round(height / (options.viewportHeight - yPos) * 200), 
        mirow: getRndInteger(0, 1)
    }
    if(targets.some(item => {
        item.x = item.xPos;
        item.y = item.yPos;

        result.x = result.xPos
        result.y = result.yPos
        return getIntersection(result, item);
    })){
        return generateTarget(width, height, targets);
    }
    return result;
}


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

export function getIntersection (aBlock, bBlock){
    const ax1 = aBlock.x;
    const ax2 = aBlock.x + aBlock.width;

    const ay1 = aBlock.y;
    const ay2 = aBlock.y + aBlock.height;

    const bx1 = bBlock.x;
    const bx2 = bBlock.x + bBlock.width;

    const by1 = bBlock.y;
    const by2 = bBlock.y + bBlock.height;

    if(ax1 < bx1 && ax1 < bx2 &&  ax2 < bx1 && ax2 < bx2){
        return false;
    }
    if(ax1 > bx1 && ax1 > bx2 && ax2 > bx1 && ax2 > bx2){
        return false;
    }
    if(ay1 < by1 && ay1 < by2 && ay2 < by1 && ay2 < by2){
        return false;
    }
    if(ay1 > by1 && ay1 > by2 && ay2 > by1 && ay2 > by2){
        return false;
    }
    return true;
}


