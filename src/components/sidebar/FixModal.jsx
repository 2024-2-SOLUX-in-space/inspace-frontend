import React from "react";
import { PinButton } from "../../styles/sidebar/FixModalStyle";

const FixModel = ( {id, isPinned, onPinToggle } ) => {
    return (
        <PinButton 
            src = "/src/assets/img/button/pinbutton.png"
            alt = {`공간 ${id} 핀버튼`}
            isPinned = {isPinned}
            onClick = { () => onPinToggle(id)} 
        />
    );
};

export default FixModel;