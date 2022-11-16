import { options } from "../service/options"

export const weaponMove = (enetities) =>{
    const offset = 50;
    const min = 0 + offset;
    const max = options.viewportWidth - offset;
    enetities.map(item => {
        if(item.type !== "weapon"){
            return item;
        }
        if(item.moveSide){
            item.x += item.moveSpeedX;
        }
        else{
            item.x -= item.moveSpeedX;
        }
        if(item.x < min){
            item.x = min;
            item.moveSide = !item.moveSide;
        }
        if(item.x > max - item.width){
            item.x = max - item.width
            item.moveSide = !item.moveSide;
        }
        return item;
    })
    return enetities
}