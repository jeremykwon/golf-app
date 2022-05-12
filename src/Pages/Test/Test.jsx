import React, { useState } from 'react';

import { alertMp3 } from 'Asset';

const Test = () => {
    function button_click() {
        const audio = new Audio(alertMp3);
        audio.play();
    }
    
    return (
        <>
            <button onClick={button_click}>
                Test Sound
            </button>
        </>
        
    );
};

export default Test;
