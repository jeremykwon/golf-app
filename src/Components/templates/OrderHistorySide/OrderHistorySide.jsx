import { useState, useMemo } from 'react';
import styled from "styled-components";

import orderlist from 'Asset/images/orderlist_40.svg';

import { IconText } from 'Components/atoms';
import { OrderHistoryBox } from 'Components/organisms';

import { completeOrder } from 'Lib/api';

import refresh from 'Asset/images/refresh.png';



const OrderHistorySide = ({ orderList, getAdminInfo }) => {
    const [checkedIdList, setCheckedIdList] = useState([]);

    const addCheckedId = (id) => {
        setCheckedIdList([...checkedIdList, id]);
    };

    const checkingJob = async (order) => {
        const res = await completeOrder({ clientId: order.user_id, logId: order.log_id });

        if (res === 'Delete is Done') {
            addCheckedId(order.log_id);
        }
    };

    return(
        <Box >
            <IconText title={'주문내역'} color={'#fff'} imageSrc={orderlist} />

            <RefreshBtn onClick={getAdminInfo}>
                <img src={refresh} alt='새로고침 버튼' />
                <p>새로고침</p>
            </RefreshBtn>

            <ContentWrapper>
                {
                    orderList.map((order, index) => {
                        return (
                            <OrderHistoryBox
                                key={index}
                                order={order}
                                checkHandler={() => { checkingJob(order); }}
                                isComplete={checkedIdList.includes(order.log_id)}
                                />
                        );
                    })
                }
            </ContentWrapper>
        </Box>
    );
};

export default OrderHistorySide;

const Box = styled.div`
    width: 35%;
    background-color: #252733;
    padding: 73px 50px;
    position: relative;
`;

const RefreshBtn = styled.button`
    cursor: pointer;
    background-color: inherit;
    color: #fff;
    font-size: 18px;
    display: flex;
    align-items: center;
    position: absolute;
    right: 50px;
    top: 80px;

    img {
        width: 17px;
        height: 17px;
        margin-right: 5px;
    }
`;

const ContentWrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    margin-top: 40px;
    padding-bottom: 10px;

    &::-webkit-scrollbar {
        width: 10px;
    }
      
    &::-webkit-scrollbar-track {
        border-radius: 100px;
    }
    
    &::-webkit-scrollbar-thumb {
        // border-radius: 100px;
        background-color: #a0a0a0;
        // box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
    }
`;