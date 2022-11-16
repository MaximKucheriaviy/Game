import { options } from "./options";
import { Sprite } from "../components/Sprite/Sprite";
import targetImage from "../assets/Vector.png"

export const generateTarget = (width, height) => {
    const minField = 300;
    const maxField = 500;

    const generationLeftOffset = 200;
    const generetionRightOffset = options.gameFieldWidth - generationLeftOffset;
    
    const x = getRndInteger(generationLeftOffset, generetionRightOffset);
    const y = getRndInteger(minField, maxField);
    const result = {
        x, 
        y,
        relX: x,
        relY: y,
        type: "pig",
        color: "transparent",
        width: Math.round(width / (options.viewportHeight - y) * 200), 
        height: Math.round(height / (options.viewportHeight - y) * 200), 
        mirow: getRndInteger(0, 1),
        moveSpeedX: 0,
        backgroundImage: targetImage,
        renderer: <Sprite/>
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

export function contains ({height, width, x, y}, xPos, yPos){
    if(xPos < x || xPos >= x + width){
        return false;
    }
    else if(yPos < y || yPos >= y + height){
        return false;
    }
    return true;
}


