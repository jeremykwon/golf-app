import styled from "styled-components";

import { MoneyView } from 'Components/atoms';
import { WeatherBox } from 'Components/organisms';
import holeinone from 'Asset/images/holeinone.png';

const HoleinoneSide = () => {
    return(
        <Box imageUrl={holeinone}>
            <MoneyView money={1000000} />
            <WeatherBox />
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