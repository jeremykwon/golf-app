import styled from "styled-components";

import { Weather } from 'Components/atoms';

const WeatherWrapper = () => {
    return(
        <Box>
            <Weather />
            <Weather />
            <Weather />
            <Weather />
            <Weather />
            <Weather />
            <Weather />
        </Box>
    );
};

export default WeatherWrapper;

const Box = styled.div`
    display: flex;
    width: 100%;
    flex: 1;
    margin-top: 7px;
    border-top: 1px solid rgb(245, 245, 245, 0.2);
    padding-top: 15px;
    justify-content: space-between;
`;
