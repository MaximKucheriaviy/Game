import { Sprite } from "../components/Sprite/Sprite"
import { options } from "./options"
import backGround from "../images/background.jpg"
import Matter from "matter-js";

export const setupWorld = () => {
    const engine = Matter.Engine.create({enableSleeping: false});
    const world = engine.world;

    const backgound3000 = Matter.Bodies.rectangle(-1500, 0, options.gameFieldWidth, options.viewportHeight, {isStatic: true});

    Matter.World.add(world, [backgound3000]);
    return {
        phisics: {engine, world},
        backgound3000: {body: backgound3000, backgroundImage: backGround, width: 3000, height: options.viewportHeight, color: "red", renderer: <Sprite/>},
        setup: {viewportMoveSpeed: 0}
    }
}