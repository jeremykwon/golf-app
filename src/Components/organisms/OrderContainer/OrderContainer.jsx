import { IconButton } from 'Components/atoms';
import styled from "styled-components";


const OrderContainer = ({ children }) => {
    return(
        <Box>{children}</Box>
    );
};

export default OrderContainer;

const Box = styled.div`
    padding: 15px 15px;
    border: solid 1px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    width: fit-content;
    border-radius: 15px;
    margin: 20px auto 0;
    display: flex;
    flex-direction: column;
    /* height: calc(100% - 130px); */
    height: calc(100% - 70px); // !전체화면시 이상한 버그가 있다
`;