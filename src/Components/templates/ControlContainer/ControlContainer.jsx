import { useState } from 'react';
import styled from "styled-components";

import { requestOrder } from 'Lib/api';

import { ColorButton, TitleText, IconTextButton } from 'Components/atoms';
import { ControlHeader } from 'Components/molecules';
import { OrderSelectBox, OrderContainer } from 'Components/organisms';


const ControlContainer = ({
    text,
    type,
    clickHandler,
    isSelected=1,
    size='large',
    modalView,
    menuList
}) => {
    const [selectedOrder, setSelectedOrder] = useState([]);

    const requestOrderToAdmin = async () => {
        let sendselectedOrders = [];
        menuList.forEach((menu, index) => {
            if (selectedOrder.includes(index)) sendselectedOrders.push(menu.menu_name);
        });
        return await requestOrder({ orderText: sendselectedOrders });
        
    };

    const orderSubmmit = async () => {
        const res = await requestOrderToAdmin();
        
        if (res !== 'Ordering is Success') {
            alert('주문 오류 관리자에게 문의하세요');
            return;
        }

        // snackBarOpenhandler();
    };

    const selectIndex = (index, exist) => {
        if (exist) {
            let tmpList = [];
            for (let i of selectedOrder) {
                if (i !== index) tmpList.push(i);
            }

            setSelectedOrder(tmpList);
        }
        else setSelectedOrder([...selectedOrder, index]);
    };
    
    return(
        <Box
            onClick={clickHandler}
            isSelected={isSelected}
            size={size}
            >
            <ControlHeader width={'600px'}>
                <IconTextButton clickHandler={() => {modalView('contact');}} title={'광고문의'} />
                <IconTextButton clickHandler={() => {modalView('logout');}} title={'로그아웃'} />
            </ControlHeader>

            <OrderContainer>
                <TitleText title="주문을 선택해주세요" />

                <OrderSelectBox
                    menuList={menuList}
                    selectedOrder={selectedOrder}
                    selectIndex={selectIndex}
                    />

                <ColorButton
                    title={`${selectedOrder.length} 개 주문하기`}
                    color={'black'}
                    disabled={selectedOrder.length === 0}
                    clickHandler={orderSubmmit}
                    />
            </OrderContainer>
        </Box>
    );
};

export default ControlContainer;

const Box = styled.div`
    display: flex;
    flex-direction: column;
`;
