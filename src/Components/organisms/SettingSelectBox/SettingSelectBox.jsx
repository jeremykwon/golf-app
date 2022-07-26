import { useMemo } from 'react';
import styled from "styled-components";

import { deleteOrderMenu, deleteClient } from 'Lib/api';

// component
import { OrderButton } from 'Components/molecules';

const orderList = [{menu_name: '주문할때 이렇게 길게하면 어떻게 하죠? 이렇게 해도 될까요?????'},{menu_name: '주문할때 이렇게 길게하면 어떻게 하죠?'},{menu_name: '주문할때 이렇게 길게하면 어떻게 하죠?'},{menu_name: '주문할때 이렇게 길게하면 어떻게 하죠?'},{menu_name: '주문할때 이렇게 길게하면 어떻게 하죠?'},{menu_name: '주문할때 이렇게 길게하면 어떻게 하죠?'},{menu_name: '주문할때 이렇게 길게하면 어떻게 하죠?'},{menu_name: '주문할때 이렇게 길게하면 어떻게 하죠?'},{menu_name: '주문할때 이렇게 길게하면 어떻게 하죠?'},{menu_name: '주문할때 이렇게 길게하면 어떻게 하죠?'},{menu_name: '주문할때 이렇게 길게하면 어떻게 하죠?'},{menu_name: '주문할때 이렇게 길게하면 어떻게 하죠?'},{menu_name: '주문할때 이렇게 길게하면 어떻게 하죠?'},{menu_name: '주문할때 이렇게 길게하면 어떻게 하죠?'},]
const SettingSelectBox = ({ itemList, type, refreshMenuList, refreshClientList }) => {   
    const titleKey = useMemo(() => {
        if (type === '주문관리') {
            return 'menu_name';
        } else {
            return 'nickname';
        }
    }, []);

    const deleteOrderMenuHandler = async (id) => {
        const res = await deleteOrderMenu({ menuId: id });
        if (res === 'Delete is Done') {
            alert('주문 삭제 완료');
            refreshMenuList();
        }
    };

    const deleteClientHandler = async (id) => {
        const res = await deleteClient({ clientId: id });
        if (res === 'Delete is Done') {
            alert('방 삭제 완료');
            refreshClientList();
        }
    };

    return(
        <Box>
            {
                itemList.map((item, index) => {
                    return (
                        <OrderButton
                            key={`${item}_${index}`}
                            title={item[titleKey]}
                            margin={'0 0 10px 0'}
                            type={'trash'}
                            iconHandler={() => {
                                type === '주문관리' ? deleteOrderMenuHandler(item.menu_id) : deleteClientHandler(item.user_id)
                            }}
                            />
                    );
                })
            }
        </Box>
    );
};

export default SettingSelectBox;

const Box = styled.div`
    margin-top: 15px;
    margin-bottom: 20px;
    overflow-y: overlay;
    padding-right: 20px;
`;