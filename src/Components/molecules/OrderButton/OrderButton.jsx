import { IconButton } from 'Components/atoms';
import styled from "styled-components";


const OrderButton = ({
    title,
    type,
    clickHandler,
    isSelected=1,
    size='large'
}) => {
    return(
        <ButtonWrap
            onClick={clickHandler}
            isSelected={isSelected}
            size={size}
            >
            <p>{title}</p>
            <IconButton
                type={'check'}
                disabled={!isSelected}
                />
        </ButtonWrap>
    );
};

export default OrderButton;

const ButtonWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    background-color: ${ ({ isSelected }) => isSelected ?  'rgba(77, 106, 237, 0.1)': '#F8F8F8' };
    width: 242px;
    /* min-width: 242px;
    max-width: calc(100% - 10px); */
    overflow: scroll;
    /* overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis; */

    height: ${ ({ size }) => size === 'large' ?  '40px': '40px' };
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    cursor: pointer;

    p {
        flex: 1;
        color: ${ ({ isSelected }) => isSelected ?  '#3B3B46': '#6B7583' };
        font-size: 15px;
    }
`;