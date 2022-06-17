import React, { useState, useEffect, lazy, Suspense } from 'react';
import TttSound from './test_sound';

// const Test = () => {
//     // 동기
//     const [count, setCount] = useState(0);

//     const decrement = () => setCount(count - 1);
//     const increment = () => setCount(count + 1);

//     // 비동기
//     const [loading, setLoading] = useState(true);
//     const [result, setResult] = useState(null);

//     const mockFetch = () => 
//         new Promise(resolve => {
//             setTimeout(
//                 () => {
//                     resolve([
//                         { id: '1', name: 'Person1' },
//                         { id: '2', name: 'Person2' },
//                     ])
//                 }, 1000
//             );
//         });
    
//     const loadResult = async () => {
//         const fetchedResult = await mockFetch();
//         setResult(fetchedResult);
//         setLoading(false);
//     };

//     useEffect(() => {
//         loadResult();
//     }, []);

//     return (
//         <>
//             {/* 동기 */}
//             <div>{count}</div>
//             <button onClick={decrement}>-</button>
//             <button onClick={increment}>+</button>

//             {/* 비동기 */}
//             <div>
//                 {loading && <div>Loading</div>}
//                 {result && (
//                     <ul>
//                         {result.map(({ id, name }) => (
//                             <li key={id}>{name}</li>
//                         ))}
//                     </ul>
//                 )}
//             </div>
//         </>
//     );
// };
let maple = [
    1,2,3,4,5,65,587932654,4,32
];

const Test = () => {
    const [text, setText] = useState('');
    const [num, setNum] = useState(0);
    const [_array, setArray] = useState([]);

    function sleep() {
        const wakeUpTime = Date.now() + 1000;
        while (Date.now() < wakeUpTime) {}
    }

    const timeOut = () => {
        setTimeout(()=> {console.log(timeOut)}, 1000);
    };

    useEffect(() => {
        maple.forEach((is1) => {
            timeOut();
            // console.log("before");
            // sleep();
        });
        console.log('들어와라!!!!')
    }, []);


    return (
        <>
            {num}
            <TttSound>test</TttSound>
        </>
    );
};

export default Test;
