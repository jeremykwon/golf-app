import { ColorButton, BadgeText, OrderTime } from 'Components/atoms';
import styled from "styled-components";


const OrderHistoryBox = ({ isComplete=false, order, checkHandler }) => {
    return(
        <Container isComplete={isComplete}>
            <LeftBox>
                <BadgeText title={order.nickname} />
                <Order>{ order.comment } </Order>
                {/* <OrderTime time={'2022-07-09 23:43:29'} /> */}
                <OrderTime time={`${order.logtime.split('T')[0]} ${order.logtime.split('T')[1].split('.')[0]}`} />
            </LeftBox>
            
            <ColorButton
                color={isComplete? 'black' : 'blue'}
                width={'140px'}
                title={isComplete? '주문완료' : '주문확인'}
                disabled={isComplete}
                height={'40px'}
                clickHandler={checkHandler}
                />
        </Container>
    );
};

export default OrderHistoryBox;

const Container = styled.div`
    width: calc(100% - 20px);
    background-color: #fff;
    display: flex;
    border: solid 1px #ccc;
    
    padding: 15px 30px;
    align-items: center;
    border-left: solid 5px #4d6aed;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    opacity: ${ ({ isComplete }) => isComplete ? 0.3 : 1 };
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0px;
    }
`;

const LeftBox = styled.div`
    flex: 1;
`;

const Order = styled.p`
    margin: 7px 0;
    color: #252733;
    font-size: 18px;
`;