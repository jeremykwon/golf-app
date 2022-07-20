import styled from "styled-components";

const MoneyView = ({ money }) => {
    return(
        <Box>
            { money }<span>원</span>
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
    min-width: 250px;
    max-width: 320px;
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
