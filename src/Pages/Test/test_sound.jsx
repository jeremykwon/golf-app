import React from 'react';

import { alertMp3 } from 'Asset';

const audio = new Audio(alertMp3);

const Test = ({ text, children } ) => {
    const button_click = () => {
        audio.play();
    }
    
    return (
        <>
            <button onClick={button_click}>
                { children }
            </button>
        </>
        
    );
};

export default Test;
