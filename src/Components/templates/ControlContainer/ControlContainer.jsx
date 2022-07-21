import styled from "styled-components";

import { ColorButton, TitleText, IconTextButton } from 'Components/atoms';
import { ControlHeader } from 'Components/molecules';
import { OrderSelectBox, OrderContainer } from 'Components/organisms';


const ControlContainer = ({
    text,
    type,
    clickHandler,
    isSelected=1,
    size='large',
    modalView
}) => {
    return(
        <Box
            onClick={clickHandler}
            isSelected={isSelected}
            size={size}
            >
            <ControlHeader>
                <IconTextButton clickHandler={() => {modalView('contact');}} title={'광고문의'} />
                <IconTextButton clickHandler={() => {modalView('logout');}} title={'로그아웃'} />
            </ControlHeader>

            <OrderContainer>
                <TitleText title="주문을 선택해주세요" />

                <OrderSelectBox />
                <ColorButton title={'주문하기'} color={'black'} />
            </OrderContainer>
        </Box>
    );
};

export default ControlContainer;

const Box = styled.div`
    display: flex;
    flex-direction: column;
`;
