import { IconButton } from 'Components/atoms';
import styled from "styled-components";

import Marquee from "react-fast-marquee";


const OrderButton = ({
    title,
    clickHandler,
    isSelected=false,
    size='large',
    margin='',
    type='check',
    iconHandler=null
}) => {
    console.log(isSelected)

    return(
        <ButtonWrap
            onClick={clickHandler}
            isSelected={isSelected}
            size={size}
            margin={margin}
            enable={clickHandler ? true : false}
            >
                <Marquee
                    gradient={false}
                    speed={40}
                    play={title.length > 35}
                    pauseOnHover={true}
                    pauseOnClick={true}
                    style={{ color: isSelected ?  '#3B3B46': '#6B7583', fontSize: '15px' }}
                    >
                    {title}
                </Marquee>
                
                <IconButton
                    type={type}
                    clickHandler={iconHandler}
                    color={isSelected ?  'rgba(77, 106, 237, 0.1)': '#F8F8F8'}
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
    overflow: hidden;
    cursor: ${ ({ enable }) => enable ?  'pointer': 'auto' };
    flex: 1;

    height: ${ ({ size }) => size === 'large' ?  '40px': '40px' };
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    
    margin: ${ ({ margin }) => margin };

    @media screen and (max-width: 1000px) {
        width: 242px;
        max-width: calc(100% - 27px);
    }
`;