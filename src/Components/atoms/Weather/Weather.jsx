import styled from "styled-components";

import holeinone from 'Asset/images/holeinone.png';

const Weather = ({  }) => {
    return(
        <Box>
            <Text>29°C</Text>
            <WeatherImage src={holeinone} alt='날씨이미지' />
            <Text>7/19</Text>
        </Box>
    );
};

export default Weather;

const Box = styled.div`
    display: flex;
    flex-direction: column;
`;

const Text = styled.p`
    text-align: center;
    font-size: 11px;
    color: #fff;
`;

const WeatherImage = styled.img`
    width: 32px;
    height: 32px;
    margin-top: 10px;
    margin-bottom: 10px;
`;
