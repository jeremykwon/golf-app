import styled from "styled-components";
import { TitleText } from 'Components/atoms';
import { WeatherWrapper } from 'Components/molecules';


const WeatherBox = () => {
    return(
        <Box
            >
            <TitleText title={'주간날씨'} color={'#fff'} size={14} />
            <WeatherWrapper />
        </Box>
    );
};

export default WeatherBox;

const Box = styled.div`
    width: calc(100% - 20px);
    height: 140px;
    padding: 10px 15px;
    border-radius: 15px;
    background-color: rgba(255,255,255,0.1);
    position: absolute;
    /* bottom: 75px; */
    bottom: 10px; //!전체화면시 이상한 버그가 있다
    left: 10px;
    display: flex;
    flex-direction: column;
`;
