import styled from "styled-components";

// component
import { OrderButton } from 'Components/molecules';

const orderList = [{menu_name: '4392876498326478326478323264783264783264783264786874632874328'}, {menu_name: 1}, {menu_name: 1}, {menu_name: 1}, {menu_name: 1}, {menu_name: 1}, {menu_name: 1}, {menu_name: 1}, {menu_name: 1}, {menu_name: 1},{menu_name: 1},{menu_name: 1},{menu_name: 1},{menu_name: 1},{menu_name: 1},{menu_name: 1},{menu_name: 1},{menu_name: 1},{menu_name: 1},{menu_name: 1},{menu_name: 1},{menu_name: 1},{menu_name: 1},{menu_name: 1},{menu_name: 1},{menu_name: 1},{menu_name: 1},{menu_name: 1},{menu_name: 1},{menu_name: 1},{menu_name: 1},]
const OrderSelectBox = () => {
    return(
        <Box>
            {
                orderList.map((order, index) => {
                    return (
                        <OrderButton key={`${order}_${index}`} title={order.menu_name} />
                    );
                })
            }
        </Box>
    );
};

export default OrderSelectBox;

const Box = styled.div`
    display: flex;
    flex: 1;
    width: 500px;
    padding: 15px 0;
    flex-wrap: wrap;
    gap: 10px;
    border-top: 1px solid #d5dade;
    margin-top: 15px;
    margin-bottom: 20px;
    overflow-y: overlay;
`;