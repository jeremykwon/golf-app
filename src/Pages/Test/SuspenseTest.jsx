import React from 'react';

const LazyImage = ({src, name}) => {
    console.log(1111)
    
    return (
        <>
            <img src={src} alt={name}/>
            111
        </>
        
    );
};

export default LazyImage;