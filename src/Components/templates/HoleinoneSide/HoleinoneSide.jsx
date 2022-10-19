import { useState } from 'react';
import styled from "styled-components";
import Marquee from "react-fast-marquee";

import { MoneyView } from 'Components/atoms';
import { WeatherBox } from 'Components/organisms';
import holeinone from 'Asset/images/holeinone.png';

const HoleinoneSide = ({ money, notice }) => {
    return(
        <Box imageUrl={holeinone}>
            { money !== 0 && <MoneyView money={money} />}
            {/* <WeatherBox /> */}

            <NoticeWrap>
                <Marquee
                    gradient={false}
                    speed={60}
                    play={true}
                    // onFinish={() => { console.log(1111111)}}
                    // pauseOnHover={true}
                    // pauseOnClick={true}
                    style={{ color: '#fff', fontSize: '15px' }}
                    >
                    <span>[공지]&nbsp;</span>
                    { notice }
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Marquee>
            </NoticeWrap>
        </Box>
    );
};

export default HoleinoneSide;

const Box = styled.div`
    display: flex;
    background: ${({ imageUrl }) => `url(${imageUrl})`};
    background-size: 100% 100%;
    flex: 1;
    position: relative;
`;

const NoticeWrap = styled.div`
    display: flex;
    background: ${({ imageUrl }) => `url(${imageUrl})`};
    background-size: 100% 100%;
    flex: 1;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50px;
    background-color: rgba(255,255,255,0.1);
    
    span {
        font-weight: bold;
    }
`;