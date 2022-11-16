import { ControlButton, ControlBoxStyled } from "./ControlBoxStyled"
import { useState } from "react";
import { Text } from "react-native";
import { contains } from "../../service/generateTargets";
export const ControlBox = ({onLeft, onRight, onFire, onReliseLeft, onReliseRight}) => {
    const [fireLayout, setFireLayout] = useState({});
    const [rightLayout, setRightLayout] = useState({});

    const onLeftClick = event => {
        onLeft();
        return true;
    }
    const onFireClicker = event => {
        onFire();
        return false;
    }
    const onRightClick = event => {
        onRight();
        return true;
    }
    const terminationLeft = event => {
        const xTouch =  event.nativeEvent.touches[1].locationX
        const yTouch =  event.nativeEvent.touches[1].locationY
        if(contains(fireLayout, xTouch, yTouch)){
            onFireClicker();
        }
        return false;
    }
    const terminationRight = event => {
        const xTouch = rightLayout.x + event.nativeEvent.touches[1].locationX
        const yTouch = rightLayout.y + event.nativeEvent.touches[1].locationY
        if(contains(fireLayout, xTouch, yTouch)){
            onFireClicker();
        }
        return false;
    }
    return <ControlBoxStyled onStartShouldSetResponder={e => true}>
        <ControlButton onStartShouldSetResponder={onLeftClick} 
                        onResponderTerminationRequest={terminationLeft}
                        onResponderRelease={onReliseLeft}
                        >
            <Text>Left</Text>
        </ControlButton>
        <ControlButton onLayout = {event => setFireLayout(event.nativeEvent.layout)}
                        onStartShouldSetResponder={onFireClicker}
                        >
            <Text>FIRE</Text>
        </ControlButton>
        <ControlButton  onStartShouldSetResponder={onRightClick} 
                        onResponderTerminationRequest={terminationRight}
                        onResponderRelease={onReliseRight}
                        onLayout = {event => setRightLayout(event.nativeEvent.layout)}
                        >
            <Text>Right</Text>
        </ControlButton>
    </ControlBoxStyled>
}