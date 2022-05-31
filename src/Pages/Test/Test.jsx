import React, { useState, useEffect } from 'react';

const Test = () => {
    // 동기
    const [count, setCount] = useState(0);

    const decrement = () => setCount(count - 1);
    const increment = () => setCount(count + 1);

    // 비동기
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState(null);

    const mockFetch = () => 
        new Promise(resolve => {
            setTimeout(
                () => {
                    resolve([
                        { id: '1', name: 'Person1' },
                        { id: '2', name: 'Person2' },
                    ])
                }, 1000
            );
        });
    
    const loadResult = async () => {
        const fetchedResult = await mockFetch();
        setResult(fetchedResult);
        setLoading(false);
    };

    useEffect(() => {
        loadResult();
    }, []);

    return (
        <>
            {/* 동기 */}
            <div>{count}</div>
            <button onClick={decrement}>-</button>
            <button onClick={increment}>+</button>

            {/* 비동기 */}
            <div>
                {loading && <div>Loading</div>}
                {result && (
                    <ul>
                        {result.map(({ id, name }) => (
                            <li key={id}>{name}</li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export default Test;
