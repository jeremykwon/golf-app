import styled from "styled-components";

import timeIcon from 'Asset/images/time_16.svg';

const OrderTime = ({ time }) => {
    return(
        <Box>
            <img src={timeIcon} alt='시계 아이콘' />
            <p>{ time }</p>
        </Box>
    );
};

export default OrderTime;

const Box = styled.div`
    display: flex;
    color: #6b7583;
    font-size: 14px;

    img {
        margin-right: 8px;
    }
`;