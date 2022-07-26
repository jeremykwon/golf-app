import { useEffect } from 'react';
import styled from "styled-components";

const MoneyView = ({ money }) => {
    useEffect(() => {
        const numberCounter = (target_frame, target_number)  => {
            let count = 0; 
            let diff = 0;
            let target = document.getElementById(target_frame);
            let timer = null;

            const counter = () => {
                diff = target_number - count;
                
                if(diff > 0) {
                    count += Math.ceil(diff / 5);
                }
                
                target.innerHTML = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                
                if(count < target_number) {
                    timer = setTimeout(counter , 20);
                } else {
                    clearTimeout(timer);
                }
            };
            counter();
        };
        numberCounter("counter1", money);
    }, [money, document.fullscreenElement]);

    return(
        <Box>
            <p id="counter1"></p><span>원</span>
        </Box>
    );
};

export default MoneyView;

const Box = styled.div`
    font-size: 35px;
    font-weight: bold;
    color: #000;
    text-align: center;
    height: 55px;
    background-color: #fff;
    border-radius: 15px;
    border: solid 1px #2d76f7;
    margin: auto;
    position: absolute;
    top: calc(50% + 10px);
    left: 50%;
    transform: translate(-50%, -50%);
    /* min-width: 250px; */
    width: 260px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;

    span {
        font-size: 15px;
        color: #3b3b46;
        margin-bottom: -10px;
        margin-left: 5px;
    }
`;
