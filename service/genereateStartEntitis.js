import { Sprite } from "../components/Sprite/Sprite"
import { options } from "./options"
import backGround from "../images/background.jpg"
export const genereateStartEntitis = () => {
    return [
        {
            type: "3000Back",
            x: -1500, 
            y: 0, 
            width: options.gameFieldWidth, 
            moveSpeedX: 0,
            height: options.viewportHeight, 
            backgroundImage: backGround,
            renderer: <Sprite/>
        },
        {
            type: "weapon",
            x: options.viewportWidth / 2 - 15, 
            y: 10, 
            width: 30, 
            height: 30, 
            moveSpeedX: 3,
            color: "red",
            moveSide: true,
            renderer: <Sprite/>
        },
    ]
}