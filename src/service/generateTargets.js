export const generateTarget = (width, height) => {
    const xPos = getRndInteger(100, 2900);
    const yPos = getRndInteger(300, 500);
    return {
        xPos, 
        yPos,
        width, 
        height,
    }
}


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }