import styled from "styled-components";

// component
import { OrderButton } from 'Components/molecules';

const OrderSelectBox = ({ menuList, selectedOrder, selectIndex }) => {
    return(
        <Box>
            {
                menuList.map((order, index) => {
                    const exist = selectedOrder.includes(index);

                    return (
                        <OrderButton
                            key={`${order}_${index}`}
                            title={order.menu_name}
                            clickHandler={() => {selectIndex(index, exist)}}
                            isSelected={exist}
                            />
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