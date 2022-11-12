import { nanoid } from "nanoid";
import { options } from "./options";

export const generateTarget = (width, height, targets = []) => {
    const generationLeftOffset = 200;
    const generetionRightOffset = options.gameFieldWidth - generationLeftOffset;
    
    const xPos = getRndInteger(generationLeftOffset, generetionRightOffset);
    const yPos = getRndInteger(300, 500);
    const result = {
        id: nanoid(),
        xPos, 
        yPos,
        width, 
        height,
    }
    if(targets.some(item => {
        item.x = item.xPos;
        item.y = item.yPos;

        result.x = result.xPos
        result.y = result.yPos
        return getIntersection(result, item);
    })){
        console.log("recursion");
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