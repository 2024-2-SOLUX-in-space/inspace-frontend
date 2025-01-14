import React from "react";
import { PinButton } from "../styles/FixModelStyle";

const FixModel = ( {id, isPinned, onPinToggle } ) => {
    return (
        <PinButton 
            src = "/pinbutton.png"
            alt = {`공간 ${id} 핀버튼`}
            isPinned = {isPinned}
            onClick = { () => onPinToggle(id)} 
        />
    );
};

export default FixModel;