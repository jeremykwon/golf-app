import React, { useState } from 'react';

import { alertMp3 } from 'Asset';

const Test = ({ text }) => {
    function button_click() {
        const audio = new Audio(alertMp3);
        audio.play();
    }
    
    return (
        <>
            <button onClick={button_click}>
                { text }
            </button>
        </>
        
    );
};

export default Test;